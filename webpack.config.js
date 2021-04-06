const path = require('path');

module.exports = {
  entry: './tscOutput/script/script.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts.js',
  },
  
};