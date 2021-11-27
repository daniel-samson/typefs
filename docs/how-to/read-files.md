---
title: How to read files
sidebar_label: Read files
---

Use the [storage manager](https://daniel-samson.github.io/typefs/docs/api/storage) to read files from a disk.

### Small Files

The **read()** method is ideal for reading small files (less than 10KB):

```typescript
import { Storage } from 'typefs;

async function makeFile() {
    const path = 'file.txt';
    const content = Buffer.from('hello world');
    const file = await Storage.disk('assets').read(path);
}
```

### Large File

**readStream()** is a more memory efficient method, as it can read large files in chunks:

### Example

```typescript
import { Storage } from "typefs";
async function makeLargeFile() {
  const fileStream = await Storage.disk("tmp").readStream("video.mp4");
}
```

