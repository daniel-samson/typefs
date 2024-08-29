/* eslint-disable */
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { FileDriver } from '../..';
import itShouldBehaveLikeADiskDriver from './manual-test-suite';

describe('file-driver', () => {
  const root = join(__dirname, '.ignore');
  const jail = true;

  if (!existsSync(root)) {
    mkdirSync(root);
  }

  const disk = new FileDriver({
    root,
    jail,
  });

  itShouldBehaveLikeADiskDriver(disk);
});
