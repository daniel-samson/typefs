import {
  join,
  resolve,
} from 'path';
import {
  Dirent,
  Stats,
  readdirSync,
  promises,
} from 'fs';
import { FileDisk } from 'lib/config';
import { Util } from './util';
import { DiskDriver, ListDirectoryOptions } from './disk-driver';

const {
  readFile,
  writeFile,
  unlink,
  rmdir,
  stat,
  copyFile,
  rename,
  mkdir,
} = promises;

/**
 * Filesystem storage driver
 */
export class FileDriver extends DiskDriver {
  protected configuration: FileDisk;

  constructor(c: FileDisk) {
    super();
    this.configuration = c;
    // root must be an absolute path
    this.configuration.root = resolve(this.configuration.root);
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
    return readFile(this.jail(path));
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
  write(path: string, data: Buffer): Promise<void> {
    return writeFile(this.jail(path), data);
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
    return unlink(this.jail(path));
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
    return rmdir(this.jail(path));
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
        mkdir(this.jail(path), { recursive: true });
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
   * @returns {Promise<void>}
   * @throws Error when path is outside root directory and
   * configuration.jail is set to true
   */
  listContents(
    path: string,
    options?: ListDirectoryOptions,
  ): Promise<string[]> {
    const p = this.jail(path);

    let absolutePaths = [];
    if (options?.recursive) {
      absolutePaths = this.recursiveReadDir(p);
    } else {
      absolutePaths = readdirSync(p, { withFileTypes: true })
        .map((e: Dirent) => join(path, e.name));
    }

    const relativePaths = absolutePaths.map((f) => f.replace(this.configuration.root, ''));

    return Promise.resolve(relativePaths.sort());
  }

  /**
   * checks if file or directory exists.
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
        stat(jailedPath)
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
        stat(jailedPath)
          .then((s: Stats) => _resolve(new Date(s.mtime)))
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
      stat(this.jail(path))
        .then((s: Stats) => _resolve(s.size))
        .catch((e) => reject(e));
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
    return rename(this.jail(source), this.jail(destination));
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
    return copyFile(this.jail(source), this.jail(destination));
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

  protected recursiveReadDir(path: string): Array<string> {
    const dir = readdirSync(path, { withFileTypes: true });

    let files: Array<string> = dir
      .filter((e: Dirent) => e.isFile())
      .map((e: Dirent) => join(path, e.name));

    dir
      .filter((e: Dirent) => e.isDirectory())
      .map((e: Dirent) => join(path, e.name))
      .forEach((p: string) => {
        files = [...files, ...this.recursiveReadDir(p)];
      });

    return files;
  }
}
