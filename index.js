'use strict'
const fs = require('fs')
const path = require('path')
const cwd = require('cwd')
const pathExists = require('path-exists')
const babel = require('babel-core')
const requireFromString = require('require-from-string')
const event = require('./lib/event')
require('shelljs/global')

class Make {
  constructor(cli) {
    global.cli = cli
    // get task name to run, task `default` by default
    const taskName = cli.input[0] || 'default'

    // get and parse makefile
    const configFile = cli.flags.config || 'mkfile.js'
    const makefilePath = cwd(configFile)

    // change current working dir
    process.chdir(path.dirname(makefilePath))

    if (!pathExists.sync(makefilePath)) {
      return event.emit('mkfile not found', makefilePath)
    }

    let makefileContent = fs.readFileSync(makefilePath, 'utf8')
    makefileContent = babel.transform(makefileContent, {
      presets: [require('babel-preset-es2015'), require('babel-preset-stage-0')],
      plugins: [require('babel-plugin-transform-runtime')]
    }).code
    makefileContent = requireFromString(makefileContent, makefilePath, {
      appendPaths: [path.join(__dirname, 'node_modules')]
    })
    this.addTasks(makefileContent)

    // -l, --list options
    if (cli.flags.list) {
      console.log(Object.keys(this.tasks).join('\n'))
      return
    }

    // run task by name
    const task = makefileContent[taskName]
    if (!task) {
      return event.emit('task not found', taskName)
    }
    this.runTask(taskName)
  }
  addTasks(tasks) {
    this.tasks = {}
    // built-in helpers
    const self = {
      run: this.runTask.bind(this)
    }
    for (const name in tasks) {
      const task = tasks[name]
      if (task) {
        this.tasks[name] = typeof task === 'function'
          ? task.bind(self)
          : task
      }
    }
  }
  runTask() {
    const tasks = [].slice.call(arguments)
    tasks.forEach(task => {
      const fn = this.tasks[task]
      if (typeof fn === 'function') {
        event.emit('start task', task)
        fn()
        event.emit('done task', task)
      } else if (Array.isArray(fn)) {
        this.runTask.apply(this, fn)
      }
    })
  }
}

module.exports = (cli) => new Make(cli)
