@import:
  import path from 'path'
  import pify from 'pify'
  import fs from 'fs'

emit:
  // callback is optional
  emit('log', () => console.log('done'))

log:
// a short-hand for exec()
  >echo '123'

fs@async:
  const data = await pify(fs).readFile('README.md', 'utf8')
  console.log(data)

publish:
  >npm run rollup
  >npm test
  >npm publish

// what
ex1: ./tasks/a.mk.js
ex2: ./tasks/b.mk.js
