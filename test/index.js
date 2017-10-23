var assert = require('assert')
var path = require('path')
var Metalsmith = require('metalsmith')
var posixPath = require('..')

describe('metalsmith-posix-path', function () {
  it('メタデータにPOSIXパスを追加する', function (done) {
    var metalsmith = Metalsmith('test/fixtures/basic')
    metalsmith
      .use(posixPath())
      .build(function (err, files) {
        if (err) return done(err)

        const keys = Object.keys(files)
        assert.equal(keys.length, 1)
        keys.forEach(function (file) {
          switch (files[file].title) {
            case 'one':
              assert.equal(files[file].posixPath, 'path/to/one.md')
              break
          }
        })
        done()
      })
  })

  it('omitがtrueのとき拡張子を除くファイル名がindexならファイル名を省略する', function (done) {
    var metalsmith = Metalsmith('test/fixtures/omit')
    metalsmith
      .use(posixPath())
      .build(function (err, files) {
        if (err) return done(err)

        const keys = Object.keys(files)
        assert.equal(keys.length, 1)
        keys.forEach(function (file) {
          switch (files[file].title) {
            case 'index':
              assert.equal(files[file].posixPath, 'path/to/')
              break
          }
        })
        done()
      })
  })

  it('omitがfalseのときファイル名は省略しない', function (done) {
    var metalsmith = Metalsmith('test/fixtures/not-omit')
    metalsmith
      .use(posixPath({ omit: false }))
      .build(function (err, files) {
        if (err) return done(err)

        const keys = Object.keys(files)
        assert.equal(keys.length, 1)
        keys.forEach(function (file) {
          switch (files[file].title) {
            case 'index':
              assert.equal(files[file].posixPath, 'path/to/index.md')
              break
          }
        })
        done()
      })
  })

  it('スラッシュだけなら空文字にする', function (done) {
    var metalsmith = Metalsmith('test/fixtures/only-slash')
    metalsmith
      .use(posixPath())
      .build(function (err, files) {
        if (err) return done(err)

        const keys = Object.keys(files)
        assert.equal(keys.length, 1)
        keys.forEach(function (file) {
          switch (files[file].title) {
            case 'index':
              assert.equal(files[file].posixPath, '')
              break
          }
        })
        done()
      })
  })

  it('ファイル名を書き換える', function (done) {
    var metalsmith = Metalsmith('test/fixtures/rename')
    metalsmith
      .use(posixPath({ rename: 'test2.html' }))
      .build(function (err, files) {
        if (err) return done(err)

        const keys = Object.keys(files)
        assert.equal(keys.length, 1)
        keys.forEach(function (file) {
          switch (files[file].title) {
            case 'index':
              assert.equal(files[file].posixPath, 'test2.html')
              break
          }
        })
        done()
      })
  })

  it('拡張子を書き換えて接頭尾を追加する', function (done) {
    var metalsmith = Metalsmith('test/fixtures/rename-ext')
    metalsmith
      .use(posixPath({
        rename: {
          suffix: '-suffix',
          extname: '.html'
        }
      }))
      .build(function (err, files) {
        if (err) return done(err)

        const keys = Object.keys(files)
        assert.equal(keys.length, 1)
        keys.forEach(function (file) {
          switch (files[file].title) {
            case 'index':
              assert.equal(files[file].posixPath, 'test-suffix.html')
              break
          }
        })
        done()
      })
  })

  it('複数のメタデータを追加する', function (done) {
    var metalsmith = Metalsmith('test/fixtures/multi-metadata')
    metalsmith
      .use(posixPath({
        property: ['posixPath', 'testPath']
      }))
      .build(function (err, files) {
        if (err) return done(err)

        const keys = Object.keys(files)
        assert.equal(keys.length, 1)
        keys.forEach(function (file) {
          switch (files[file].title) {
            case 'index':
              assert.equal(files[file].posixPath, 'test.html')
              assert.equal(files[file].testPath, 'test.html')
              break
          }
        })
        done()
      })
  })
})
