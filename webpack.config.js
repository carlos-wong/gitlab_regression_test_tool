const path = require('path');
var nodeExternals = require('webpack-node-externals');


module.exports = {
  entry: './src/electron.js',
  node: {
    __dirname: false,
    __filename: false
  },
  output: {
    filename: 'electron.js',
    path: path.resolve(__dirname, 'public')
  },
  externals: [{
		"fs": 'commonjs2 fs',
    "net": 'commonjs2 net',
    "request": 'commonjs2 request',
    "electron": 'commonjs2 electron',
    "tls": 'commonjs2 tls'
	}]
};
