import babel from 'babel-core'
import requireFromString from 'require-from-string'
import fs from 'fs'
import stripComments from 'strip-comments'
import path from 'path'
import {
  joinCurrentDir,
  parseTaskName,
  generateTaskFn
} from './helpers'
import walk from './walk'
import resolveIndent from 'resolve-indent'

const RE_MATCH_TASKS = /(\r?\n){2,}/
const RE_MATCH_LINES = /\r?\n{1,}/
const RE_MATCH_INTRO = /^([a-zA-Z0-9\@\.\_\-]+)\:\s*/

const transformOptions = {
  presets: [require('babel-preset-es2015'), require('babel-preset-stage-0')],
  plugins: [require('babel-plugin-transform-runtime')]
}

export default function parser (string, filePath) {
  if (typeof string !== 'string') {
    throw new TypeError('Input is not string!')
  }
  string = resolveIndent(string)
  for (let [i, s] of string.entries()) {
    let lines = s.split(RE_MATCH_LINES).filter(line => !!line.replace(/\s/g, ''))
    let intro = lines[0]
    if (RE_MATCH_INTRO.test(intro) && intro.substring(7) !== 'import ') {
      let [, taskName] = intro.match(RE_MATCH_INTRO)
      // match taskName, externalFile from line one
      // prepend to function heading
      taskName = parseTaskName(taskName)
      lines[0] = generateTaskFn(taskName)
      // append `}` to function ending
      lines.push('}')
      lines = walk(lines)
      string[i] = lines
    }
  }
  let code
  try {
    code = babel.transform(string.join('\n\n'), transformOptions).code
    return requireFromString(code, filePath, {
      appendPaths: [
        path.join(__dirname, './node_modules')
      ]
    })
  } catch (e) {
    console.log(e.stack)
  }
}
