---
title: Installation
sidebar_label: Installation
slug: /
---

## Meet Type FS
A file storage package that provides a single interface to many types of filesystems.

## Setting up your environment

### Installation

Install type fs using npm:

```bash
npm install typefs
```

### Configure

Configure the Storage manger by editing your project entry file eg. index.js, index.ts, app.js, app.ts:

```typescript
// index.ts
import { Storage, Configuration } from 'typefs;

Storage.getInstance().config: Configuration = {
    default: 'assets',
    disks: {
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

### Usage Example

Use Storage manager to manipulate your disks (file systems)

```typescript
import { Storage } from 'typefs;

async function doFoo() {
    const path = 'file.txt';
    const content = Buffer.from('hello world');
    await Storage.disk('assets').write(path, content);
}
```

