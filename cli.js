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

var make = require('./index')
make()
