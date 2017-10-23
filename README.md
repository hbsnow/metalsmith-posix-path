# metalsmith-posix-path

[![Build Status](https://travis-ci.org/hbsnow/metalsmith-posix-path.svg?branch=master)](https://travis-ci.org/hbsnow/metalsmith-posix-path)

Metalsmith plugin that add posix path and rename files.

## Install

```
npm install metalsmith-posix-path
```

## Usage

```
var Metalsmith = require('metalsmith')
var posixPath = require('metalsmith-posix-path')

Metalsmith(__dirname)
  .use(posixPath({
    property：['path', 'canonical'],
    rename: {
      extname: '.html'
    }
  }))
  .build()
```

## Options

|    name    |            description            |    default    |         type         |
| ---------- | --------------------------------- | ------------- | -------------------- |
| `property` | property name for metadata        | `'posixPath'` | `string` or `array`  |
| `omit`     | delete filename if it's `index.*` | `true`        | `boolean`            |
| `rename`   | rename file                       | `{}`          | `string` or `object` |

rename: https://github.com/popomore/rename

## License

MIT
