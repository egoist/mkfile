const RE_MATCH_EXEC = /^\>(\s*)([^\n]+)$/
/**
 * Walk each line and return formated array
 *
 * @param {Array} lines
 * @returns {Array}
 */
export default function walk (lines) {
  return lines.map(line => {
    line = line.trim()
    if (RE_MATCH_EXEC.test(line)) {
      const [,,command] = line.match(RE_MATCH_EXEC)
      return `exec(${JSON.stringify(command)})`
    }
    return line
  })
}
