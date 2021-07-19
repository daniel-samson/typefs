import { readFileSync } from 'fs';
import { resolve } from 'path';
import { URL } from 'url';

/**
 * The types of available Drivers (note: some are note implemented yet)
 */
export type DriverType =
    'file'
  | 'null'
  | 's3'
  | 'http'
  | 'memory'
  | 'ftp'
  | 'sftp'
  | 'migrate';

/**
 * Base storage
 */
export interface Disk {
  /**
   * Determins which driver is to be used
   */
  driver: DriverType,
}

/**
 * Filesystem storage
 */
export interface FileDisk {
  /**
   * Defines where paths are relative to
   */
  root: string,
  /**
   * Dont allow paths outside root
   */
  jail: boolean
}

/**
 * WebDav storage
 */
export interface HttpDisk {
  /**
   * The URL of the http service
   */
  endPoint: URL;
}

/**
 * In memory storage
 */
export interface MemoryDisk {}

/**
 * In null storage
 */
export interface NullDisk {}

/**
 * S3 Compatible Storage eg. Minio, AWS etc...
 */
export interface S3Disk {
  /**
   * Defines where paths are relative to
   */
  root: string,
  /**
   * Dont allow paths outside root
   */
  jail: boolean
  /**
   * The name of the bucket eg. "my-bucket-name"
   */
  bucket: string,
  /**
   * The url of the service where the bucket is located eg. "s3.amazonaws.com"
   */
  endPoint: string,
  /**
   * Access Key
   */
  accessKey: string,
  /**
   * Security Key
   */
  secretKey: string,
  /**
   * if endpoint uses SSL, defaults to true
   */
  useSSL?: boolean,
}

export type DiskConfiguration =
    Disk & FileDisk
  | Disk & S3Disk
  | Disk & NullDisk
  | Disk & MemoryDisk
  | Disk & HttpDisk;

/**
 * How the configuration must be defined in package.json or in a separate file.
 */
export interface Configuration {
  /**
   * which disk is the default one to use
   */
  default: string,
  /**
   * Definition of disks available
   */
  disks: Record<string, DiskConfiguration>
}

export type PackageConfiguration = string | undefined;

/**
 * Loads the configuration from package.json or a separate file
 *
 * @returns {Configuration} typefs configuration
 */
export function config(): Configuration {
  const c = process.env.npm_package_config_typefs;

  if (c === undefined) {
    throw new Error('missing path "config.typefs" in package.json.');
  }

  if (c.endsWith('.js')) {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    return require(resolve(c));
  }

  return JSON.parse(readFileSync(c).toString('utf-8'));
}
