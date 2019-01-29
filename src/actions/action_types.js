var _ = require('lodash');
var localize_zh = require('../localize/zh.json');


var actions = ["Login","Jump","UpdateAppVersion","UpdateRobotNo","UpdateprdRefernce","UpdaterobotVer"];

var actionsFromLocalize =_.keyBy(_.map(_.keys(localize_zh),value=>"Update"+value) ,value=>{return value;});

export default _.merge(_.keyBy(actions,(value)=>{return value;}),
                       actionsFromLocalize) ;

