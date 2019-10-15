export default {
  compileEnhancements: false,
  extensions: ['ts'],
  require: ['ts-node/register', './src/env.ts'],
  sources: ['src/**/*', 'node_modules/@pyxismedia/**/*'],
};
