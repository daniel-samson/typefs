/* eslint-disable */
import { assert } from 'chai';
import { DiskDriver } from 'typefs-registry';

/**
 * Test to ensure that all drivers appear to behave in the same way.
 * Users should feel confident that they can switch drivers without
 * re-writing code.
 *
 * However it is important that we document
 * the differences in behavior, performance between each drivers,
 * and provide good recommendations.
 *
 * @param {DiskDriver} disk driver currently being tested
 */
function itShouldBehaveLikeADiskDriver(disk: DiskDriver) {
  const data = Buffer.from('Testing Testing 1, 2, 3 ... :)');
  /*
   * Test file structure
   * /
   * /foo.txt
   * /from.txt
   * /to.txt
   * /sub/
   * /sub/bar.txt
   * /empty/
   */
  const rootFile = '/foo.txt';
  const subDirectory = '/sub/';
  const subFile = `${subDirectory}bar.txt`;
  const subEmptyDirectory = '/empty/';
  const fromFile = '/from.txt';
  const toFile = '/to.txt';
  const fromDirectory = '/from/';
  const fromDirectoryFile = `${fromDirectory}/baz.txt`;
  const toDirectory = '/to/';
  const toDirectoryFile = `${toDirectory}/baz.txt`;

  describe('DiskDriver', () => {
    // eslint-disable-next-line mocha/no-hooks-for-single-case
    after(async () => {
      disk.deleteFile(rootFile).catch(() => false);
      await disk.deleteFile(toFile).catch(() => false);
      await disk.deleteFile(fromFile).catch(() => false);
      await disk.deleteDirectory(subDirectory).catch(() => false);
      await disk.deleteDirectory(subEmptyDirectory).catch(() => false);
      await disk.deleteDirectory(fromDirectory).catch(() => false);
      await disk.deleteDirectory(toDirectory).catch(() => false);
    });

    it('should behave like a DiskDriver', async () => {
      // exists - negative tests
      assert.isNotOk(await disk.exists(rootFile));
      assert.isNotOk(await disk.exists(subFile));
      assert.isNotOk(await disk.exists(fromFile));
      assert.isNotOk(await disk.exists(toFile));
      assert.isNotOk(await disk.exists(subEmptyDirectory));
      assert.isNotOk(await disk.exists(fromDirectory));

      // create file structure
      await disk.write(rootFile, data);
      await disk.write(fromFile, data);
      await disk.createDirectory(subDirectory);
      await disk.write(subFile, data);
      await disk.createDirectory(fromDirectory);
      await disk.createDirectory(toDirectory);
      await disk.write(fromDirectoryFile, data);
      /* directory paths must end in '/' */
      await disk.createDirectory(subEmptyDirectory);

      // exists - positive tests
      assert.isOk(await disk.exists(rootFile));
      assert.isOk(await disk.exists(subEmptyDirectory));
      assert.isOk(await disk.exists(subDirectory));
      assert.isOk(await disk.exists(subFile));
      assert.isOk(await disk.exists(fromFile));

      // list contents - tests
      assert.sameDeepMembers(await disk.listContents('/'), [
        '/foo.txt',
        '/from.txt',
      ]);
      assert.sameDeepMembers(await disk.listContents('/sub/'), ['/sub/bar.txt']);
      assert.sameDeepMembers(await disk.listContents('/empty/'), []);

      // recursive list contents - tests
      assert.sameDeepMembers(await disk.listContents('/', { recursive: true }), [
        '/foo.txt',
        '/from.txt',
        '/sub/bar.txt',
        '/from/baz.txt',
      ]);
      assert.sameDeepMembers(await disk.listContents('/sub/', { recursive: true }), ['/sub/bar.txt']);
      assert.sameDeepMembers(await disk.listContents('/empty/', { recursive: true }), []);

      // read contents - tests
      assert.equal((await disk.read(rootFile)).toString(), data.toString());
      assert.equal((await disk.read(subFile)).toString(), data.toString());
      assert.equal((await disk.read(fromFile)).toString(), data.toString());

      // get stats - tests
      assert.equal(await disk.fileSize(rootFile), data.length);
      assert.instanceOf(await disk.lastModified(rootFile), Date);

      // copy / move - tests
      await disk.copy(fromFile, toFile);
      assert.isOk(await disk.exists(fromFile));
      assert.isOk(await disk.exists(toFile));
      assert.equal((await disk.read(fromFile)).toString(), data.toString());
      assert.equal((await disk.read(toFile)).toString(), data.toString());

      await disk.move(fromFile, toFile);
      assert.isNotOk(await disk.exists(fromFile));
      assert.isOk(await disk.exists(toFile));
      assert.equal((await disk.read(toFile)).toString(), data.toString());

      //  copy directories should throw error
      try {
        await disk.copy(fromDirectoryFile, toDirectoryFile);
        assert.fail();
      } catch (e) {
        assert.ok(true);
      }

      // Move Directory should throw an error if the destination is not empty
      try {
        await disk.move(fromDirectory, toDirectory);
        assert.fail();
      } catch (e) {
        assert.ok(true);
      }

      // delete / cleanup - tests
      await disk.deleteFile(rootFile);
      await disk.deleteFile(toFile);
      await disk.deleteDirectory(subDirectory);
      await disk.deleteDirectory(subEmptyDirectory);
      assert.isNotOk(await disk.exists(rootFile));
      assert.isNotOk(await disk.exists(subFile));
      assert.isNotOk(await disk.exists(fromFile));
      assert.isNotOk(await disk.exists(toFile));
      assert.isNotOk(await disk.exists(subDirectory));
      assert.isNotOk(await disk.exists(subEmptyDirectory));
    });
  });
}
// eslint-disable-next-line mocha/no-exports
export default itShouldBehaveLikeADiskDriver;
