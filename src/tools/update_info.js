const process = require('child_process');
const fs = require('fs');
const _ = require('lodash');
var version = process.execSync('git describe --long');
var info_template = `module.exports = {
        ver:"${_.trim(version)}",
}\n`;
fs.writeFileSync('./src/info.js',info_template);

