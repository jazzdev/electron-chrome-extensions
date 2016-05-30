# Electron Chrome Extensions

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

Support for Chrome Extensions in Electron apps

## Usage

```js
var electronChromeExtensions = require('electron-chrome-extensions')

extensions = electronChromeExtensions().load()
extensions.forEach(function (extension) {
  electronChromeExtensions.addToWebview(webview, extension)
}
```

## Installation

```sh
npm install electron-chrome-extensions --save
```

## License

MIT license

[npm-image]: https://img.shields.io/npm/v/electron-chrome-extensions.svg?style=flat
[npm-url]: https://npmjs.org/package/electron-chrome-extensions
[downloads-image]: https://img.shields.io/npm/dm/electron-chrome-extensions.svg?style=flat
[downloads-url]: https://npmjs.org/package/electron-chrome-extensions
