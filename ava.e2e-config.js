export default {
  files: ['./e2e/**/*.e2e-spec.ts'],
  compileEnhancements: false,
  require: ['ts-node/register', './src/env.ts'],
  // https://github.com/avajs/ava/issues/2291
  sources: ['src/**/*', 'node_modules/@pyxismedia/**/*'],
};
