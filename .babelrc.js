console.log('Babel environmnent NODE_ENV is ' + process.env.NODE_ENV);

module.exports = {
  presets: [
    '@babel/env',
    ['@babel/preset-typescript', {
      'project': process.env.NODE_ENV ?
        './tsconfig.development.json' :
        './tsconfig.production.json',
    }]
  ],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread'
  ]
};
