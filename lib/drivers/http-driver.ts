import { Readable } from 'stream';
import {
  createClient, FileStat, ResponseDataDetailed, WebDAVClient,
} from 'webdav';
import { HttpDisk } from 'lib/config';
import { Util } from './util';
import { DiskDriver, ListDirectoryOptions } from './disk-driver';

/**
 * Filesystem storage driver
 */
export class HttpDriver extends DiskDriver {
  protected configuration: HttpDisk;

  private client: WebDAVClient;

  constructor(c: HttpDisk) {
    super();
    this.configuration = c;
    this.client = createClient(c.root);
  }

  /**
   * Opens file and read full contents of file.
   *
   * @param {string} path relative to root of disk
   * @returns {Promise<Buffer>} contents of file
   * @throws Error when path is outside root directory and
   * configuration.jail is set to true
   */
  read(path: string): Promise<Buffer> {
    return new Promise((_resolve, _reject) => {
      this.readStream(path)
        .then((stream: Readable) => {
          const buffer: any[] = [];
          stream.on('data', (d: any) => buffer.push(d));
          stream.on('error', _reject);
          stream.on('end', () => _resolve(Buffer.concat(buffer)));
        })
        .catch(_reject);
    });
  }

  /**
   * Opens file and reads the contents of file in chunks.
   *
   * @param {string} path relative to root of disk
   * @returns {Promise<Readable>} contents of file
   * @throws Error when path is outside root directory and
   * configuration.jail is set to true
   */
  readStream(path: string): Promise<Readable> {
    try {
      return Promise.resolve(this.client.createReadStream(this.jail(path)));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Opens file and writes full contents to file.
   *
   * @param {string} path relative to root of disk
   * @param {Buffer} data contents of file
   * @returns {Promise<void>}
   * @throws Error when path is outside root directory and
   * configuration.jail is set to true
   */
  async write(path: string, data: Buffer): Promise<void> {
    return this.writeStream(path, Readable.from(data));
  }

  /**
   * Opens file and writes the contents of file in chunks.
   *
   * @param {string} path relative to root of disk
   * @param {Readable} data contents of file
   * @returns {Promise<void>}
   * @throws Error when path is outside root directory and
   * configuration.jail is set to true
   */
  async writeStream(path: string, data: Readable): Promise<void> {
    try {
      const p = this.jail(path);

      const dir = path;
      if (!await this.exists(dir)) {
        await this.createDirectory(dir);
      }

      const stream = this.client.createWriteStream(p);
      data.pipe(stream);

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Deletes file.
   *
   * @param {string} path relative to root of disk
   * @returns {Promise<void>}
   * @throws Error when path is outside root directory and
   * configuration.jail is set to true
   */
  deleteFile(path: string): Promise<void> {
    try {
      return this.client.deleteFile(this.jail(path));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Deletes directory.
   *
   * @param {string} path relative to root of disk
   * @returns {Promise<void>}
   * @throws Error when path is outside root directory and
   * configuration.jail is set to true
   */
  deleteDirectory(path: string): Promise<void> {
    try {
      return this.deleteFile(this.jail(path));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Creates directory.
   *
   * @param {string} path relative to root of disk
   * @returns {Promise<void>}
   * @throws Error when path is outside root directory and
   * configuration.jail is set to true
   */
  createDirectory(path: string): Promise<void> {
    return new Promise((_resolve, reject) => {
      try {
        this.client.createDirectory(this.jail(path), { recursive: true });
        _resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * List contents of directory
   *
   * @param {string} path relative to root of disk
   * @param {ListDirectoryOptions} options eg. set recursive to true
   * @returns {Promise<string>}
   * @throws Error when path is outside root directory and
   * configuration.jail is set to true
   */
  listContents(
    path: string,
    options?: ListDirectoryOptions,
  ): Promise<string[]> {
    try {
      const p = this.jail(path);
      return new Promise((resolve, reject) => {
        this.client.getDirectoryContents(p, { deep: options?.recursive })
          .then((s: FileStat[] | ResponseDataDetailed<FileStat[]>) => {
            if (s === undefined) {
              reject(new Error('Not found'));
            } else if ('data' in s) {
              resolve(s.data.map((v) => v.filename));
            } else {
              resolve(s.map((v) => v.filename));
            }
          })
          .catch((e) => reject(e));
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Checks if file or directory exists.
   *
   * @param {string} path relative to root of disk
   * @returns {Promise<boolean>} true when path exists
   * @throws Error when path is outside root directory and
   * configuration.jail is set to true
   */
  exists(path: string): Promise<boolean> {
    return new Promise((_resolve) => {
      try {
        const jailedPath = this.jail(path);
        this.client.stat(jailedPath)
          .then(() => _resolve(true))
          .catch(() => _resolve(false));
      } catch (e) {
        _resolve(false);
      }
    });
  }

  /**
   * When was file last modified.
   *
   * @param {string} path relative to root of disk
   * @returns {Promise<Date>} when file was last modified
   * @throws Error when path is outside root directory and
   * configuration.jail is set to true
   */
  lastModified(path: string): Promise<Date> {
    return new Promise((_resolve, reject) => {
      try {
        const jailedPath = this.jail(path);
        this.client.stat(jailedPath)
          .then((s: FileStat | ResponseDataDetailed<FileStat> | undefined) => {
            if (s === undefined) {
              reject(new Error('Not found'));
            } else if ('data' in s) {
              _resolve(new Date(s.data.lastmod));
            } else {
              _resolve(new Date(s.lastmod));
            }
          })
          .catch((e) => reject(e));
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Size of file
   *
   * @param {string} path relative to root of disk
   * @returns {Promise<number>} The file size in bytes
   * @throws Error when path is outside root directory and
   * configuration.jail is set to true
   */
  fileSize(path: string): Promise<number> {
    return new Promise((_resolve, reject) => {
      try {
        const p = this.jail(path);
        this.client.stat(p)
          .then((s: FileStat | ResponseDataDetailed<FileStat> | undefined) => {
            if (s === undefined) {
              reject(new Error('Not found'));
            } else if ('data' in s) {
              _resolve(s.data.size);
            } else {
              _resolve(s.size);
            }
          })
          .catch((e) => reject(e));
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Moves source file to destination
   *
   * @param {string} source path relative to root of disk
   * @param {string} destination path relative to root of disk
   * @returns {Promise<void>}
   * @throws Error when path is outside root directory and
   * configuration.jail is set to true
   */
  move(source: string, destination: string): Promise<void> {
    try {
      const jailedSource = this.jail(source);
      const jailedDestination = this.jail(destination);

      return this.client.moveFile(jailedSource, jailedDestination);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Copies source file to destination
   *
   * @param {string} source path relative to root of disk
   * @param {string} destination path relative to root of disk
   * @returns {Promise<void>}
   * @throws Error when path is outside root directory and
   * configuration.jail is set to true
   */
  copy(source: string, destination: string): Promise<void> {
    try {
      const jailedSource = this.jail(source);
      const jailedDestination = this.jail(destination);

      return this.client.copyFile(jailedSource, jailedDestination);
    } catch (e) {
      return Promise.reject(e);
    }
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
    // todo: prepend "/"
    return Util.jail(path, this.configuration.root, this.configuration.jail);
  }
}
