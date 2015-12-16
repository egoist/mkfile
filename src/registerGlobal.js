import { startTask } from './task'

global.emit = function emit (task, cb) {
  startTask(task, cb)
}
