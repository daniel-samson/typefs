/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable class-methods-use-this */
import {
  createReadStream,
  createWriteStream,
  readdirSync,
  Dirent,
  promises,
  mkdirSync,
  existsSync,
  unlinkSync,
  statSync,
} from 'fs';
import { join, dirname } from 'path';
import {
  ResultCallback,
  NoResultCallback,
  BucketItem,
  BucketStream,
  CopyConditions,
  BucketItemCopy,
  BucketItemStat,
} from 'minio';
import { Readable } from 'stream';
import { S3Disk } from '../../lib';

const {
  copyFile,
  unlink,
  stat,
} = promises;

/**
 * Mocks the minio API
 * Using tje fs instead of s3.
 *
 * Will need to change or improve as minio changes.
 */
export class MockMinio {
  private configuration: S3Disk;

  forceError;

  constructor(config: S3Disk) {
    this.configuration = config;
    this.forceError = false;
  }

  getObject(
    bucketName: string,
    objectName: string,
    callback: ResultCallback<Readable>,
  ): void {
    if (this.configuration.bucket !== bucketName) {
      return callback(new Error('getObject Bucket not found'), new Readable());
    }

    if (this.forceError) {
      return callback(new Error('error forced'), new Readable());
    }

    const readable = createReadStream(objectName);

    return callback(null, readable);
  }

  putObject(
    bucketName: string,
    objectName: string,
    stream: Readable,
    callback: ResultCallback<string>,
  ): void {
    if (this.configuration.bucket !== bucketName) {
      callback(new Error('putObject Bucket not found'), '');
      return;
    }

    if (this.forceError) {
      callback(new Error('error forced'), '');
      return;
    }

    const dir = dirname(objectName);

    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    const writable = createWriteStream(objectName);
    if (stream.readable) {
      stream.pipe(writable);
    }

    callback(null, '');
  }

  removeObject(bucketName: string, objectName: string, callback: NoResultCallback): void {
    if (this.configuration.bucket !== bucketName) {
      callback(new Error('putObject Bucket not found'));
      return;
    }

    if (this.forceError) {
      callback(new Error('error forced'));
      return;
    }

    unlink(objectName)
      .then(() => callback(null))
      .catch((e) => callback(e));
  }

  removeObjects(bucketName: string, objectNames: string[], callback: NoResultCallback): void {
    if (this.forceError) {
      callback(new Error('error forced'));
      return;
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const objectName of objectNames) {
      unlinkSync(this.configuration.root + objectName);
    }

    callback(null);
  }

  listObjectsV2(
    _bucketName: string,
    prefix?: string,
    recursive?: boolean,
  ): BucketStream<BucketItem> {
    const p = prefix || '/';

    let absolutePaths: string[] = [];
    if (existsSync(p)) {
      if (recursive === true) {
        absolutePaths = this.recursiveReadDir(p).sort();
      } else {
        absolutePaths = this.filterFiles(p, readdirSync(p, { withFileTypes: true })).sort();
      }
    }

    const { root } = this.configuration;

    return new Readable({
      objectMode: true,
      read() {
        const path: string|undefined = absolutePaths.shift();
        if (path === undefined) {
          this.push(null);
          return;
        }

        const s = statSync(path);

        if (s.isDirectory()) {
          this.push({
            prefix: path.replace(root, ''),
            size: s.size,
            etag: 'fake',
            lastModified: s.mtime,
          });
          return;
        }

        this.push({
          name: path.replace(root, ''),
          size: s.size,
          etag: 'fake',
          lastModified: s.mtime,
        });
      },
    });
  }

  statObject(
    bucketName: string,
    objectName: string,
    callback: ResultCallback<BucketItemStat>,
  ): void {
    const errorItemStat = {
      etag: 'mocked',
      lastModified: new Date(),
      size: 0,
      metaData: {},
    };

    if (this.forceError) {
      callback(new Error('error forced'), errorItemStat);
      return;
    }

    if (this.configuration.bucket !== bucketName) {
      callback(new Error('Bucket not found'), errorItemStat);
      return;
    }

    stat(objectName)
      .then((s) => {
        callback(null, {
          etag: 'mocked',
          lastModified: s.mtime,
          size: s.size,
          metaData: {},
        });
      })
      .catch((e) => callback(e, errorItemStat));
  }

  copyObject(
    bucketName: string,
    objectName: string,
    sourceObject: string,
    _conditions: CopyConditions,
    callback: ResultCallback<BucketItemCopy>,
  ): void {
    const errorItem = {
      etag: 'mocked',
      lastModified: new Date(),
    };

    if (this.forceError) {
      callback(new Error('error forced'), errorItem);
      return;
    }

    if (this.configuration.bucket !== bucketName) {
      callback(new Error('Bucket not found'), errorItem);
      return;
    }

    const from = sourceObject.replace(`${this.configuration.bucket}/`, '');
    const to = objectName.replace(`${this.configuration.bucket}/`, '');

    if (!existsSync(dirname(to))) {
      mkdirSync(dirname(to), { recursive: true });
    }

    copyFile(from, to)
      .then(() => callback(null, {
        etag: 'mocked',
        lastModified: new Date(),
      }))
      .catch((e) => callback(e, errorItem));
  }

  protected recursiveReadDir(path: string): Array<string> {
    const dir = readdirSync(path, { withFileTypes: true });
    let files: Array<string> = this.filterFiles(path, dir);

    dir
      .filter((e: Dirent) => e.isDirectory())
      .map((e: Dirent) => join(path, e.name))
      .forEach((p: string) => {
        files = [...files, ...this.recursiveReadDir(p)];
      });

    return files;
  }

  // eslint-disable-next-line class-methods-use-this
  protected filterFiles(path: string, directoryEntities: Dirent[]): Array<string> {
    return directoryEntities
      .filter((e: Dirent) => e.isFile())
      .map((e: Dirent) => join(path, e.name));
  }
}
