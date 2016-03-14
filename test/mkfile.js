export function log() {
  console.log('wow')
  const data = cat('test.js')
  console.log(data)
}

export function child() {
  const content = this.fs.read('./test.js')
  console.log(content)
  require('child_process').spawnSync('ls', ['../', '-h'], {stdio: 'inherit'})
}
