---
title: Config
sidebar_label: Config
---

Type FS is a batteries included package which lets you define a configuration file to determine how the Storage manager behaves. You can also set the configuration manually if you prefer.

## Example

```typescript
import { Storage, config } from 'typefs';

Storage.config = config();
```

## Configuration

In you package.json you can configure the path to use:

```json
{
    "config": {
      "typefs": "config/filesystem.js"      
    }
}
```

this can be either a JSON file or a JavaScript file:

```javascript
// config/filesystem.js
module.exports = {
    default: 'assets',
    disks: {
        assets: {
            driver: 'file',
            root: '/app/public/assets'
            jail: true
        }
    }
}
```
