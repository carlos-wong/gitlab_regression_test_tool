import  action_types  from './actions/action_types.js';
var lodash = require('lodash');

export default function (state = {authed:false,cur_path:"/testcase"}, action) {
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
