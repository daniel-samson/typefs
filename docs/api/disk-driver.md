---
title: Disk Driver
sidebar_label: Disk Driver
---

Disk Driver is the common interface between all disks. This means that you only need to learn one set of methods across the different file system types.

## Writing Files

TypeFS offers two methods for reading files: **write()** and **writeStream()**. The **write()** method is ideal for writing small files (less than 10KB). The **writeStream()** method is more memory efficient, as it can write large files in chunks.

### Example

```typescript
import { Storage } from "typefs";

try {
  // write small file
  const contents = "hello";
  await Storage.disk().write("manifest.json", contents);

  // copy large fil
  await Storage.disk().writeStream(
    "/vlog.mp4",
    Storage.disk("tmp").readStream("03cdsedc")
  );
} catch (e) {
  // handle the error
}
```

### write()

#### Parameters

| Param | Type   | Description                 |
| ----- | ------ | --------------------------- |
| path  | string | path relative to disks root |
| data  | Buffer | contents of file            |

### writeStream()

#### Parameters

| Param | Type   | Description                 |
| ----- | ------ | --------------------------- |
| path  | string | path relative to disks root |
| data  | Stream | contents of file            |

:::info
**Returns:** `Promise<void>`
:::

:::danger
**Throws:** Error when path is outside the disks root directory and configuration.jail is set to true
:::

## Reading Files

TypeFS offers two methods for reading files: **read()** and **readStream()**. The **read()** method is ideal for retrieving small files (less than 10KB). The **readStream()** method is more memory efficient, as it can read large files in chunks.

### Example

```typescript
import { Storage } from "typefs";

try {
  // small files
  const contents: Buffer = await Storage.disk().read("manifest.json");
  console.log(contents.toString());

  // large files
  const stream: Readable = await Storage.disk().readStream("podcast.mp3");
  const buffer: any[] = [];
  stream.on("data", (part: any) => {
    // do something with part
  });
  stream.on("error", reject);
  stream.on("end", () => {
    console.log("stream has ended, there is no more data to fetch");
  });
} catch (e) {
  // handle the error
}
```

### Parameters

| Param | Type   | Description                 |
| ----- | ------ | --------------------------- |
| path  | string | path relative to disks root |

:::info
**Returns:** `Promise<Buffer>`. The Buffer is the contents of file
:::

:::danger
**Throws:** Error when path is outside the disks root directory and configuration.jail is set to true
:::

## Deleting Files

### Example

```typescript
import { Storage } from "typefs";

try {
  await Storage.disk().deleteFile("manifest.json");
} catch (e) {
  // handle the error
}
```

### Parameters

| Param | Type   | Description                 |
| ----- | ------ | --------------------------- |
| path  | string | path relative to disks root |

:::info
**Returns:** `Promise<void>`.
:::

:::danger
**Throws:** Error when path is outside the disks root directory and configuration.jail is set to true
:::

## Deleting Directory

Removes directory

### Example

```typescript
import { Storage } from "typefs";

try {
  await Storage.disk().deleteDirectory("profiles");
} catch (e) {
  // handle the error
}
```

### Parameters

| Param | Type   | Description                 |
| ----- | ------ | --------------------------- |
| path  | string | path relative to disks root |

:::info
**Returns:** `Promise<void>`.
:::

:::danger
**Throws:** Error when path is outside the disks root directory and configuration.jail is set to true
:::

## Creates Directory

Creates directory

### Example

```typescript
import { Storage } from "typefs";

try {
  await Storage.disk().createDirectory("profiles");
} catch (e) {
  // handle the error
}
```

### Parameters

| Param | Type   | Description                 |
| ----- | ------ | --------------------------- |
| path  | string | path relative to disks root |

:::info
**Returns:** `Promise<void>`.
:::

:::danger
**Throws:** Error when path is outside the disks root directory and configuration.jail is set to true
:::

## List Contents of Directory

There are two ways to list the contents of a directory. You can list the contents of the directory or you can list the contents of the directory including the subdirectories and files as well.

### Example

**List Contents**

```typescript
import { Storage } from "typefs";

try {
  await Storage.disk().listContents("/profiles");
} catch (e) {
  // handle the error
}
```

**List Contents of Directory including subdirectories and files**

```typescript
import { Storage } from "typefs";

try {
  await Storage.disk().listContents("profiles", { recursive: true });
} catch (e) {
  // handle the error
}
```

### Parameters

| Param   | Type                 | Description                                                             |
| ------- | -------------------- | ----------------------------------------------------------------------- |
| path    | string               | path relative to disks root                                             |
| options | ListDirectoryOptions | when recursive is set to true all subdirectories and files are returned |

:::info
**Returns:** `Promise<string[]>` An array of paths relative to the disks root directory.
:::

:::danger
**Throws:** Error when path is outside the disks root directory and configuration.jail is set to true
:::

## Path Exists

### Example

```typescript
import { Storage } from "typefs";

try {
  if (await Storage.disk().exists("profiles")) {
    // do some other fs operation
  }
} catch (e) {
  // handle the error
}
```

### Parameters

| Param | Type   | Description                 |
| ----- | ------ | --------------------------- |
| path  | string | path relative to disks root |

:::info
**Returns:** `Promise<boolean>` true if files exists
:::

:::danger
**Throws:** Error when path is outside the disks root directory and configuration.jail is set to true
:::

## Last Modified

### Example

```typescript
import { Storage } from 'typefs';

try {
    const lastModified: Date = await Storage.disk().lastModified('profiles'));
    // ...
} catch (e) {
    // handle the error
}
```

### Parameters

| Param | Type   | Description                 |
| ----- | ------ | --------------------------- |
| path  | string | path relative to disks root |

:::info
**Returns:** `Promise<Date>` Date object of when the path was last modified
:::

:::danger
**Throws:** Error when path is outside the disks root directory and configuration.jail is set to true
:::

## File Size

### Example

```typescript
import { Storage } from 'typefs';

try {
    const fileSize: Number = await Storage.disk().fileSize('profiles'));
    // ...
} catch (e) {
    // handle the error
}
```

### Parameters

| Param | Type   | Description                 |
| ----- | ------ | --------------------------- |
| path  | string | path relative to disks root |

:::info
**Returns:** `Promise<Number>` Positive integer of the file size in bytes.
:::

:::danger
**Throws:** Error when path is outside the disks root directory and configuration.jail is set to true
:::

## Move or Rename

### Example

```typescript
import { Storage } from 'typefs';

try {
    await Storage.disk().move('a.txt', 'b.txt'));
    // ...
} catch (e) {
    // handle the error
}
```

### Parameters

| Param       | Type   | Description                      |
| ----------- | ------ | -------------------------------- |
| source      | string | from path relative to disks root |
| destination | string | to path relative to disks root   |

:::info
**Returns:** `Promise<void>`.
:::

:::danger
**Throws:** Error when path is outside the disks root directory and configuration.jail is set to true
:::

## Copy

### Example

```typescript
import { Storage } from 'typefs';

try {
    await Storage.disk().copy('a.txt', 'b.txt'));
    // ...
} catch (e) {
    // handle the error
}
```

### Parameters

| Param       | Type   | Description                      |
| ----------- | ------ | -------------------------------- |
| source      | string | from path relative to disks root |
| destination | string | to path relative to disks root   |

:::info
**Returns:** `Promise<void>`.
:::

:::danger
**Throws:** Error when path is outside the disks root directory and configuration.jail is set to true
:::
