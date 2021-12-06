import { assert } from 'chai';
import { DiskConfiguration, FileDisk, FileDriver, Storage } from '..';
import { Configuration } from '../lib';

describe('storage', () => {
  describe('getInstance', () => {
    it('should create instance', () => {
      // instance is protected
      // @ts-ignore
      const actual = Storage.instance;
      const expected = undefined;
      assert.equal(actual, expected);

      Storage.getInstance();

      // instance is protected
      // @ts-ignore
      const { instance } = Storage;
      assert.instanceOf(instance, Storage);
    });

    it('return memoized instance', () => {
      const instance = Storage.getInstance();
      assert.instanceOf(instance, Storage);
    });
  });

  describe('disk', () => {
    const commonConfig: Configuration = {
      default: 'app',
      disks: {
        app: {
          driver: 'file',
          root: '/app',
          jail: true,
        },
        assets: {
          driver: 'file',
          root: '/app/public/assets',
          jail: true,
        },
      },
    };

    it('should throw error when configuration is not set', () => {
      // configuration is protected
      // @ts-ignore
      Storage.getInstance().configuration = undefined;
      assert.throw(() => Storage.disk(), 'Missing configuration');
    });

    it('should throw error when driver is not implemented', () => {
      Storage.config = {
        default: 'test',
        disks: {
          test: {
            driver: 'null',
          },
        },
      };
      assert.throw(() => Storage.disk('test'), 'Disk driver "null" for disk "test" is not found');
    });

    it('should selected default disk when not it is not specified', () => {
      Storage.config = commonConfig;
      // configuration is protected
      // @ts-ignore
      const conf = Storage.disk().configuration;
      assert.equal(conf.root, '/app');
    });

    it('should return selected disk when specified', () => {
      Storage.config = commonConfig;
      // configuration is protected
      // @ts-ignore
      const conf = Storage.disk('assets').configuration;
      assert.equal(conf.root, '/app/public/assets');
    });

    it('should register providers', () => {
      const driverName = 'test';
      Storage.registerDriver('test', (configuration: DiskConfiguration) => new FileDriver(configuration as FileDisk));
      // drivers is protected
      // @ts-ignore
      const { drivers } = Storage.getInstance();
      assert.include(Object.keys(drivers), driverName);
      assert.isNotNull(drivers[driverName]);
      assert.isFunction(drivers[driverName]);
    });
  });
});
