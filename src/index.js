import { fs } from './pify'
import { getConfigFile } from './helpers'
import parser from './parser'
import { addTasks ,startTask } from './task'
import './registerGlobal'

class Make {
  constructor () {
    this.requireMakeFile()
  }
  async requireMakeFile () {
    try {
      const file = await getConfigFile(argv.c || argv.config)
      this.runTask(parser(file.value))
    } catch (err) {
      console.log(err.stack)
    }
  }
  runTask (tasks) {
    addTasks(tasks)
    const taskName = argv._[0] || 'default'
    startTask(taskName)
  }
}

export default function make () {
  return new Make()
}
