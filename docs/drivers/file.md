---
title: File Driver
sidebar_label: File / Local
---

The file driver lets you access the local file system.

## Installation

It is bundled with the typefs package.

## Configuration
The file driver takes two configuration parameters:

```typescript
Storage.config = {
  disks: {
    "assets": {
      "root": "/app/assets",
      "jail": true,
    }
}
```

### Paramaters

| Param | Type            | Description           |
|-------|-----------------|-----------------------|
| root  | string | defines the absolute path of the disk root path |
| jail  | boolean | when set to true, it only allows access to files and directories in side the root path |

