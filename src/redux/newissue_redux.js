var _ = require('lodash');

export default class Newissue_redux {
  constructor() {
    this.newissueState = {
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
    };
    this.updatekeyword = "Update";
    this.actions = _.keyBy(_.map(_.keys(this.newissueState),(value)=>"Update"+value))
  }
  isMatch(action){
    var split_type = action.type.split(this.updatekeyword);
    return _.includes(_.keys(this.newissueState),split_type[1]);
  }
  Handler(state,action){
    var newissue = state.newissue;
    var split_type = action.type.split(this.updatekeyword);
    newissue[split_type[1]] = action.value;
    return _.merge({},state,{newissue:_.merge(state.newissue)});
  }

}

