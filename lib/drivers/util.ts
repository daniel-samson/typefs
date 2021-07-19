import {
  join,
  resolve,
  relative,
  sep,
} from 'path';

export class Util {
  /**
   * Controls access to paths which are above/outside the root directory
   *
   * @param {string} path relative path to disks root directory
   * @param {string} root absolute path
   * @param {boolean} jail true if restricted to root
   * @returns {string} absolute path
   * @throws Error when path is outside root directory and jail is set to true
   */
  static jail(path: string, root: string, jail: boolean): string {
    const absolutePath = Util.rootPath(path, root);

    if (
      jail === true
      && !this.isPathInsideRoot(absolutePath, root)
      && resolve(absolutePath) !== root
    ) {
      const e = new Error(`no such file or directory '${path}'`);
      e.name = 'ENOENT';
      throw e;
    }

    return absolutePath;
  }

  /**
   * Resolves path relative to roots absolute path
   *
   * @param {string} path relative to root path
   * @param {string} root absolute path
   * @returns {string} absolute path
   */
  static rootPath(path: string, root: string): string {
    return join(resolve(root), path);
  }

  static isPathInsideRoot(childPath: string, root: string): boolean {
    const relation = relative(root, childPath);

    return Boolean(
      relation
        && relation !== '..'
        && !relation.startsWith(`..${sep}`)
        && relation !== resolve(childPath),
    );
  }
}
