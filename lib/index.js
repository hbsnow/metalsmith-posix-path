'use strict'

const path = require('path')
const util = require('util')
const normalize = require('normalize-path')

const debuglog = util.debuglog('metalsmith-posix-path')
const defaults = {
  property: 'posixPath',
  omit: true
}

module.exports = (opts) => {
  const options = Object.assign({}, defaults, opts)

  return (files, metalsmith, done) => {
    setImmediate(done)

    Object.keys(files).forEach((file) => {
      debuglog('process file: %s', file)
      const paths = path.parse(file)
      const normalizePath = options.omit && paths.name === 'index'
        ? normalize(paths.dir + '/', false)
        : normalize(file, false)

      files[file][options.property] = normalizePath !== '/'
        ? normalizePath
        : '';
    })
  }
}
