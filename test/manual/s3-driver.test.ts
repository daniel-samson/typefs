import { S3Driver } from '../..';
import itShouldBehaveLikeADiskDriver from './manual-test-suite';

describe('s3', () => {
  const endPoint = '127.0.0.1';
  const port = 9000;
  const accessKey = 'test-access';
  const secretKey = 'test-secret';
  const useSSL = false;
  const bucket = 'test-bucket';
  const root = '/';
  const jail = true;

  const disk = new S3Driver({
    bucket,
    endPoint,
    port,
    accessKey,
    secretKey,
    useSSL,
    root,
    jail,
  });

  itShouldBehaveLikeADiskDriver(disk);
});
