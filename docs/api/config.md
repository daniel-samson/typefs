---
title: Config
sidebar_label: Config
---

With the `config()` function you can specify the path to your config file in package.json and the `config()` function will load the specified file.

## Example

```typescript
import { Storage, config } from 'typefs';

Storage.config = config();
```

## Package.json

In you package.json you can configure the path to use:

```json
{
    "config": {
      "typefs": "config/filesystem.js"      
    }
}
```

## Config File

### Javascript
```javascript
// config/filesystem.js
module.exports = {
    default: 'assets',
    disks: {
        assets: {
            driver: 'file',
            root: '/app/public/assets',
            jail: true,
        }
    }
}
```

### JSON
```javascript
// config/filesystem.json
{
    default: 'assets',
    disks: {
        assets: {
            driver: 'file',
            root: '/app/public/assets',
            jail: true,
        }
    }
}
```
