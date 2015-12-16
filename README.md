# node-make

Makefile and JavaScript...

## Installation

```bash
npm install -g node-make
```

## Example

```javascript
@import:
  import fs from 'fs'
  import marked from 'marked'

log:
  log('hi')
  log('feel weird?')
  for (let i of [1, 2, 3]) {
    console.log(i)
  }

md:
  const data = fs.readFileSync('hello.md', 'utf8')
  console.log(marked(data))

publish:
  npm run build
  npm test
  npm publish

// external task file:
clean: ./tasks/clean.mk.js
```

## License

MIT &copy; [EGOIST](https://github.com/egoist)
