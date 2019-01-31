import  action_types  from './actions/action_types.js';
import Newissue_redux from './redux/newissue_redux.js'

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
var issues_reducer = new Newissue_redux();

const  InitState = {
  authed:test_token? true:false,
  gitlabtoken:test_token || "",
  cur_path:"/testcase",
  localize:zh_localize,
  testplatforms:["iOS",'Android','server','robot'],
  testProjects:['mini/QA',"carlos/test-gitlab"],
  issuepriority:['P0','P1','P2','P3'],
  newissue: issues_reducer.newissueState,
};


export default function (state = InitState, action) {
  // console.log('reducer of action:',action);
  if(issues_reducer.isMatch(action)){
    return issues_reducer.Handler(state,action);
  }
  switch (action.type) {
  case action_types.Login:
    return lodash.merge({},state,{authed:action.authed})
    break;
  case action_types.Jump:
    if(!state.authed){
      action.url = '/';
    }
    return lodash.merge({},state,{cur_path:action.url});
  default:
  }
  return state
}
