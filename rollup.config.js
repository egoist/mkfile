import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/index',
  dest: './index.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: ['es2015-rollup', 'stage-0'],
      plugins: ['transform-runtime'],
      runtimeHelpers: true
    })
  ],
  format: 'cjs',
}
