var _ = require('lodash');
import Newissue_redux from '../redux/newissue_redux.js';

var actions = ["Login","Jump"];

test('Create Actions', () => {
  expect(
    _.keyBy(actions,(value)=>{
      return value;
  })).toEqual({
    Login:"Login",
    Jump:"Jump"
  });
})

test('create dispatch reducers', ()=>{
  var actionstypes = {
    projecturl:null,
    appver:null,
  };
  var action = {type:"Updateappver"};
  var split_type = action.type.split('Update');
  expect(_.includes(_.keys(actionstypes),split_type[1])).toBe(true);
});

test('Newissue_redux',()=>{
  var test = new Newissue_redux();

})
