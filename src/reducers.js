import  action_types  from './actions/action_types.js';
var lodash = require('lodash');
var zh_localize = require('./localize/zh.json');
var test_data = null;
var test_token = null;
try{
  test_data = require('./test_data/gitlab.json');
  test_token = test_data.token;
}
catch(e){
  console.log('require json e:',e);
}

const  InitState = {
  authed:test_token? true:false,
  gitlabtoken:test_token || "",
  cur_path:"/testcase",
  localize:zh_localize,
  testplatforms:["ios",'android','server','robot'],
  testProjects:['mini/QA'],
  newissue:{
    projecturl:null,
    appver:null,
    robotNo:null,
    prdReference:null,
    robotVer:null,
    platform:null,
    deviceNo:null,
    expectResult:null,
    realityReuslt:null,
    reproductionSteps:null,
  }
};


export default function (state = InitState, action) {
  // console.log('reducer of action:',action);
  switch (action.type) {
  case action_types.Login:
    return lodash.merge({},state,{authed:action.authed})
    break;
  case action_types.Jump:
    return lodash.merge({},state,{cur_path:action.url});
  default:
  }
  return state
}
