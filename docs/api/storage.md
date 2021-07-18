---
title: Storage
sidebar_label: Storage
---

The storage manager holds the configuration of your disks and which disk is the default one.

### Example
```JSON
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
### Use Default Disk

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
The "driver" specifies which driver will be used to access the file system. This is followed by configuration for said driver.
