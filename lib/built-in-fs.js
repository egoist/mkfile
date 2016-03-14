'use strict'
const memFs = require('mem-fs')
const editor = require('mem-fs-editor')

const store = memFs.create()
const fs = editor.create(store)

module.exports = fs
