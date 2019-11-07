export default {
  files: ['./e2e/**/*.e2e-spec.ts'],
  compileEnhancements: false,
  extensions: ['ts'],
  require: ['ts-node/register', './src/env.ts'],
  sources: ['src/**/*', 'node_modules/@pyxismedia/**/*'],
};
