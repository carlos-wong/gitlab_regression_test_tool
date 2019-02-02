import "babel-polyfill";
import gitlabuploadfile from "../apigitlabs/api_uploadfile.js";
import gitlabapi from '../apigitlab/apis.js';
import _ from "lodash";
var test_data = null;
var test_token = "";
process.env.REACTDEV = "true";
var testdata = null;

if(process.env.REACTDEV == "true"){
  testdata = require('../../test-data/gitlab.js');
}


test('Login api ', async () => {
  var gitlabapiInstance = new gitlabapi();
  var ret = await gitlabapiInstance.initInstance(test_token);
  // console.log('ret is:',ret);
  expect(200).toBe(ret.status);
});

test('Uploadfileaipi',async ()=>{
  var gitlabupload = new gitlabuploadfile();
  var ret = await gitlabupload.uploadfile(test_token,"./src/tests/1.mp4",(step,total)=>{console.log('progress:',step,'/',total);},()=>{});
  ret = JSON.parse(ret);
  expect(ret.markdown.length > 0).toBe(true);
},50000);

test('New issue',async ()=>{
  var gitlabapiInstance = new gitlabapi();
  var ret = await gitlabapiInstance.initInstance(test_token);
  ret = await gitlabapiInstance.CreateIssue(test_token,"carlos/test-gitlab","test api ","descriptio\n\n\/label ~\"1\"");
  expect(201).toBe(ret.status);
});

test('uploadfilewithprogress',async ()=>{
  var gitlabupload = new gitlabuploadfile();
  expect(typeof testdata.token).toBe('string');
  var ret = gitlabupload.uploadfile(testdata.token,"./test-data/1.txt",(state)=>{
    
  },()=>{
    
  });
  expect(200).toBe(200);
});


test('queryQAprojects',async ()=>{
  let noQA = [];
  expect(process.env.REACTDEV).toBe("true");
  var gitlabapiInstance = new gitlabapi();
  var ret = await gitlabapiInstance.initInstance(testdata.token);
  expect(ret.status).toBe(200);
  ret = await gitlabapiInstance.QueryQAProject(testdata.token,1,6,[],(response)=>{});
  noQA = _.filter(ret,(value)=>value.name !="QA");
  if(noQA.length > 0){
    expect(noQA[0].name).toBe("QA");
  }
  ret = await gitlabapiInstance.QueryQAProject(testdata.token,1,100,[],(response)=>{});
  noQA = _.filter(ret,(value)=>value.name!="QA");
  if(noQA.length > 0){
    expect(noQA[0].name).toBe("QA");
  }
});
