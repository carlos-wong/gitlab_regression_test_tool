import "babel-polyfill";
import gitlabapi from '../gitlabs/apis.js';
const gitlabuploadfile = require("../gitlabs/api_uploadfile.js") ;
var test_data = null;
var test_token = "";
try{
  test_data = require('../test_data/gitlab.json');
  test_token = test_data.token;
}
catch(e){
  console.log('require json e:',e);
}


test('Login api ', async () => {
  var gitlabpaiInstance = new gitlabapi();
  var ret = await gitlabpaiInstance.initInstance(test_token);
  // console.log('ret is:',ret);
  expect(200).toBe(ret.status);
});

test('Uploadfileaipi',async ()=>{
  var gitlabupload = new gitlabuploadfile();
  var ret = await gitlabupload.uploadfile(test_token,"./src/tests/1.txt");
  expect(ret !== null).toBe(true);
});
