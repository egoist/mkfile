# node-make

[![NPM version](https://img.shields.io/npm/v/node-make.svg)](https://www.npmjs.com/package/node-make)
[![NPM download](https://img.shields.io/npm/dm/node-make.svg)](https://www.npmjs.com/package/node-make)
[![Build Status: Linux](https://travis-ci.org/egoist/node-make.svg?branch=master)](https://travis-ci.org/egoist/node-make)
[![Package Quality](http://npm.packagequality.com/shield/node-make.svg)](http://packagequality.com/#?package=node-make)

It's neither [Jake](http://jakejs.com/) nor [Runfile](https://github.com/runfile/runfile), it's just Makefile and JavaScript.

## Installation

```bash
npm install -g node-make
```

## Example

**makefile.js**

```javascript
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
  exec('npm run build')
  exec('npm test')
  exec('npm publish')  

// emit a task in a task
emit:
  // callback is optional
  emit('log', callback)

// async/await feature
read@async:
  const data = await promiseFn()

// single-line exec() commands short-hand
try:
  // `argv` is global variable for accessing user input from cli
  const message = argv.m || new Date()
  > git add -A
  > git commit -m "${message}"
  > git push origin master

// multi-line exec() commands short-hand
source:
  >>>
  export PATH='$PATH:~/go'
  echo $PATH
  <<<

```

**command line**

```bash
mk [taskName]
```

## License

MIT &copy; [EGOIST](https://github.com/egoist)
