import { FileDriver } from './drivers';
import {
  Configuration,
  DiskConfiguration,
  FileDisk,
} from './config';

/**
 * Supported Disk Drivers
 */
export type DiskDriver = FileDriver;

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
   * @returns {DiskDriver} common interface for all drivers
   */
  static disk(disk?: string): DiskDriver {
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
        // TODO: add more drivers
      default:
        throw new Error(`Disk driver "${disk}" is not implemented`);
    }
  }
}
