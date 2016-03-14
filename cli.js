#!/usr/bin/env node
'use strict'
require('colorful').toxic()
const meow = require('meow')
const main = require('./')

// parse cli
const cli = meow(`
  ${`Usage:`.bold}
    mk [taskName]

    -c/--config:     Use custom mkfile
    -v/--version:    Print version
    -h/--help:       Print help
`, {
  alias: {
    v: 'version',
    h: 'help',
    c: 'config'
  }
})

// start app
main(cli)
