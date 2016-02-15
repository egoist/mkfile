import path from 'path'
import fs from 'mz/fs'

emit:
  // callback is optional
  emit('log', () => console.log('done'))

log:
  > echo ${'love'.blue}

fs@async:
  const data = await fs.readFile(path.resolve('./README.md'), 'utf8')
  console.log(data)

publish:
  >npm run rollup
  >npm test
  >npm publish

default:
  emit('emit')
