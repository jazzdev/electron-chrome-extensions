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
    var extension = {
      path: path,
      name: manifest.name,
      description: manifest.description,
      version: manifest.version
    }
    localizeStrings(extension, callback)
  })
}

function localizeStrings (extension, callback) {
  var file = extension.path + '/_locales/en/messages.json'
  fs.readFile(file, (err, contents) => {
    if (err) {
      return callback(null, extension) // return as-is
    }
    if (extension.name.startsWith('__MSG_')) {
      var msgName = extension.name.substring(6, extension.name.length - 2)
      var messages = JSON.parse(contents)
      if (messages[msgName]) extension.name = messages[msgName].message
      else if (messages[msgName.toLowerCase()]) extension.name = messages[msgName.toLowerCase()].message
      else console.log(`No ${msgName} found in ${JSON.stringify(messages)}`)
    }
    callback(null, extension)
  })
}

exports.addToWebview = function (webview, extension) {

}
