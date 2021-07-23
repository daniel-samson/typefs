---
title: Configuration
sidebar_label: Configuration
---

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

