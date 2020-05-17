const base = require('./jest-base.e2e');

module.exports = Object.assign(base,{
  "globals": {
    "ts-jest": {
      "tsConfig": "./tsconfig.production.json"
    }
  }
});
