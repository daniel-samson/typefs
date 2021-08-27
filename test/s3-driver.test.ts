/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable sonarjs/no-duplicate-string */
import { assert } from 'chai';
import mock from 'mock-fs';
import { MockMinio } from './stub/mock-minio';
import { S3Disk, S3Driver } from '..';

describe('S3Driver', () => {
  const shouldThrowError = 'should throw error';
  const forcedError = 'error forced';
  const configuration: S3Disk = {
    root: '/app',
    jail: true,
    bucket: 'test-bucket',
    endPoint: '127.0.0.1',
    port: 9000,
    accessKey: 'private',
    secretKey: 'secret',
    useSSL: true,
  };

  describe('configuration', () => {
    it('must set DiskDriver.configuration on construction', () => {
      const driver = new S3Driver(configuration);
      const expected: S3Disk = configuration;
      // configuration is a protected property
      // @ts-ignore
      const actual: S3Disk = driver.configuration;
      assert.equal(actual, expected);
      assert.equal(actual.jail, configuration.jail);
      assert.equal(actual.root, configuration.root);
      assert.equal(actual.useSSL, true);
    });
  });

  describe('read', () => {
    const driver = new S3Driver(configuration);
    const mockedMinio = new MockMinio(configuration);
    // @ts-ignore
    driver.client = mockedMinio;

    beforeEach(() => {
      mock({
        '/app/foo.txt': 'bar',
        '/etc/hosts': '...',
      });
    });

    afterEach(() => {
      mock.restore();
      // @ts-ignore
      driver.client.forceError = false;
    });

    it('should read file when it exists', async () => {
      const expected = 'bar';
      const actual = await driver.read('foo.txt');
      assert.equal(actual.toString('utf-8'), expected);
    });

    it('must not read file outside root when jail is set to true', (done) => {
      const e = "no such file or directory '../etc/hosts'";
      driver.read('../etc/hosts')
        .then(() => {
          done(shouldThrowError);
        })
        .catch((error: Error) => {
          assert.equal(error.message, e);
          done();
        });
    });

    it('must handle errors', (done) => {
      // @ts-ignore
      driver.client.forceError = true;
      driver.read('/foo.txt')
        .then(() => {
          done(shouldThrowError);
        })
        .catch((error: Error) => {
          assert.equal(error.message, forcedError);
          done();
        });
    });
  });

  describe('write', () => {
    const driver = new S3Driver(configuration);
    const mockedMinio = new MockMinio(configuration);
    // @ts-ignore
    driver.client = mockedMinio;

    beforeEach(() => {
      mock({
        '/app/foo.txt': 'bar',
        '/etc/passwd': '111',
      });
    });

    afterEach(() => {
      mock.restore();
      // @ts-ignore
      driver.client.forceError = false;
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

    it('must not write to file outside root when jail is set to true', (done) => {
      const e = "no such file or directory '../etc/passwd'";
      driver.write('../etc/passwd', Buffer.from('...'))
        .then(() => {
          done(shouldThrowError);
        })
        .catch((error: Error) => {
          assert.equal(error.message, e);
          done();
        });
    });

    it('must handle errors', (done) => {
      // @ts-ignore
      driver.client.forceError = true;
      driver.write('foo.txt', Buffer.from('...'))
        .then(() => {
          done(shouldThrowError);
        })
        .catch((error: Error) => {
          assert.equal(error.message, forcedError);
          done();
        });
    });
  });

  describe('deleteFile', () => {
    const driver = new S3Driver(configuration);
    const mockedMinio = new MockMinio(configuration);
    // @ts-ignore
    driver.client = mockedMinio;

    beforeEach(() => {
      mock({
        '/app/foo.txt': 'bar',
        '/etc/passwd': '222',
      });
    });

    afterEach(() => {
      mock.restore();
      // @ts-ignore
      driver.client.forceError = false;
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

    it('must handle errors', (done) => {
      // @ts-ignore
      driver.client.forceError = true;
      driver.deleteFile('foo.txt')
        .then(() => {
          done(shouldThrowError);
        })
        .catch((error: Error) => {
          assert.equal(error.message, forcedError);
          done();
        });
    });
  });

  describe('deleteDirectory', () => {
    const driver = new S3Driver(configuration);
    const mockedMinio = new MockMinio(configuration);
    // @ts-ignore
    driver.client = mockedMinio;

    beforeEach(() => {
      mock({
        '/app/foo/.typefs': '',
        '/var': {},
      });
    });

    afterEach(() => {
      mock.restore();
      // @ts-ignore
      driver.client.forceError = false;
    });

    it('should delete directory when it exists', (done) => {
      // assert.doesNotThrow(() => driver.deleteDirectory('foo'));
      driver.deleteDirectory('foo')
        .then(() => {
          done();
        })
        .catch((e) => {
          done(e);
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

    it('must handle errors', (done) => {
      // @ts-ignore
      driver.client.forceError = true;
      driver.deleteDirectory('foo')
        .then(() => {
          done(shouldThrowError);
        })
        .catch((error: Error) => {
          assert.equal(error.message, forcedError);
          done();
        });
    });
  });

  describe('createDirectory', () => {
    const driver = new S3Driver(configuration);
    const mockedMinio = new MockMinio(configuration);
    // @ts-ignore
    driver.client = mockedMinio;

    beforeEach(() => {
      mock({
        '/app/': {},
      });
    });

    afterEach(() => {
      mock.restore();
      // @ts-ignore
      driver.client.forceError = false;
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

    it('must handle errors', (done) => {
      // @ts-ignore
      driver.client.forceError = true;
      driver.createDirectory('foo')
        .then(() => {
          done(shouldThrowError);
        })
        .catch((error: Error) => {
          assert.equal(error.message, forcedError);
          done();
        });
    });
  });

  describe('listContents', () => {
    const driver = new S3Driver(configuration);
    const mockedMinio = new MockMinio(configuration);
    // @ts-ignore
    driver.client = mockedMinio;

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
        .catch((e) => {
          done(e);
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
        .catch((e) => {
          done(e);
        });
    });

    it('should prefix /', (done) => {
      // assert.doesNotThrow(() => driver.listContents(''));
      driver.listContents('baz', { recursive: true })
        .then((actual) => {
          const expected = [
            '/baz/foo.json',
          ];

          assert.deepEqual(actual, expected);
          done();
        })
        .catch((e) => {
          done(e);
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
    const driver = new S3Driver(configuration);
    const mockedMinio = new MockMinio(configuration);
    // @ts-ignore
    driver.client = mockedMinio;

    beforeEach(() => {
      mock({
        '/app/baz.html': '...',
        '/app/empty': {},
        '/app/full/baz.html': '...',
      });
    });

    afterEach(() => {
      mock.restore();
      // @ts-ignore
      driver.client.forceError = false;
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

    it('must return false if file not found', async () => {
      // @ts-ignore
      driver.client.forceError = true;
      const actual = await driver.exists('baz.html');
      assert.isNotOk(actual);
    });

    it('must return false if directory not found', async () => {
      // @ts-ignore
      driver.client.forceError = true;
      const actual = await driver.exists('baz/');
      assert.isNotOk(actual);
    });

    it('must return false if directory is empty', async () => {
      // @ts-ignore
      driver.client.forceError = true;
      const actual = await driver.exists('empty/');
      assert.isNotOk(actual);
    });
  });

  describe('lastModified', () => {
    const driver = new S3Driver(configuration);
    const mockedMinio = new MockMinio(configuration);
    // @ts-ignore
    driver.client = mockedMinio;

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
    const driver = new S3Driver(configuration);
    const mockedMinio = new MockMinio(configuration);
    // @ts-ignore
    driver.client = mockedMinio;

    beforeEach(() => {
      mock({
        '/app/baz.xml': '...',
        '/etc/secret': '...',
      });
    });

    afterEach(() => {
      mock.restore();
    });

    it('should return file size in bytes', async () => {
      const actual = await driver.fileSize('baz.xml');
      const expected = 3; // bytes
      assert.typeOf(actual, 'number');
      assert.equal(actual, expected);
    });

    it('must not get file size outside root when jail is set to true', (done) => {
      driver.fileSize('../etc/secret')
        .then(() => done('test failed'))
        .catch(() => done());
    });

    it('must return error when file does not exist', (done) => {
      driver.fileSize('/missing')
        .then(() => done('test failed'))
        .catch(() => done());
    });
  });

  describe('move', () => {
    const driver = new S3Driver(configuration);
    const mockedMinio = new MockMinio(configuration);
    // @ts-ignore
    driver.client = mockedMinio;

    beforeEach(() => {
      mock({
        '/app/baz.xml': '...',
        '/etc/foo.xml': '...',
        '/app/fae/bar.xml': '...',
        '/app/full/bar.xml': '...',
        '/app/full/baz.xml': '...',
        '/app/zoo/': {},
      });
    });

    afterEach(() => {
      mock.restore();
      // @ts-ignore
      driver.client.forceError = false;
    });

    it('should move file', async () => {
      await driver.move('baz.xml', 'hope.xml');
      assert.exists('/app/hope.xml');
    });

    it('should move folder', async () => {
      await driver.move('fae/', 'tae/');
      assert.exists('/app/tae/bar.xml');
    });

    it('should move file into folder', async () => {
      await driver.move('baz.xml', 'zoo/');
      assert.exists('/app/zoo/baz.xml');
    });

    it('should rename directory', async () => {
      await driver.move('full/', 'zoo/');
      assert.exists('/app/renamed/baz.xml');
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

    it('must handle errors', (done) => {
      // @ts-ignore
      driver.client.forceError = true;
      driver.move('bar.xml', 'hope.xml')
        .then(() => {
          done(shouldThrowError);
        })
        .catch((error: Error) => {
          assert.equal(error.message, forcedError);
          done();
        });
    });

    it('must not move files into folder that is full', (done) => {
      const e = "ENOTEMPTY: directory not empty, move '/fae/' -> '/full/'";
      // @ts-ignore
      driver.move('/fae/', '/full/')
        .then(() => {
          done(shouldThrowError);
        })
        .catch((error: Error) => {
          assert.equal(error.message, e);
          done();
        });
    });
  });

  describe('copy', () => {
    const driver = new S3Driver(configuration);
    const mockedMinio = new MockMinio(configuration);
    // @ts-ignore
    driver.client = mockedMinio;

    beforeEach(() => {
      mock({
        '/app/bar.xml': '...',
        '/etc/baz.xml': '...',
      });
    });

    afterEach(() => {
      mock.restore();
      // @ts-ignore
      driver.client.forceError = false;
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

    it('must handle errors', (done) => {
      // @ts-ignore
      driver.client.forceError = true;
      driver.copy('bar.xml', 'hope.xml')
        .then(() => {
          done(shouldThrowError);
        })
        .catch((error: Error) => {
          assert.equal(error.message, forcedError);
          done();
        });
    });

    it('must not copy directory', (done) => {
      const e = "EISDIR: illegal operation on a directory, copy 'bar/' -> 'hope/'";
      // @ts-ignore
      driver.copy('bar/', 'hope/')
        .then(() => {
          done(shouldThrowError);
        })
        .catch((error: Error) => {
          assert.equal(error.message, e);
          done();
        });
    });
  });
});
