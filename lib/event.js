'use strict'
const EventEmitter = require('events').EventEmitter
const log = require('fancy-log')
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

event.on('mkfile not found', fp => {
  log(`Could not find ${fp}`.red)
})

module.exports = event
