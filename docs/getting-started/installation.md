---
title: Installation
sidebar_label: Installation
slug: /
---

## Meet Type FS
A file storage package that provides a single interface to many types of filesystems. 

## Why Type FS

- Restrict access to directories in your filesystem.
- You only have to learn one set of methods for each type of storage.
- Can be configured via environment variables to change the storage configuration.
- Can be configured useing JSON or JavaScript

## Setting up your environment

### Installation

Install type fs using npm:

```bash
npm install typefs
```

### Configure
Type FS has the concept disks, which lets you configure many directory locations and which driver to use. You can configure the Storage manager by editing your project's entry file:

```typescript
// index.ts
import { Storage, Configuration } from 'typefs;

Storage.config: Configuration = {
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

Use the storage manager to manipulate your disks:

```typescript
import { Storage } from 'typefs;

async function doFoo() {
    const path = 'file.txt';
    const content = Buffer.from('hello world');
    await Storage.disk('assets').write(path, content);
}
```

