import babel from 'babel-core'
import requireFromString from 'require-from-string'
import fs from 'fs'
import { joinCurrentDir } from './helpers'

const RE_MATCH_TASKS = /(\r?\n){2,}/
const RE_MATCH_LINES = /\r?\n{1,}/
const RE_MATCH_INTRO = /^(\w+)\:\s*([a-zA-Z0-9\.\/]*)/
const RE_MATCH_IMPORT_INTRO = /^\@import\:\s*/

const transformOptions = {
  blacklist: ['regenerator'],
  optional: ['asyncToGenerator', 'runtime'],
  loose: ['es6.modules']
}

export default function parser (string) {
  if (typeof string !== 'string') {
    throw new Error('Input is not string!')
  }
  let code
  try {
    string = string.split(RE_MATCH_TASKS).filter(s => !!s.replace(/\s+/g, ''))
    for (let [i, s] of string.entries()) {
      let lines = s.split(RE_MATCH_LINES).filter(line => !!line.replace(/\s+/g, ''))
      let intro = lines[0]
      if (RE_MATCH_INTRO.test(intro)) {
        let [, taskName, externalFile] = intro.match(RE_MATCH_INTRO)
        if (externalFile) {
          let tempLines = []
          lines.forEach(intro => {
            const [, taskName, externalFile] = intro.match(RE_MATCH_INTRO)
            const taskContent = fs.readFileSync(joinCurrentDir(externalFile), 'utf8')
            tempLines.push(`export const __${taskName} = () => {
              ${taskContent}
            }`)
          })
          lines = tempLines.join('\n')
        } else {
          // match taskName, externalFile from line one
          // prepend to function heading
          lines[0] = `export const __${taskName} = () => {`
          // append `}` to function ending
          lines.push('}')
          lines = lines.join('\n')
        }
        string[i] = lines
      } else if (RE_MATCH_IMPORT_INTRO.test(intro)) {
        lines.shift(0)
        string[i] = lines.join('\n')
      }
    }
    code = babel.transform(string.join('\n\n'), transformOptions).code
  } catch (err) {
    console.log(err.stack)
  }
  return requireFromString(code)
}
