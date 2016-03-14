# node-make [![NPM version](https://img.shields.io/npm/v/node-make.svg)](https://npmjs.com/package/node-make) [![NPM downloads](https://img.shields.io/npm/dm/node-make.svg)](https://npmjs.com/package/node-make) [![Build Status](https://img.shields.io/circleci/project/egoist/node-make/master.svg)](https://circleci.com/gh/egoist/node-make)

> Task driven build tool.

Full-feature ES2015+ driven task runner.

## Install

```bash
$ npm install -g node-make
```

## Usage

**makefile.js** example:

```js
export function clean() {
  // clean `build` directory
  this.fs.delete('./build')
  // or this.shell.exec('rm ./build')
}

export function build() {
  this.run('clean')
  // run webpack
  this.exec('./node_modules/.bin/webpack -p')
}

export default function() {
  console.log('This is the default task!')
  // call task manually
  this.run('build')
}
```

```bash
# run default task
$ mk
# run build
$ mk build
```

## API

### `this`

#### .fs

Built-in `fs` helpers, see usage at [mem-fs-editor](https://github.com/SBoudrias/mem-fs-editor).

#### .shell

Built-in `unix shell` commands, see usage at [shelljs](https://github.com/shelljs/shelljs).

## License

MIT © [EGOIST](https://github.com/egoist)
