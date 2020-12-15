'use strict';
require('./config/config.js');

module.exports = {
  diff: true,
  extension: ['js'],
  package: './package.json',
  reporter: 'spec',
  slow: 75,
  timeout: 20000,
  ui: 'bdd'
};
