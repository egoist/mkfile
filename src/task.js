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
    o.add(task, tasks[task])
  }
}

export function startTask (task) {
  o.start(task, err => {
    if (err && err.missingTask) {
      log(`Task '${err.missingTask}' not found`.red)
    }
  })
}
