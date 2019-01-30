var _ = require('lodash');
var test_data = null;
var test_token = "";
try{
  test_data = require('../test_data/gitlab.json');
  test_token = test_data.token;
}
catch(e){
  console.log('require json e:',e);
}


export default class Newissue_redux {
  constructor() {
    this.newissueState = {
      projecturl:test_token? "carlos/test-gitlab":null,
      appver:null,
      robotNo:test_token?"robotNo":null,
      prdReference:test_token?"prdReference":null,
      robotVer:test_token?"robotVer":null,
      platform:test_token?"iOS":null,
      deviceNo:test_token?"DeviceNo":null,
      expectResult:test_token?"expectRsult":null,
      realityReuslt:test_token?"realityResut":null,
      reproductionSteps:test_token?"test reporduction":null,
      qaTitle:test_token?"testqatitle":null,
      priority:"P1",
      resetIssueinfo:null,
    };
    this.updatekeyword = "Update"+this.constructor.name;
    this.actions = _.keyBy(_.map(_.keys(this.newissueState),value=>this.updatekeyword+value),value=>{
      return value.split(this.updatekeyword)[1];});
  }
  createactions(type,valuename){
    return type+this.constructor.name + valuename;
  }

  isMatch(action){
    var split_type = action.type.split(this.updatekeyword);
    return _.includes(_.keys(this.newissueState),split_type[1]);
  }
  Handler(state,action){
    var newissue = state.newissue;
    var split_type = action.type.split(this.updatekeyword);
    newissue[split_type[1]] = action.value;
    if(action.type === this.updatekeyword+"resetIssueinfo"){
      return _.merge({},state,{newissue:_.merge(newissue,{expectResult:null,realityReuslt:null,reproductionSteps:null,qaTitle:null})});
    }
    return _.merge({},state,{newissue:_.merge(state.newissue)});
  }
  formatDescription(newissueState){
    var hasInvalidInput = false;
    _.mapValues(newissueState,(value,key)=>{
      if((value === null || value == "")&&(key != "resetIssueinfo"))hasInvalidInput=true;
    })
    console.log('dump invalid state is:',hasInvalidInput);
    if(hasInvalidInput){
      return null;
    }
    return `### 期望结果: ${newissueState.expectResult}\n\n
### 操作结果:${newissueState.realityReuslt}\n\n
### 操作步骤:${newissueState.reproductionSteps}\n\n
### 复现信息\n\n
* 请引用需求文档的版本(*可以减少沟通成本，加快效率 如果不知道如何引用请联系 carlos*):${newissueState.prdReference}\n
* 软件版本号(*在软件中可以看到对应的软件版本号,例如: 1.3.7-1-g2430ee9*):${newissueState.appver}\n
* 机器人固件版本号(*在软件中可以看到对应的软件版本号,例如: 1234 *):${newissueState.robotVer}\n\n
* 机器人编号,及目前机器人拥有者(*有可能需要机器人复现,这个很重要*):${newissueState.robotNo}\n
/\label ~"${newissueState.platform}"\n\n
/\label ~"${newissueState.priority}"\n\n
`;
  }
}

