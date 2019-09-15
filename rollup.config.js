import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';

export default {
    input: "./src/index.ts",
    output: {
        file: "build/bundle.js",
        format: "cjs"
    },
    plugins: [
        babel({
          exclude: 'node_modules/**',
          extensions: ['.ts', '.js']
        }),
        eslint()
    ]
}
