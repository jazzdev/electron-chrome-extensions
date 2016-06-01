var os = require('os')
var fs = require('fs')
var async = require('async')

exports.defaultPath = os.type() === 'Darwin'
  ? process.env.HOME + '/Library/Application Support/Google/Chrome/Default/Extensions'
  : (os.type() === 'Windows_NT'
     ? process.env.USER_PROFILE + '/AppData/Local/Google/Chrome/User Data/Default'
     : process.env.HOME + '/.config/google-chrome/Default/Extensions/')

exports.load = function (path, callback) {
  fs.readdir(path, (err, extensionIds) => {
    if (err) return callback(err)
    async.map(extensionIds, (id, cb) => loadVersions(path + '/' + id, cb), (err, extensions) => {
      callback(err, [].concat.apply([], extensions))
    })
  })
}

function loadVersions (path, callback) {
  fs.readdir(path, (err, extensionVersions) => {
    if (err) return callback(null, { versions: [] })
    async.map(extensionVersions, (version, cb) => loadExtension(path + '/' + version, cb), callback)
  })
}

function loadExtension (path, callback) {
  fs.readFile(path + '/manifest.json', (err, contents) => {
    if (err) return callback(null, { name: err.name, description: err.message })
    var manifest = JSON.parse(contents)
    callback(null, {
      path: path,
      name: manifest.name,
      description: manifest.description,
      version: manifest.version
    })
  })
}

exports.addToWebview = function (webview, extension) {

}
