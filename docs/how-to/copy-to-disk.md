---
title: How copy file to an other disk
sidebar_label: How copy file to an other disk
---

Use the [storage manager](https://daniel-samson.github.io/typefs/docs/api/storage) to copy or move files from a disk to and other disk.

```typescript
// copy
await Storage.disk('s3').writeStream('foo.jpg', Storage.disk('assets').readStream('foo.jpg'));

// delete old version (move)
await Storage.disk('s3').deleteFile('foo.jpg');
```
