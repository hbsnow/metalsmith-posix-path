const path = require('path')
const util = require('util')
const normalize = require('normalize-path')
const rename = require('rename')

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

      let filepath = normalizePath !== '/' ? normalizePath : ''
      if (filepath && options.rename) {
        filepath = rename(filepath, options.rename)
      }

      if (!Array.isArray(options.property)) {
        options.property = [options.property]
      }

      options.property.forEach((prop) => {
        files[file][prop] = filepath
      })
    })
  }
}
