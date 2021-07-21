import {
  Client,
  CopyConditions,
} from 'minio';
import {Readable} from 'stream';
import { S3Disk } from 'lib/config';
import { Util } from './util';
import { DiskDriver, ListDirectoryOptions } from './disk-driver';

export class S3Driver extends DiskDriver {
  protected configuration: S3Disk;

  private client: Client;

  constructor(c: S3Disk) {
    super();
    this.configuration = c;
    this.client = new Client(this.configuration);

    if (this.configuration.useSSL === undefined) {
      this.configuration.useSSL = true;
    }
  }

  read(path: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      this.readStream(path)
        .then((stream: Readable) => {
          const buffer: any[] = [];
          stream.on('data', (d: any) => buffer.push(d));
          stream.on('error', reject);
          stream.on('end', () => resolve(Buffer.concat(buffer)));
        })
        .catch(reject);
    });
  }

  readStream(path: string): Promise<Readable> {
    return new Promise((resolve, reject) => {
      const fileName = this.jail(path);
      this.client.getObject(
        this.configuration.bucket,
        fileName,
        (err, stream) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(stream);
        },
      );
    });
  }

  write(path: string, data: Buffer): Promise<void> {
    return this.writeStream(path, data);
  }

  writeStream(path: string, data: Readable | Buffer): Promise<void> {
    return new Promise((resolve, reject) => {
      const fileName = this.jail(path);
      this.client.putObject(
        this.configuration.bucket,
        fileName,
        data,
        (err: any) => {
          if (err) {
            reject(err);
            return;
          }

          resolve();
        },
      );
    });
  }

  deleteFile(path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const fileName = this.jail(path);
      this.client.removeObject(
        this.configuration.bucket,
        fileName,
        (er: any) => {
          if (er) {
            reject(er);
            return;
          }

          resolve();
        },
      );
    });
  }

  deleteDirectory(path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // fake delete directory
      const fileName = this.jail(path);
      this.listContents(fileName, { recursive: true })
        .then((objects) => {
          this.client.removeObjects(
            this.configuration.bucket,
            objects,
            (erro: any) => {
              if (erro) {
                reject(erro);
                return;
              }

              resolve();
            },
          );
        })
        .catch(reject);
    });
  }

  createDirectory(path: string): Promise<void> {
    // Minio/S3 doesn't support creating directories
    // so instead we need to create an empty file.
    // the alternative would be to just ignore this command
    return new Promise((resolve, reject) => {
      const fileName = this.jail(`${path}/.typefs`);
      this.client.putObject(
        this.configuration.bucket,
        fileName,
        Buffer.from(''),
        (error) => {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        },
      );
    });
  }

  listContents(path: string, options?: ListDirectoryOptions): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const fileName = this.jail(path);
      const list: string[] = [];

      const stream = this.client.listObjects(
        this.configuration.bucket,
        fileName,
        true, // fake recursive
      );

      stream.on('data', (obj) => {
        if ((obj.name.match(/\//g) || []).length > 0 && options?.recursive !== true) {
          return; // fake recusive
        }

        if (obj.name.endsWith('.typefs')) {
          // fake empty directory
          // so it should display as directory
          list.push(obj.name.replace('.typefs', ''));
          return;
        }

        list.push(obj.name);
      });
      stream.on('error', (e: any) => reject(e));
      stream.on('end', () => resolve(list));
    });
  }

  exists(path: string): Promise<boolean> {
    // todo: automatically detect is directory and append .typefs to path
    return new Promise((resolve) => {
      const fileName = this.jail(path);
      this.client.statObject(
        this.configuration.bucket,
        fileName,
        (err: any) => {
          if (err) {
            resolve(false);
            return;
          }

          resolve(true);
        },
      );
    });
  }

  lastModified(path: string): Promise<Date> {
    return new Promise((resolve, reject) => {
      const fileName = this.jail(path);
      this.client.statObject(
        this.configuration.bucket,
        fileName,
        (err: any, s) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(s.lastModified);
        },
      );
    });
  }

  fileSize(path: string): Promise<Number> {
    return new Promise((resolve, reject) => {
      const fileName = this.jail(path);
      this.client.statObject(
        this.configuration.bucket,
        fileName,
        (err: any, s) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(s.size);
        },
      );
    });
  }

  move(source: string, destination: string): Promise<void> {
    const conds = new CopyConditions();
    return new Promise((resolve, reject) => {
      const from = this.jail(source);
      const to = this.jail(destination);
      // minio doesn't have a move object
      // so we will copy and then delete the source file instead
      this.client.copyObject(
        this.configuration.bucket,
        to,
        `${this.configuration.bucket}/${from}`,
        conds,
        (e: any) => {
          if (e) {
            reject(e);
            return;
          }

          this.deleteFile(from)
            .then(resolve)
            .catch(reject);
        },
      );
    });
  }

  copy(source: string, destination: string): Promise<void> {
    const conds = new CopyConditions();
    return new Promise((resolve, reject) => {
      const from = this.jail(source);
      const to = this.jail(destination);
      this.client.copyObject(
        this.configuration.bucket,
        to,
        `${this.configuration.bucket}/${from}`,
        conds,
        (e: any) => {
          if (e) {
            reject(e);
            return;
          }

          resolve();
        },
      );
    });
  }

  /**
   * Controls access to paths which are above/outside the root directory
   *
   * @param {string} path relative path to disks root directory
   * @returns {string} absolute path
   * @throws Error when path is outside root directory and
   * configuration.jail is set to true
   */
  protected jail(path: string): string {
    return Util.jail(path, this.configuration.root, this.configuration.jail);
  }
}
