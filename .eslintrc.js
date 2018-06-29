'use strict';

module.exports = {
  root: true,
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    es6: true,
    browser: true,
  },
  rules: {
    'no-plusplus': 'off',
    'no-console': ['warn', {
      allow: ['error', 'warn'],
    }],
    'react/jsx-filename-extension': 0,
  },
};
