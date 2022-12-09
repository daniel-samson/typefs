import {
  Client,
  CopyConditions,
} from 'minio';
import { Readable } from 'stream';
import { S3Disk } from 'lib/config';
import { Util } from './util';
import { DiskDriver, ListDirectoryOptions } from './disk-driver';

// TODO: write 100% coverage for S3Driver
// TODO: rewrite calls to client so that they return promises instead of using a callback
// TODO: consider swapping promises for async await
/**
 * S3 DiskDriver
 *
 * @deprecated since version 1.2.0 please `import S3Driver from 'typefs-s3-driver' instead
 * This will be removed in version 2.0.0
 */
export class S3Driver extends DiskDriver {
  protected configuration: S3Disk;

  private client: Client;

  constructor(c: S3Disk) {
    super();
    this.configuration = c;
    this.client = new Client(this.configuration);
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
      try {
        const fileName = S3Driver.toKey(this.jail(path));
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
      } catch (e) {
        reject(e);
      }
    });
  }

  write(path: string, data: Buffer): Promise<void> {
    return this.writeStream(path, Readable.from(data));
  }

  writeStream(path: string, data: Readable): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const fileName = S3Driver.toKey(this.jail(path));
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
      } catch (e) {
        reject(e);
      }
    });
  }

  deleteFile(path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const fileName = S3Driver.toKey(this.jail(path));
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
      } catch (e) {
        reject(e);
      }
    });
  }

  deleteDirectory(path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // fake delete directory
        const fileName = S3Driver.toKey(this.jail(path));
        this.minioListContents(fileName)
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
      } catch (e) {
        reject(e);
      }
    });
  }

  createDirectory(path: string): Promise<void> {
    // Minio/S3 doesn't support creating directories
    // so instead we need to create an empty file.
    // the alternative would be to just ignore this command
    return new Promise((resolve, reject) => {
      try {
        const fileName = S3Driver.toKey(this.jail(`${path}/.typefs`));
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
      } catch (e) {
        reject(e);
      }
    });
  }

  listContents(path: string, options?: ListDirectoryOptions): Promise<string[]> {
    return new Promise((resolve, reject) => {
      try {
        const p = S3Driver.toKey(this.jail(path));
        const mapPrefixRoot = (s: string) => (s.startsWith('/') ? s : `/${s}`);

        this.minioListContents(p, options?.recursive === true)
          .then((objects) => {
            const list: string[] = objects
              .filter((s) => !s.endsWith('.typefs'))
              .filter((s) => !s.endsWith('/'))
              .map(mapPrefixRoot);
            resolve(list);
          })
          .catch(reject);
      } catch (e) {
        reject(e);
      }
    });
  }

  private minioListContents(path: string, recursive: boolean = false): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const list: string[] = [];

      const stream = this.client.listObjectsV2(
        this.configuration.bucket,
        path,
        recursive,
      );

      stream.on('data', (obj) => {
        if (obj.name === undefined && obj.prefix) {
          // its a directory
          list.push(obj.prefix);
          return;
        }

        list.push(obj.name);
      });
      stream.on('error', (e: any) => reject(e));
      stream.on('end', () => resolve(list));
    });
  }

  exists(path: string): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        const fileName = S3Driver.toKey(this.jail(path));
        // fake directory support
        if (path.endsWith('/')) {
          this.minioListContents(fileName, true)
            .then((entries: string[]) => {
              resolve(entries.length > 0);
            })
            .catch(() => resolve(false));
          return;
        }

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
      } catch (e) {
        resolve(false);
      }
    });
  }

  lastModified(path: string): Promise<Date> {
    return new Promise((resolve, reject) => {
      try {
        const fileName = S3Driver.toKey(this.jail(path));
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
      } catch (e) {
        reject(e);
      }
    });
  }

  fileSize(path: string): Promise<Number> {
    return new Promise((resolve, reject) => {
      try {
        const fileName = S3Driver.toKey(this.jail(path));
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
      } catch (e) {
        reject(e);
      }
    });
  }

  move(source: string, destination: string): Promise<void> {
    const conditions = new CopyConditions();
    return new Promise((_resolve, _reject) => {
      try {
        const from = this.jail(source);
        let to = this.jail(destination);

        if (source.endsWith('/') && destination.endsWith('/')) {
        // eg. move('/from/', '/to/')
          this.minioListContents(to, true).then((objects) => {
            const list: string[] = objects
              .filter((s) => !s.endsWith('.typefs'))
              .filter((s) => !s.endsWith('/'));

            if (list.length > 0) {
              _reject(new Error(`ENOTEMPTY: directory not empty, move '${source}' -> '${destination}'`));
            }

            // rename directory (slow)
            this.minioListContents(from, true)
              .then((entries) => {
              // foreach -> move
                const moving: any[] = [];
                entries.forEach((entry) => moving.push(this.move(entry, destination)));
                Promise.all(moving)
                  .then(() => _resolve())
                  .catch(_reject);
              })
              .catch(_reject);
          }).catch(_reject);

          return;
        }

        if (destination.endsWith('/')) {
        // eg. move('foo.txt', '/sub/')
          const toFile = from.substr(from.lastIndexOf('/'));
          to += toFile;
          to = to.replace('//', '/');
        }

        // minio/s3 doesn't have a move function
        // so we will copy and then delete the source file instead
        this.client.copyObject(
          this.configuration.bucket,
          to,
          `${this.configuration.bucket}/${from}`,
          conditions,
          (e: any) => {
            if (e) {
              _reject(e);
              return;
            }

            this.deleteFile(from.replace(this.configuration.root, ''))
              .then(_resolve)
              .catch(_reject);
          },
        );
      } catch (e) {
        _reject(e);
      }
    });
  }

  copy(source: string, destination: string): Promise<void> {
    const conditions = new CopyConditions();
    return new Promise((_resolve, _reject) => {
      try {
        const from = S3Driver.toKey(this.jail(source));
        const to = S3Driver.toKey(this.jail(destination));

        if (source.endsWith('/') || destination.endsWith('/')) {
          _reject(new Error(`EISDIR: illegal operation on a directory, copy '${source}' -> '${destination}'`));
          return;
        }

        this.client.copyObject(
          this.configuration.bucket,
          to,
          `${this.configuration.bucket}/${from}`,
          conditions,
          (e: any) => {
            if (e) {
              _reject(e);
              return;
            }

            _resolve();
          },
        );
      } catch (e) {
        _reject(e);
      }
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

  /**
   * Converts path to S3 Key
   *
   * @param {string} path absolute path
   * @returns {string} S3 key
   */
  protected static toKey(path: string): string {
    return path.startsWith('/') ? path.substr(1) : path;
  }
}
