var gitlabapi = require('../gitlabs/apis.js');
var test_data = null;
var test_token = "";
try{
  test_data = require('../test_data/gitlab.json');
  test_token = test_data.token;
}
catch(e){
  console.log('require json e:',e);
}

console.log('test data is:',test_data,test_token);

var test = {};

var api = new gitlabapi();

async function test_gitlabapi_init() {
  let ret = await api.initInstance('123');
}

test_gitlabapi_init()
  .then(()=>{
  })
  .catch((e)=>{
  });
