# metalsmith-posix-path

[![Build Status](https://travis-ci.org/hbsnow/metalsmith-posix-path.svg?branch=master)](https://travis-ci.org/hbsnow/metalsmith-posix-path)

Metalsmith plugin that add posix path.

## Installation

```
npm install metalsmith-posix-path
```

## Usage

```
var Metalsmith = require('metalsmith')
var posixPath = require('metalsmith-posix-path')

Metalsmith(__dirname)
  .use(posixPath())
  .build()
```

### Options

| name       | description                     | default     |
|------------|---------------------------------|-------------|
| `property` | property name for metadata      | `posixPath` |
| `omit`     | delete filename if it's `index` | `true`      |

## License

MIT
