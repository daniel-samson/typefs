---
title: Installation
sidebar_label: Installation
slug: /
---

## Meet Type FS
Type FS is a package that provides a single way to access and manipulate many types of storage services. 

## Why Type FS

- Keeps your code readable.
- Restricts access to directories in your filesystem.
- You only have to learn one set of methods for each type of storage.
- Prevents vendor lockin
- Supports JSON or JavaScript configuration files.
- Can be configured via environment variables to change the storage configuration.


## Setting up your environment

### Installation

To install type fs into your projects run the following command:

```bash
npm install typefs
```

### Configuration example
Type FS has a concept called **"disks"**, which lets you configure many directory locations with a storage driver. You can configure the [storage manager](https://daniel-samson.github.io/typefs/docs/api/storage) by editing your project's entry file:

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

:::info
Type FS also comes with a [config](https://daniel-samson.github.io/typefs/docs/api/config) method which enables you to store the configuration in a separate file.
:::

### Usage Example

In a project file, use the [storage manager](https://daniel-samson.github.io/typefs/docs/api/storage) to manipulate your disks:

```typescript
import { Storage } from 'typefs;

async function doFoo() {
    const path = 'file.txt';
    const content = Buffer.from('hello world');
    await Storage.disk('assets').write(path, content);
}
```

