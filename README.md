# mkfile [![NPM version](https://img.shields.io/npm/v/mkfile.svg)](https://npmjs.com/package/mkfile) [![NPM downloads](https://img.shields.io/npm/dm/mkfile.svg)](https://npmjs.com/package/mkfile) [![Build Status](https://img.shields.io/circleci/project/egoist/mkfile/1.0.svg)](https://circleci.com/gh/egoist/mkfile) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)


> Task driven build tool.

Full-feature ES2015+ driven task runner.

## Install

```bash
$ npm install -g mkfile
```

## Usage

**mkfile.js** example:

```js
export function clean() {
  // clean `build` directory
  this.fs.delete('./build')
  // or rm('-rf', './build')
}

export function build() {
  this.run('clean')
  // run webpack
  exec('./node_modules/.bin/webpack -p')
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

## CLI

```bash
$ mk -h

  Task driven build tool.

  Usage:
    mk [taskName]

    -c/--config:     Use custom mkfile
    -l/--list:       List all task names
    -v/--version:    Print version
    -h/--help:       Print help
```

## API

### `this`

#### .fs

Built-in `fs` helpers, see usage at [mem-fs-editor](https://github.com/SBoudrias/mem-fs-editor).

### `global variables`

- `cli` CLI arguments parsed by [meow](https://github.com/sindresorhus/meow), the object contains `.input` and `.flags`.
- Built-in `unix shell` commands, see usage at [shelljs](https://github.com/shelljs/shelljs).

## License

MIT © [EGOIST](https://github.com/egoist)
