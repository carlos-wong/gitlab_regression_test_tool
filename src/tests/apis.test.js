import gitlabapi from '../gitlabs/apis.js';
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
