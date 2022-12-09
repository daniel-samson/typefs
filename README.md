Type FS
====

The single way to manipulate files in NodeJS. With Type FS you can define multiple disk locations across common protocols such as **file://** or **s3://**. Use the disk manager to manipulate files located in disks.

## Project Status

[![npm (tag)](https://img.shields.io/npm/v/typefs/latest)](https://www.npmjs.com/package/typefs)
[![Node.js CI](https://github.com/daniel-samson/typefs/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/daniel-samson/typefs/actions/workflows/ci.yml)
[![CodeQL](https://github.com/daniel-samson/typefs/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/daniel-samson/typefs/actions/workflows/codeql-analysis.yml)
[![codecov](https://codecov.io/gh/daniel-samson/typefs/branch/main/graph/badge.svg?token=RYZSMgtASL)](https://codecov.io/gh/daniel-samson/typefs)
[![CodeFactor](https://www.codefactor.io/repository/github/daniel-samson/typefs/badge)](https://www.codefactor.io/repository/github/daniel-samson/typefs)
![npms.io (quality)](https://img.shields.io/npms-io/maintenance-score/typefs)

Please refer to the [roadmap](https://github.com/daniel-samson/typefs/projects?query=is%3Aopen+sort%3Acreated-asc) to get the current progress of feature requests and bug fixes.

## Why Type FS

- Write automation scripts to manage files in many storage locations.
- In your web application, restrict access to directories in your filesystem.
- Keep your code readable. No callback hell, No excess promises.
- You only have to learn one set of methods.
- Supports JSON, TypeScript, or JavaScript configuration files.
- Can be configured via environment variables to change the storage configuration.

## Installation
In your project folder, run the following command:

```bash
npm install typefs
# npm install typefs-s3-driver
```

## Example

```typescript
// index.ts
import { Storage, Configuration } from 'typefs;
import { S3Driver } from 'typefs-s3-driver';
import { S3Disk } from 'typefs-registry';

// As of version 2.0.0 the s3 driver was moved to a separate npm package.
Storage.registerDriver('s3', (configuration: DiskConfiguration) => new S3Driver(configuration as S3Disk));

Storage.config: Configuration = {
    default: 'assets',
    disks: {
        tmp: {
            driver: 'file',
            root: '/tmp/',
            jail: true,
        }
        app: {
            driver: 'file',
            root: '/app/',
            jail: true,
        }
        assets: {
            driver: 'file',
            root: '/app/public/assets/',
            jail: true,
        }
        s3: {
            driver: 's3',
            root: '/',
            jail: true,
            "bucket": process.env.S3_BUCKET || 'my-s3-bucket',
            "endPoint": process.env.S3_ENDPOINT || 's3.amazonaws.com',
            "accessKey": process.env.S3_ACCESS_KEY || 'minio-access-key',
            "secretKey": process.env.S3_SECRET_KEY || 'minio-secret-key',
        }
    }
}


const logoPng: Buffer = await Storage.disk().read('logo.png');

```

## Documentation

- [Getting Started / Installation](https://typefs.io/docs/getting-started/installation)
- [Configuration](https://typefs.io/docs/getting-started/configuration)
- [File Driver](https://typefs.io/docs/drivers/file)
- [S3 Driver](https://typefs.io/docs/drivers/s3)
- [Disk Driver API](https://typefs.io/docs/api/disk-driver)


## Contribute

- [Ask a question](https://github.com/daniel-samson/typefs/issues/new?assignees=&labels=question&template=question.md&title=Question%3A+)
- [Report a bug](https://github.com/daniel-samson/typefs/issues/new?assignees=&labels=bug&template=bug_report.md&title=Bug+Report%3A+)
- [Request documentation](https://github.com/daniel-samson/typefs/issues/new?assignees=&labels=documentation&template=documentation.md&title=Needs+Documentation%3A+)
- [Request a new feature](https://github.com/daniel-samson/typefs/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=)
- [Write Code](https://daniel-samson.github.io/typefs/docs/contributing/join/#contributing-code)
- [Write Documentation](https://daniel-samson.github.io/typefs/docs/contributing/join/#contributing-documentation)

