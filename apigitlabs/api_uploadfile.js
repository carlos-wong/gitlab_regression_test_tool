var request = require('request');
var path = require('path');
var rp = require('request-promise');
var fs = require('fs');
var _ = require('lodash');


var target = 'http://www.lejuhub.com/api/v4/projects/7/uploads';

module.exports = class gitlabuploadfile{
  async uploadfile(token,filepath,progresscallback,donecallback){
    var stat = fs.statSync(filepath);
    var bytes = 0
    return await rp({ method: 'POST',
                         url: target,
                         headers:
                         {'PRIVATE-TOKEN': token,
                          'content-type': 'multipart/form-data' },
                         formData:
                         { file:
                           { value: fs.createReadStream(filepath).on('data', (chunk) => {
                             bytes += chunk.length
                             progresscallback(bytes,stat.size);
                           }).on('close',()=>{
                             console.log('file is closed');
                             donecallback();}),
                             options: { filename: filepath, contentType: null } } } });
  }
}


