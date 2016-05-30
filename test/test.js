var electronChromeExtensions = require('../src/main')

exports.testExport = function(test) {
	test.expect(2)
  test.ok(typeof(electronChromeExtensions.load) === 'function', 'load() not exported')
  test.ok(typeof(electronChromeExtensions.addToWebview) === 'function', 'addToWebView() not exported')
  test.done()
}
