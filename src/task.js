import O from 'orchestrator'
import prettyHrtime from 'pretty-hrtime'

const o = new O()

o.on('task_start', e => {
  log('Starting', `'${e.task}'`.cyan, '...')
})
o.on('task_stop', e => {
  log('Finished', `'${e.task}'`.cyan, `in ${prettyHrtime(e.hrDuration)}`)
})

export function addTasks (tasks) {
  for (let task in tasks) {
    if (typeof tasks[task] === 'function') {
      o.add(task.substring(2), tasks[task])
    }
  }
}

export function startTask (task, cb) {
  o.start(task, err => {
    if (err) {
      if (err.missingTask) {
        log(`Task '${err.missingTask}' not found`.red)
      } else {
        console.log(err)
      }
    } else if (cb) {
      cb()
    }
  })
}
