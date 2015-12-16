const RE_MATCH_TASKS = /(\r?\n){2,}/
const RE_MATCH_LINES = /\r?\n{1,}/
const RE_TEST_EXTERNAL_TASK = /a/
const RE_MATCH_INTRO = /^(\w+)\:\s*([a-zA-Z0-9\.\/]*)/

export default function parser (string) {
  string = string.split(RE_MATCH_TASKS)
  for (let [i, s] of string.entries()) {
    let lines = s.split(RE_MATCH_LINES).filter(line => !!line.trim())
    let intro = lines[0]
    // append `}` to function ending
    lines.push('}')
    // match taskName, externalFile from line one
    // prepend to function heading
    let [, taskName, externalFile] = intro.match(RE_MATCH_INTRO)
    lines[0] = `export const ${taskName} = () => {`
    string[i] = lines.join('\n')
  }
  return string.join('\n\n')
}
