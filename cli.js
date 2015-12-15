#!/usr/bin/env node
var minimist = require('minimist')
global.argv = minimist(process.argv.slice(2), { '--': true })
var make = require('./index')
make()
