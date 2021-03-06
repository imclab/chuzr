var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {

  development: {
    db: 'mongodb://localhost/chuzr_dev',
    url: 'http://localhost:3000',
    root: rootPath,
    app: {
      name: 'Chuzr'
    },
    secret: 'zombie feynman'
  },

  test: {
    db: 'mongodb://localhost/chuzr_test',
    url: 'http://localhost:3000',
    root: rootPath,
    app: {
      name: 'Chuzr'
    },
    secret: 'zombie feynman'
  },

  production: { }
};
