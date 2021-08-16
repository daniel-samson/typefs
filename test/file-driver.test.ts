import { assert } from 'chai';
import mock from 'mock-fs';
import { FileDisk, FileDriver } from '..';

describe('FileDriver', () => {
  describe('configuration', () => {
    it('must set DiskDriver.configuration on construction', () => {
      const configuration: FileDisk = {
        root: '/app',
        jail: true,
      };

      const driver = new FileDriver(configuration);
      const expected: FileDisk = configuration;
      // configuration is a protected property
      // @ts-ignore
      const actual: FileDisk = driver.configuration;
      assert.equal(actual, expected);
      assert.equal(actual.jail, configuration.jail);
      assert.equal(actual.root, configuration.root);
    });
  });

  describe('read', () => {
    const configuration: FileDisk = {
      root: '/app',
      jail: true,
    };

    const driver = new FileDriver(configuration);

    beforeEach(() => {
      mock({
        '/app/foo.txt': 'bar',
        '/etc/hosts': '...',
      });
    });

    afterEach(() => {
      mock.restore();
    });

    it('should read file when it exists', async () => {
      const expected = 'bar';
      const actual = await driver.read('foo.txt');
      assert.equal(actual.toString('utf-8'), expected);
    });

    it('must not read file outside root when jail is set to true', (done) => {
      const e = "no such file or directory '../etc/hosts'";
      // assert.throws(() => driver.read('../etc/hosts'), e);
      driver.read('../etc/hosts')
        .then(() => {
          done('should throw error');
        })
        .catch((error: Error) => {
          assert.equal(error.message, e);
          done();
        });
    });
  });

  describe('write', () => {
    const configuration: FileDisk = {
      root: '/app',
      jail: true,
    };

    const driver = new FileDriver(configuration);

    beforeEach(() => {
      mock({
        '/app/foo.txt': 'bar',
        '/etc/passwd': '111',
      });
    });

    afterEach(() => {
      mock.restore();
    });

    it('should write file when it exists', (done) => {
      // assert.doesNotThrow(() => driver.write('foo.txt', Buffer.from('...')));
      driver.write('foo.txt', Buffer.from('...'))
        .then(() => {
          done();
        })
        .catch(() => {
          done('should not throw error when file exists');
        });
    });

    it('should write file when sub directory doesn\'t exists', (done) => {
      // assert.doesNotThrow(() => driver.write('foo.txt', Buffer.from('...')));
      driver.write('/sub/foo.txt', Buffer.from('...'))
        .then(() => {
          done();
        })
        .catch(() => {
          done('should not throw error when subdirectory doesn\'t exists');
        });
    });

    it('must not write to file outside root when jail is set to true', (done) => {
      const e = "no such file or directory '../etc/passwd'";
      driver.write('../etc/passwd', Buffer.from('...'))
        .then(() => {
          done('should throw error');
        })
        .catch((error: Error) => {
          assert.equal(error.message, e);
          done();
        });
    });
  });

  describe('deleteFile', () => {
    const configuration: FileDisk = {
      root: '/app',
      jail: true,
    };

    const driver = new FileDriver(configuration);

    beforeEach(() => {
      mock({
        '/app/foo.txt': 'bar',
        '/etc/passwd': '222',
      });
    });

    afterEach(() => {
      mock.restore();
    });

    it('should delete file when it exists', (done) => {
      const e = "no such file or directory 'foo.txt'";
      driver.deleteFile('foo.txt')
        .then(() => {
          done();
        })
        .catch((error: Error) => {
          assert.equal(error.message, e);
          done(`should not throw error ${error}`);
        });
    });

    it('must not delete file outside root when jail is set to true', (done) => {
      const e = "no such file or directory '../etc/passwd'";
      // assert.throws(() => driver.deleteFile('../etc/passwd'), e);
      driver.deleteFile('../etc/passwd')
        .then(() => {
          // eslint-disable-next-line sonarjs/no-duplicate-string
          done('must throw error');
        })
        .catch((error: Error) => {
          assert.equal(error.message, e);
          done();
        });
    });
  });

  describe('deleteDirectory', () => {
    const configuration: FileDisk = {
      root: '/app',
      jail: true,
    };

    const driver = new FileDriver(configuration);

    beforeEach(() => {
      mock({
        '/app/foo': {},
        '/var': {},
      });
    });

    afterEach(() => {
      mock.restore();
    });

    it('should delete directory when it exists', (done) => {
      // assert.doesNotThrow(() => driver.deleteDirectory('foo'));
      driver.deleteDirectory('foo')
        .then(() => {
          done();
        })
        .catch(() => {
          done('should not throw error when directory exists');
        });
    });

    it('must not delete directory outside root when jail is set to true', (done) => {
      const e = "no such file or directory '../var'";
      // assert.throws(() => driver.deleteDirectory('../var'), e);
      driver.deleteDirectory('../var')
        .then(() => {
          done('must throw error');
        })
        .catch((error: Error) => {
          assert.equal(error.message, e);
          done();
        });
    });
  });

  describe('createDirectory', () => {
    const configuration: FileDisk = {
      root: '/app',
      jail: true,
    };

    const driver = new FileDriver(configuration);

    beforeEach(() => {
      mock({
        '/app/': {},
      });
    });

    afterEach(() => {
      mock.restore();
    });

    it('should create a directory', (done) => {
      // assert.doesNotThrow(() => driver.createDirectory('foo'));
      driver.createDirectory('foo')
        .then(() => {
          assert.exists('/app/foo');
          done();
        })
        .catch(() => {
          done('should not throw error when creating a directory');
        });
    });

    it('must not create directory outside root when jail is set to true', (done) => {
      driver.createDirectory('../etc')
        .then(() => done('failed to jail createDirectory'))
        .catch(() => done());
    });
  });

  describe('listContents', () => {
    const configuration: FileDisk = {
      root: '/app',
      jail: true,
    };

    const driver = new FileDriver(configuration);

    beforeEach(() => {
      mock({
        '/app/foo.json': '{}',
        '/app/bar.json': '{}',
        '/app/baz/foo.json': '{}',
      });
    });

    afterEach(() => {
      mock.restore();
    });

    it('should list contents of directory', (done) => {
      // assert.doesNotThrow(() => driver.listContents('/'));
      driver.listContents('/')
        .then((actual) => {
          const expected = [
            '/bar.json',
            '/foo.json',
          ];

          assert.deepEqual(actual, expected);
          done();
        })
        .catch(() => {
          done('should not throw error');
        });
    });

    it('should list sub-directories when recursive is set to true', (done) => {
      // assert.doesNotThrow(() => driver.listContents(''));
      driver.listContents('/', { recursive: true })
        .then((actual) => {
          const expected = [
            '/bar.json',
            '/baz/foo.json',
            '/foo.json',
          ];

          assert.deepEqual(actual, expected);
          done();
        })
        .catch(() => {
          done('should not throw error');
        });
    });

    it('must not list contents of directory outside root when jail is set to true', (done) => {
      const e = "no such file or directory '../etc'";
      // assert.throws(() => driver.listContents('../etc'), e);
      driver.listContents('../etc')
        .then(() => {
          done('must throw error');
        })
        .catch((error: Error) => {
          assert.equal(error.message, e);
          done();
        });
    });
  });

  describe('exists', () => {
    const configuration: FileDisk = {
      root: '/app',
      jail: true,
    };

    const driver = new FileDriver(configuration);

    beforeEach(() => {
      mock({
        '/app/baz.html': '...',
      });
    });

    afterEach(() => {
      mock.restore();
    });

    it('should return true when file exists', async () => {
      const actual = await driver.exists('baz.html');
      assert.isOk(actual);
    });

    it('should return true when file does not exist', async () => {
      const actual = await driver.exists('missing.html');
      assert.isNotOk(actual);
    });

    it('must return false when path is outside root and jail is set to true', async () => {
      const actual = await driver.exists('../etc');
      assert.isNotOk(actual);
    });
  });

  describe('lastModified', () => {
    const configuration: FileDisk = {
      root: '/app',
      jail: true,
    };

    const driver = new FileDriver(configuration);

    beforeEach(() => {
      mock({
        '/app/baz.html': '...',
        '/etc/ns.conf': '...',
      });
    });

    afterEach(() => {
      mock.restore();
    });

    it('should return a date of last modified', async () => {
      const actual = await driver.lastModified('baz.html');
      assert.typeOf(actual, 'Date');
    });

    it('must not get lastModified outside root when jail is set to true', (done) => {
      driver.lastModified('../etc/ns.conf')
        .then(() => done('test failed to jail'))
        .catch(() => done());
    });

    it('must return error when file does not exist', (done) => {
      driver.lastModified('/missing')
        .then(() => done('test failed to error'))
        .catch(() => done());
    });
  });

  describe('fileSize', () => {
    const configuration: FileDisk = {
      root: '/app',
      jail: true,
    };

    const driver = new FileDriver(configuration);

    beforeEach(() => {
      mock({
        '/app/baz.xml': '...',
        '/etc/secret': '...',
      });
    });

    afterEach(() => {
      mock.restore();
    });

    it('should return filesize in bytes', async () => {
      const actual = await driver.fileSize('baz.xml');
      const expected = 3; // bytes
      assert.typeOf(actual, 'number');
      assert.equal(actual, expected);
    });

    it('must not get file size outside root when jail is set to true', (done) => {
      const e = "no such file or directory '../etc/secret'";
      driver.fileSize('../etc/secret')
        .then(() => {
          done('test failed');
        })
        .catch((error: Error) => {
          assert.equal(error.message, e);
          done();
        });
    });

    it('must return error when file does not exist', (done) => {
      driver.fileSize('/missing')
        .then(() => done('test failed'))
        .catch(() => done());
    });
  });

  describe('move', () => {
    const configuration: FileDisk = {
      root: '/app',
      jail: true,
    };

    const driver = new FileDriver(configuration);

    beforeEach(() => {
      mock({
        '/app/baz.xml': '...',
        '/etc/foo.xml': '...',
      });
    });

    afterEach(() => {
      mock.restore();
    });

    it('should move file', async () => {
      await driver.move('baz.xml', 'hope.xml');
      assert.exists('/app/hope.xml');
    });

    it('must not get file outside root when jail is set to true', (done) => {
      const e = "no such file or directory '../etc/foo.xml'";
      // assert.throws(() => driver.move('../etc/foo.xml', 'secret.xml'), e);
      driver.move('../etc/foo.xml', 'secret.xml')
        .then(() => {
          done('must throw error');
        })
        .catch((error: Error) => {
          assert.equal(error.message, e);
          done();
        });
    });

    it('must not move file outside root when jail is set to true', (done) => {
      const e = "no such file or directory '../etc/foo.xml'";
      // assert.throws(() => driver.move('baz.xml', '../etc/foo.xml'), e);
      driver.move('baz.xml', '../etc/foo.xml')
        .then(() => {
          done('must throw error');
        })
        .catch((error: Error) => {
          assert.equal(error.message, e);
          done();
        });
    });
  });

  describe('copy', () => {
    const configuration: FileDisk = {
      root: '/app',
      jail: true,
    };

    const driver = new FileDriver(configuration);

    beforeEach(() => {
      mock({
        '/app/bar.xml': '...',
        '/etc/baz.xml': '...',
      });
    });

    afterEach(() => {
      mock.restore();
    });

    it('should copy file', async () => {
      await driver.copy('bar.xml', 'hope.xml');
      assert.exists('/app/hope.xml');
    });

    it('must not get file outside root when jail is set to true', (done) => {
      const e = "no such file or directory '../etc/baz.xml'";
      // assert.throws(() => driver.copy('../etc/baz.xml', 'secret.xml'), e);
      driver.copy('../etc/baz.xml', 'secret.xml')
        .then(() => {
          done('must throw error');
        })
        .catch((error: Error) => {
          assert.equal(error.message, e);
          done();
        });
    });

    it('must not copy file outside root when jail is set to true', (done) => {
      const e = "no such file or directory '../etc/baz.xml'";
      // assert.throws(() => driver.copy('bar.xml', '../etc/baz.xml'), e);
      driver.copy('bar.xml', '../etc/baz.xml')
        .then(() => {
          done('must throw error');
        })
        .catch((error: Error) => {
          assert.equal(error.message, e);
          done();
        });
    });
  });
});
