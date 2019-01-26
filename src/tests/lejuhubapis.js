var gitlabapi = require('../gitlabs/apis.js');
var test_data = null;
try{
  test_data = require('../test_data/gitlab.json');
}
catch(e){
}

console.log('test data is:',test_data);

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
