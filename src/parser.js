import babel from 'babel-core'
import requireFromString from 'require-from-string'

const RE_MATCH_TASKS = /(\r?\n){2,}/
const RE_MATCH_LINES = /\r?\n{1,}/
const RE_MATCH_INTRO = /^(\w+)\:\s*([a-zA-Z0-9\.\/]*)/

const transformOptions = {}

export default function parser (string) {
  if (typeof string !== 'string') {
    throw new Error('Input is not string!')
  }
  string = string.split(RE_MATCH_TASKS)
  for (let [i, s] of string.entries()) {
    let lines = s.split(RE_MATCH_LINES).filter(line => !!line.trim())
    let intro = lines[0]
    let [, taskName, externalFile] = intro.match(RE_MATCH_INTRO)
    if (externalFile) {
      // TODO: what if user uses a externalFile as task body?
    } else {
      // match taskName, externalFile from line one
      // prepend to function heading
      lines[0] = `export const ${taskName} = () => {`
      // append `}` to function ending
      lines.push('}')
    }
    string[i] = lines.join('\n')
  }
  let { code } = babel.transform(string.join('\n\n'), transformOptions)
  return requireFromString(code)
}
