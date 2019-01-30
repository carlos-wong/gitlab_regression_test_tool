var _ = require('lodash');
var localize_zh = require('../test_data/localize.json');
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

test('Create Actions', () => {
  expect(
    _.keyBy(_.map(_.keys(localize_zh),value=>"Update"+value) ,value=>{
      return value;
    })).toEqual({
    Updateappver:"Updateappver",
    UpdaterobotNo:"UpdaterobotNo",
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
