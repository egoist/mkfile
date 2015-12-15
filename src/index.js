import { fs } from './pify'
import parser from './parser'

class Make {
  constructor () {
    this.matchTask(argv._[0])
  }
  matchTask (taskName) {
    this.requireMakeFile()
  }
  async requireMakeFile () {
    const file = await fs.readFile(process.cwd() + '/makefile.js', 'utf8')
    console.log(parser(file))
  }
}

export default function make () {
  return new Make()
}
