var _ = require('lodash');
var localize_zh = require('../test_data/localize.json');

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