var request = require('request');
var path = require('path');
var rp = require('request-promise');
var fs = require('fs');
var _ = require('lodash');
var test_token = "";
var test_data = null;

try{
  test_data = require('../test_data/gitlab.json');
  test_token = test_data.token;
}
catch(e){
  console.log('require json e:',e);
}

var target = 'http://www.lejuhub.com/api/v4/projects/7/uploads';

export default class gitlabuploadfile{
  async uploadfile(token,filepath){
    var ret = await rp({ method: 'POST',
                         url: target,
                         headers:
                         {'PRIVATE-TOKEN': token,
                          'content-type': 'multipart/form-data' },
                         formData:
                         { file:
                           { value: fs.createReadStream(filepath),
                             options: { filename: filepath, contentType: null } } } });
    return ret;
  }
}

