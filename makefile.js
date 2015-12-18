import pify from 'pify'
import fs from 'fs'

log:
  log('hi')
  log('feel weird?')

read@async:
  const data = await pify(fs).readFile('README.md', 'utf8')
  console.log(data)
publish:
  >npm run rollup
  >npm publish
// emit a task in a task
emit:
  // callback is optional
  emit('log')
