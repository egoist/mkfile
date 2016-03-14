/* global exec */
import test from 'ava'
import 'shelljs/global'

test('main', t => {
  const run = exec('../cli.js', {silent: true})
  t.true(run.output.indexOf('Task \'default\' not found!\n') > -1)
})

test('task log', t => {
  const run = exec('../cli.js log', {silent: true})
  t.true(run.output.indexOf('wow') > -1)
})
