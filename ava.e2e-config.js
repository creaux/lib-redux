export default {
  files: ['e2e/**/*.e2e-spec.ts'],
  compileEnhancements: false,
  require: ['tsconfig-paths/register', 'ts-node/register', './src/env.ts'],
  extensions: ['ts'],
  // https://github.com/avajs/ava/issues/2291
  sources: ['src/**/*', '../lib-model/src/**/*'],
  environmentVariables: {
    TS_NODE_PROJECT: './tsconfig.development.json'
  }
};
