---
title: How to bulk rename files
sidebar_label: Bulk Rename files
---

You can use the [storage manager](https://daniel-samson.github.io/typefs/docs/api/storage) to make a script to organize your files:

```typescript
import { Storage } from 'typefs';

async function bulkRename() {
    const contents = await Storage.disk('assets').listContents('/');
    // Filter jpeg images
    const jpegs = contents.filter((f) => f.endsWith('.jpg'))
    const now = Date.now();

    // add time stamp to jpeg images
    jpegs.forEach(async (fileName) => {
        const newFileName = f.replace('.jpg', `-${now}.jpg`);
        await Storage.disk('assets').move(fileName, newFileName);
    })
}
```
