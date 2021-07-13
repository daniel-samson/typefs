export interface ListDirectoryOptions {
  recursive?: boolean
}

/**
 * Base Disk Driver class
 */
export abstract class DiskDriver {
  /**
   * Opens file and read full contents of file.
   *
   * @param {string} path relative to root of disk
   * @returns {Promise<Buffer>} contents of file
   * @throws Error when path is outside root directory and
   * configuration.jail is set to true
   */
  // eslint-disable-next-line no-unused-vars
  abstract read(path: string): Promise<Buffer>;

  /**
   * Opens file and writes full contents to file.
   *
   * @param {string} path relative to root of disk
   * @param {Buffer} data contents of file
   * @returns {Promise<void>}
   * @throws Error when path is outside root directory and
   * configuration.jail is set to true
   */
  // eslint-disable-next-line no-unused-vars
  abstract write(path: string, data: Buffer): Promise<void>;

  /**
   * Deletes file.
   *
   * @param {string} path relative to root of disk
   * @returns {Promise<void>}
   * @throws Error when path is outside root directory and
   * configuration.jail is set to true
   */
  // eslint-disable-next-line no-unused-vars
  abstract deleteFile(path: string): Promise<void>;

  /**
   * Deletes directory.
   *
   * @param {string} path relative to root of disk
   * @returns {Promise<void>}
   * @throws Error when path is outside root directory and
   * configuration.jail is set to true
   */
  // eslint-disable-next-line no-unused-vars
  abstract deleteDirectory(path: string): Promise<void>;

  /**
   * Creates directory.
   *
   * @param {string} path relative to root of disk
   * @returns {Promise<void>}
   * @throws Error when path is outside root directory and
   * configuration.jail is set to true
   */
  // eslint-disable-next-line no-unused-vars
  abstract createDirectory(path: string): Promise<void>;

  /**
   * List contents of directory
   *
   * @param {string} path relative to root of disk
   * @param {ListDirectoryOptions} options eg. set recursive to true
   * @returns {Promise<void>}
   * @throws Error when path is outside root directory and
   * configuration.jail is set to true
   */
  // eslint-disable-next-line no-unused-vars
  abstract listContents(path: string, options?: ListDirectoryOptions): Promise<Array<string>>;

  /**
   * checks if file or directory exists.
   *
   * @param {string} path relative to root of disk
   * @returns {Promise<boolean>} true when path exists
   * @throws Error when path is outside root directory and
   * configuration.jail is set to true
   */
  // eslint-disable-next-line no-unused-vars
  abstract exists(path: string): Promise<boolean>;

  /**
   * When was file last modified.
   *
   * @param {string} path relative to root of disk
   * @returns {Promise<Date>} when file was last modified
   * @throws Error when path is outside root directory and
   * configuration.jail is set to true
   */
  // eslint-disable-next-line no-unused-vars
  abstract lastModified(path: string): Promise<Date>;

  /**
   * Size of file
   *
   * @param {string} path relative to root of disk
   * @returns {Promise<number>} The file size in bytes
   * @throws Error when path is outside root directory and
   * configuration.jail is set to true
   */
  // eslint-disable-next-line no-unused-vars
  abstract fileSize(path: string): Promise<Number>;

  /**
   * Moves source file to destination
   *
   * @param {string} source path relative to root of disk
   * @param {string} destination path relative to root of disk
   * @returns {Promise<void>}
   * @throws Error when path is outside root directory and
   * configuration.jail is set to true
   */
  // eslint-disable-next-line no-unused-vars
  abstract move(source: string, destination: string): Promise<void>;

  /**
   * Copies source file to destination
   *
   * @param {string} source path relative to root of disk
   * @param {string} destination path relative to root of disk
   * @returns {Promise<void>}
   * @throws Error when path is outside root directory and
   * configuration.jail is set to true
   */
  // eslint-disable-next-line no-unused-vars
  abstract copy(source: string, destination: string): Promise<void>;
}
