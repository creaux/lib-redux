import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: './src/index.ts',
  output: {
    file: 'build/bundle.js',
    format: 'cjs',
  },
  plugins: [
    resolve({ extensions }),
    commonjs(),
    babel({
      include: 'src/**/*',
      extensions,
    }),
  ],
};
