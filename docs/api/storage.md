---
title: Storage Manager
sidebar_label: Storage Manager
---

The storage manager holds the configuration of your disks and which disk is the default one.

### Example
```json
{
    "default": "assets",
    "disks": {
        "assets": {
            "driver": "file",
            "root": "/app/public/assets",
            "jail": true
        }
    }
}
```
### Select Disk

Storage manager lets you select the disk you are interested in.

```typescript
import { Storage } from 'typefs';

const driver = Storage.disk('assets');
```

### Use Default Disk

To use the default disk, you simply ommit the disk to select

```typescript
import { Storage } from 'typefs';

const driver = Storage.disk();
```

### Disk Configuration
The "driver" specifies which driver will be used to access the file system. This is followed by [configuration](https://daniel-samson.github.io/typefs/docs/api/config) for said driver.

```typescript

import { Storage, config } from 'typefs';

Storage.config = config();
```

# Registering Disk Driver

To register a custom disk driver,

```typescript
// index.ts
import { Storage } from 'typefs';
//...

Storage.registerDriver(
  'mydiskdriver',
  (configuration: DiskConfiguration): DiskDriver => new MyDiskDriver(configuration as MyDiskConfig),
  );
```

update your configuration to use the new driver:

```json
{
    "default": "assets",
    "disks": {
        "assets": {
            "driver": "mydiskdriver",
            "root": "/app/public/assets",
            "jail": true,
        }
    }
}
```
