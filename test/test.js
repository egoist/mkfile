/* global exec */
import test from 'ava'
import 'shelljs/global'

test('main', t => {
  const run = exec('../cli.js', {silent: true}).stdout
  t.true(run.indexOf('Task \'default\' not found!\n') > -1)
})

test('task log', t => {
  const run = exec('../cli.js log', {silent: true}).stdout
  t.true(run.indexOf('wow') > -1)
})
