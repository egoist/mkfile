import stripComments from 'strip-comments'
import path from 'path'
import pathExists from 'path-exists'
import fs from 'mz/fs'

export async function getFileByOrder (...files) {
  for (let file of files) {
    if (await pathExists(file)) {
      let data = {
        name: file,
        value: stripComments(await fs.readFile(file, 'utf8'))
      }
      return data
    }
  }
  log('Could not find Makefile in current directory!'.red)
  process.exit()
}

export function joinCurrentDir (filePath) {
  return filePath ? path.join(process.cwd(), filePath) : null
}

export async function getConfigFile (
  customFile = joinCurrentDir('makefile.js')
) {
  return await getFileByOrder(customFile, joinCurrentDir('mk.js'))
}

export function parseTaskName (name) {
  const task = {
    name,
    type: ''
  }
  const indexOfAsync = name.indexOf('@async')
  if (indexOfAsync > 0) {
    task.name = name.substring(0, indexOfAsync)
    task.type = 'async'
  }
  return task
}

export function generateTaskFn (task, content) {
  let fn
  if (task.type === 'async') {
    fn = `export const __${task.name} = async () => {`
  } else {
    fn = `export const __${task.name} = () => {`
  }
  if (content) {
    fn += `\n${content}\n}`
  }
  return fn
}
