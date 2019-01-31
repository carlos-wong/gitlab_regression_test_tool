var _ = require('lodash');
var localize_zh = require('../localize/zh.json');


var actions = ["Login","Jump","UploadToken"];

var actionsFromLocalize =_.keyBy(_.map(_.keys(localize_zh),value=>"Update"+value) ,value=>{return value;});

export default _.keyBy(actions,(value)=>{return value;});

