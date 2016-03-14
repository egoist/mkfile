'use strict'
const log = require('fancy-log')
const EventEmitter = require('events').EventEmitter
const event = new EventEmitter()

event.on('start task', taskName => {
  log(`Task ${`'${taskName}'`.cyan} started...`)
})

event.on('done task', taskName => {
  log(`Task ${`'${taskName}'`.cyan} done...`)
})

event.on('task not found', taskName => {
  log(`Task ${`'${taskName}'`.red} not found!`)
})

event.on('makefile not found', fp => {
  log(`Could not find ${fp}`.red)
})

module.exports = event
