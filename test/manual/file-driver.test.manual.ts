/* eslint-disable */
// script to manually test s3-driver
// and capture response so that they can be mocked 
// in the automated tests
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { FileDriver } from '../..';
// using minio for testing
const root = join(__dirname, '.ignore');
const jail = true;

const disk = new FileDriver({
  root,
  jail,
});

if (!existsSync(root)) {
  mkdirSync(root);
}

// record responses for each method:
// write file
async function writeTest() {
  try {
   console.log('write', await disk.write('foo.txt', Buffer.from('Hello world')));
  } catch (e) {
    console.error('write', e);
  }
}

// read file
async function readTest() {
  try {
   console.log('read', (await disk.read('foo.txt')).toString());
  } catch (e) {
    console.error('read', e);
  }
}
// get lastModified
async function lastModifiedTest() {
  try {
    console.log('lastModified', await disk.lastModified('foo.txt'));
  } catch (e) {
    console.error('lastModified', e);
  }
}
// get fileSize
async function fileSizeTest() {
  try {
    console.log('fileSize', await disk.fileSize('foo.txt'));
  } catch (e) {
    console.error('fileSize', e);
  }
}
// copy
async function copyTest() {
  try {
    console.log('copy', await disk.copy('foo.txt', 'bar.txt'));
  } catch (e) {
    console.error('copy', e);
  }
}
// move
async function moveTest() {
  try {
    console.log('move', await disk.move('bar.txt', 'foo.txt'));
  } catch (e) {
    console.error('move', e);
  }
}
// make directory
async function makeDirectoryTest() {
  try {
    console.log('makeDirectory', await disk.createDirectory('sub'));
  } catch (e) {
    console.error('makeDirectory', e);
  }
}
// list directory
async function listContentsTest() {
  try {
    console.log('listContents', await disk.listContents('/'));
    console.log('listContents', await disk.listContents('/', {recursive: true}));
    console.log('listContents', await disk.listContents('sub', { recursive: true}));
    console.log('listContents', await disk.listContents('sub'));
  } catch (e) {
    console.error('listContents', e);
  }
}
// check exists
async function existsDirectory() {
  try {
    // need to fake this by checking for the empty file generated
    console.log('existsDirectory', await disk.exists('sub/'));
  } catch (e) {
    console.error('existsDirectory', e);
  }
}
// delete directory
async function deleteDirectory() {
  try {
    console.log('deleteDirectory', await disk.deleteDirectory('sub'));
  } catch (e) {
    console.error('deleteDirectory', e);
  }
}
// delete file
async function deleteFile() {
  try {
    console.log('deleteFile', await disk.deleteFile('foo.txt'));
  } catch (e) {
    console.error('deleteFile', e);
  }
}
// check exists
async function existsFile() {
  try {
    console.log('existsFile', await disk.exists('foo.txt'));
  } catch (e) {
    console.error('existsFile', e);
  }
}

// tests

async function test() {
  await writeTest();
  await readTest();
  await existsFile();
  await lastModifiedTest();
  await fileSizeTest();
  await copyTest();
  await moveTest();
  await makeDirectoryTest();
  await existsDirectory();
  await listContentsTest();
  await deleteDirectory();
  await deleteFile();
}

test();
