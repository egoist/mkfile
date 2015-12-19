#!/usr/bin/env node
var minimist = require('minimist')
var update = require('update-notifier')
var pkg = require('./package.json')
require('colorful').toxic()
require('shelljs/global')
global.log = require('fancy-log')
global.argv = minimist(process.argv.slice(2), { '--': true })
update({ pkg: pkg }).notify()

if (argv.v || argv.version) {
  console.log('mk'.cyan, '~', pkg.version.magenta)
  process.exit()
}

if (argv.h || argv.help) {
  console.log(`
${'mk'.cyan} ~ ${pkg.version.magenta}

Usage:

  mk -v--version :       Print version
  mk -h/--help   :       Print docs
  mk [taskName]  :       Start task by name
`)
  process.exit()
}

var make = require('./index')
make()
