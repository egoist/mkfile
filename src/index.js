import { fs } from './pify'
import { getConfigFile } from './helpers'
import parser from './parser'
import { addTasks ,startTask } from './task'

class Make {
  constructor () {
    this.requireMakeFile()
  }
  async requireMakeFile () {
    const file = await getConfigFile().catch(err => console.log(err))
    this.runTask(parser(file.value))
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
