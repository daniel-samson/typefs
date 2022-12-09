/* eslint-disable no-use-before-define */
import { S3Driver } from 'typefs-s3-driver';
import { DiskDriver, FileDriver } from './drivers';
import {
  Configuration,
  DiskConfiguration,
  FileDisk,
  S3Disk,
} from './config';

/*
 * Supported Disk Drivers
 * @deprecated since version 1.2.0 please use DiskDriver instead
 * This will be removed in version 2.0.0.
 */
export type TDiskDriver = FileDriver | S3Driver;

/**
 * Storage access
 */
export class Storage {
  private static instance: Storage;

  protected conf: Configuration | undefined;

  protected drivers: Record<string, CallableFunction> = {
    file: (configuration: DiskConfiguration) => new FileDriver(configuration as FileDisk),
    s3: (configuration: DiskConfiguration) => new S3Driver(configuration as S3Disk),
  };

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
    const configuration: DiskConfiguration = inst.conf.disks[dkey];
    const { driver } = configuration;

    if (Object.keys(inst.drivers).includes(driver)) {
      return inst.drivers[driver](configuration);
    }

    throw new Error(`Disk driver "${driver}" for disk "${disk}" is not found`);
  }

  /**
   * Registers a driver to the storage manager.
   *
   * Caution: this will override existing drivers
   *
   * @param {string} name of the driver eg, file, s3, http etc...
   * @param {CallableFunction} driver (DiskConfiguration) -> TDiskDriver
   *
   * (configuration: DiskConfiguration) => new MyDriver(configuration as MyDisk),
   */
  static registerDriver(name: string, driver: CallableFunction): void {
    const inst = Storage.getInstance();
    inst.drivers[name] = driver;
  }
}
