const RE_MATCH_EXEC = /^\>{1}(\s*)([^\n\>]+)$/
const RE_MACTH_MULTI_EXEC = /\>{3}\s*\n([^.\>{3}]+)\n\s*\<{3}/g
/**
 * Walk each line and return formated string
 *
 * @param {Array} lines
 * @returns {String}
 */
export default function walk (lines) {
  lines = lines.map(line => {
    line = line.trim()
    if (RE_MATCH_EXEC.test(line)) {
      const [,,command] = line.match(RE_MATCH_EXEC)
      return `exec(\`${command.trim()}\`)`
    }
    return line
  }).join('\n')
  lines = lines.replace(RE_MACTH_MULTI_EXEC, (m, p1) => {
    p1 = p1.split(/\r?\n/)
    p1 = p1.map(p => `exec(\`${p.trim()}\`)`).join('\n')
    return '\n' + p1 + '\n'
  })
  return lines
}
