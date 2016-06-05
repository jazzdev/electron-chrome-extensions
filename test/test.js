'use strict'

var chromeExtensions = require('../src/main')

exports.testExport = function(test) {
  test.expect(3)
  test.equal(typeof(chromeExtensions.defaultPath), 'string', 'defaultPath not exported')
  test.equal(typeof(chromeExtensions.load), 'function', 'load() not exported')
  test.equal(typeof(chromeExtensions.addToWebview), 'function', 'addToWebView() not exported')
  test.done()
}

exports.testLoad = function(test) {
  chromeExtensions.load(chromeExtensions.defaultPath, function(err, extensions) {
    if (err) throw err
    test.expect(extensions.length)
    extensions.forEach(function(extension) {
      test.equal(typeof(extension.name), 'string', 'Extension does not have a name')
      console.log('Found extension ' + extension.name)
    })
    test.done()
  })
}

class MockWebView {
  constructor(url) {
    this.url = url;
  }

  get src() {
    return this.url;
  }

  executeJavaScript(code, userGesture, callback) {
    console.log('webview: executing script:', code)
    if (callback) callback(undefined)
  }
}

exports.testAdd = function(test) {
  test.expect(3)
  chromeExtensions.load(__dirname + '/../test/extensions', function(err, extensions) {
    if (err) throw err
    test.equal(1, extensions.length)
    var extension = extensions[0]
    test.equal(typeof(extension.name), 'string', 'Extension does not have a name')
    console.log('Found extension ' + extension.name)
    var webview = new MockWebView('http://www.google.com/')
    // returns true if the extension was applied
    chromeExtensions.addToWebview(webview, extension, (err) => {
      test.ifError(err)
      test.done()
    })
  })
}
