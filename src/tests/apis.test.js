import "babel-polyfill";
import gitlabuploadfile from "../../apigitlabs/api_uploadfile.js";
import gitlabapi from '../apigitlab/apis.js';
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
  var gitlabapiInstance = new gitlabapi();
  var ret = await gitlabapiInstance.initInstance(test_token);
  // console.log('ret is:',ret);
  expect(200).toBe(ret.status);
});

test('Uploadfileaipi',async ()=>{
  var gitlabupload = new gitlabuploadfile();
  var ret = await gitlabupload.uploadfile(test_token,"./src/tests/1.txt");
  expect(ret !== null).toBe(true);
});

test('New issue',async ()=>{
  var gitlabapiInstance = new gitlabapi();
  var ret = await gitlabapiInstance.initInstance(test_token);
  ret = await gitlabapiInstance.CreateIssue(test_token,"carlos/test-gitlab","test api ","descriptio\n\n\/label ~\"1\"");
  expect(201).toBe(ret.status);
});
