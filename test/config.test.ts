import { assert } from 'chai';
import mock from 'mock-fs';
import { Configuration } from 'typefs-registry';
import { config } from '..';

describe('config', () => {
  const c: Configuration = {
    default: 'app',
    disks: {
      app: {
        driver: 'file',
        root: '/app',
        jail: true,
      },
    },
  };

  beforeEach(() => {
    mock({
      'config/filesystem.json': JSON.stringify(c),
      'config/filesystem.js': `module.exports = ${JSON.stringify(c)}`,
    });
  });

  afterEach(() => mock.restore());

  it('should take configuration from json file', () => {
    process.env.npm_package_config_typefs = 'config/filesystem.json';
    const actual = config();
    const expected = c;
    assert.deepEqual(actual, expected);
  });

  it('should take configuration from js file', async () => {
    process.env.npm_package_config_typefs = 'config/filesystem.js';
    const actual = config();
    const expected = c;
    assert.deepEqual(actual, expected);
  });

  it('should complain when npm_package_config_typefs is not defined', () => {
    if (process.env.npm_package_config_typefs) {
      // remove if defined
      delete process.env.npm_package_config_typefs;
    }
    assert.throw(() => config(), 'missing path "config.typefs" in package.json.');
  });
});
