import path from 'path'
import fs from 'mz/fs'

emit:
  // callback is optional
  emit('log', () => console.log('done'))

log:
// a short-hand for exec()
  >echo '123'

fs@async:
  const data = await fs.readFile(path.resolve('./README.md'), 'utf8')
  console.log(data)

publish:
  >npm run rollup
  >npm test
  >npm publish

default:
  emit('log')
  emit('fs')
