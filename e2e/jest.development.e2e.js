const base = require('./jest-base.e2e');

module.exports = Object.assign(base,{
  moduleNameMapper: {
    // This follows tsconfig.development.json
    '^@pyxismedia/lib-model(.*)$': '<rootDir>/../../lib-model/src/$1'
  },
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.development.json'
    }
  }
});
