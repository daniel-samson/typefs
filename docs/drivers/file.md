---
title: Drivers
sidebar_label: File
---

The file driver lets you access the local file system.

## Configuration
The file driver takes two configuration parameters:

```typescript
import { FileDriver } from 'typefs';

const driver = new FileDriver({
    "root": "/app/",
    "jail": true
}
```

### Paramaters

| Param | Type            | Description           |
|-------|-----------------|-----------------------|
| root  | string | defines the absolute path of the disk root path |
| jail  | boolean | when set to true, it only allows access to files and directories in side the root path |

