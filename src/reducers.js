import  action_types  from './actions/action_types.js';
var lodash = require('lodash');

export default function (state = {authed:false,counter:0}, action) {
  // console.log('reducer of action:',action);
  switch (action.type) {
  case action_types.Login:
    return lodash.merge({},state,{authed:action.authed})
    break;
  default:
  }
  return state
}
