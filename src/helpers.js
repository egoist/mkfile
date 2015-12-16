import stripComments from 'strip-comments'
import path from 'path'
import { fs, exists } from './pify'

export async function getFileByOrder (...files) {
  for (let file of files) {
    if (exists(file)) {
      let data = {
        name: file,
        value: await fs.readFile(file, 'utf8').catch(err => console.log(err.stack))
      }
      return data
    }
  }
}

export function joinCurrentDir (filePath) {
  return filePath ? path.join(process.cwd(), filePath) : null
}

export async function getConfigFile (
  customFile = joinCurrentDir('makefile.js')
) {
  return await getFileByOrder(customFile, joinCurrentDir('mk.js')).catch(err => console.log(err.stack))
}

export function stripCommentsInTask (string) {
  return stripComments(string)//.replace(/(\r?\n){2,}/g, '')
}

export function parseTaskName (name) {
  const task = {
    name,
    type: ''
  }
  const indexOfAsync = name.indexOf('@async')
  if (indexOfAsync > 0) {
    task.name = name.substring(0, indexOfAsync)
    task.type = ' async'
  }
  return task
}
