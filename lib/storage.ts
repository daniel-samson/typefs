import { FileDriver, S3Driver } from './drivers';
import {
  Configuration,
  DiskConfiguration,
  FileDisk,
  S3Disk,
} from './config';

/**
 * Supported Disk Drivers
 */
export type TDiskDriver = FileDriver | S3Driver;

/**
 * Storage access
 */
export class Storage {
  private static instance: Storage;

  protected conf: Configuration | undefined;

  static getInstance(): Storage {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new Storage();
    return this.instance;
  }

  /**
   * Configure storage
   *
   * @param {Configuration} c - config JSON
   */
  static set config(c: Configuration) {
    const inst = Storage.getInstance();
    inst.conf = c;
  }

  /**
   * Access disk
   *
   * @param {string|undefined} disk to select. leaving undefined will result in
   * default disk being selected
   * @returns {TDiskDriver} common interface for all drivers
   */
  static disk(disk?: string): TDiskDriver {
    const inst = Storage.getInstance();

    if (inst.conf === undefined) {
      throw new Error('Missing configuration');
    }

    const dkey = disk === undefined ? inst.conf.default : disk;
    const selected: DiskConfiguration = inst.conf.disks[dkey];
    const { driver } = selected;

    // eslint-disable-next-line sonarjs/no-small-switch
    switch (driver) {
      case 'file':
        return new FileDriver(selected as FileDisk);
      case 's3':
        return new S3Driver(selected as S3Disk);
      default:
        throw new Error(`Disk driver "${disk}" is not implemented`);
    }
  }
}
