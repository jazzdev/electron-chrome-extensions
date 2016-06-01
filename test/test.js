var chromeExtensions = require('../src/main')

exports.testExport = function(test) {
  test.expect(2)
  test.equal(typeof(chromeExtensions.load), 'function', 'load() not exported')
  test.equal(typeof(chromeExtensions.addToWebview), 'function', 'addToWebView() not exported')
  test.done()
}

exports.testLoad = function(test) {
  chromeExtensions.load(chromeExtensions.defaultPath, function(err, extensions) {
    if (err) throw err
    test.expect(extensions.size)
    extensions.forEach(function(extension) {
      test.equal(typeof(extension.name), 'string', 'Extension does not have a name')
      console.log('Found extension ' + extension.name)
    })
    test.done()
  })
}
