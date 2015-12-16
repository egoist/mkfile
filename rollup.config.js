import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/index',
  dest: './index.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      blacklist: ['regenerator'],
      optional: ['asyncToGenerator', 'runtime']
    })
  ],
  format: 'cjs',
}
