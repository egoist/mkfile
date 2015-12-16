#!/usr/bin/env node
var minimist = require('minimist')
require('colorful').toxic()
global.log = require('fancy-log')
global.argv = minimist(process.argv.slice(2), { '--': true })
var make = require('./index')
make()
