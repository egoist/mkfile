# Tasks

## Define a task

Task in `mkfile` is basically a function, and you can `export` it so that we can use it via command-line.

```js
export function clean() {
  rm('-rf', './dist')
}
```

## Array task

Task can be an array too, it could be a list of task names.

```js
export {clean, webpack}
export const build = ['clean', 'webpack']
````

## Run a task from command-line

```bash
$ mk taskname
$ mk # without taskname it runs `default` task
```

## Run a task inside a task function

```js
export function clean() {
  rm('-rf', './dist')
  this.run('build', 'upload')
}
```
