---
title: How to write files
sidebar_label: Write files
---

Use the [storage manager](https://daniel-samson.github.io/typefs/docs/api/storage) to write or create files to a disk.

### Small Files

The **write()** method is ideal for writing small files (less than 10KB):

```typescript
import { Storage } from 'typefs;

async function makeFile() {
    const path = 'file.txt';
    const content = Buffer.from('hello world');
    await Storage.disk('assets').write(path, content);
}
```

### Large File

**writeStream()** is a more memory efficient method, as it can write large files in chunks:

### Example

```typescript
import { Storage } from "typefs";

async function makeLargeFile() {
  await Storage.disk("assets").writeStream(
    "/vlog.mp4",
    Storage.disk("tmp").readStream("03cdsedc")
  );
}
```
