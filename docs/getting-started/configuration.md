---
title: Configuration
sidebar_label: Configuration
---

Before you can use TypeFS, you will need to configure the [storage manager](https://daniel-samson.github.io/typefs/docs/api/storage). TypeFS has a concept called **"disks"**, which lets you define multiple locations with a disk driver.

You can configure TypeFS by editing your project's entry file:

```typescript
// index.ts
import { Storage, Configuration } from 'typefs;

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
            root: '/app/public/assets/'
            jail: true,
        }
        s3: {
            driver: 's3',
            root: '/'
            jail: true,
            "bucket": process.env.S3_BUCKET || 'my-s3-bucket',
            "endPoint": process.env.S3_ENDPOINT || 's3.amazonaws.com',
            "accessKey": process.env.S3_ACCESS_KEY || 'minio-access-key',
            "secretKey": process.env.S3_SECRET_KEY || 'minio-secret-key',
        }
    }
}
```

