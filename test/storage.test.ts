import { assert } from 'chai';
import { Storage } from '..';
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

    it('return meomoized instance', () => {
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
      assert.throw(() => Storage.disk('test'), 'Disk driver "test" is not implemented');
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
  });
});
