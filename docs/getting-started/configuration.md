---
title: Configuration
sidebar_label: Configuration
---

Before you can use TypeFS, you will need to configure the [storage manager](https://daniel-samson.github.io/typefs/docs/api/storage). TypeFS has a concept called **"disks"** which lets you define multiple locations with a disk driver.

You can configure TypeFS by editing your project's entry file:

```typescript
// index.ts
import { Storage, Configuration, S3Disk } from 'typefs';

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
    }
}
```

