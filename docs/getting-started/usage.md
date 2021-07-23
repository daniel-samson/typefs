---
title: Usage
sidebar_label: Usage
---

In a project file, use the [storage manager](https://daniel-samson.github.io/typefs/docs/api/storage) to manipulate your disks:

```typescript
import { Storage } from 'typefs;

async function doFoo() {
    const path = 'file.txt';
    const content = Buffer.from('hello world');
    await Storage.disk('assets').write(path, content);
}
```

