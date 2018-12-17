const glob = require('glob');
const path = require('path');

const files = glob.sync(path.join(__dirname, 'main/**/*.js'))
files.forEach((file) => { require(file) })