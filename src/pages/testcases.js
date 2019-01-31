import React, { Component } from "react";
import { connect } from 'react-redux'
import {   Menu, Dropdown, Button, Icon, message,Input} from "antd";
import "../css/app.css";
import LejuhubActions from "../actions/lejuhubactions.js";
import gitlabapi from '../gitlabs/apis.js';
import pagesactions  from '../actions/pagesactions.js';
import Testcasepropertyinput from "../components/testcasepropertyinput.js";
import Newissue_redux from '../redux/newissue_redux.js';
var { ipcRenderer } = window.require("electron");
var lodash = require('lodash');

const {dialog,clipboard} = window.require('electron').remote;

var newissue_redux = new Newissue_redux();

var updateaction_dispatchs = newissue_redux.actions;

const _ = lodash;

const { TextArea } = Input;




var gitlabapiInstance = new gitlabapi();

const mapStateToProps = (state /*, ownProps*/) => {
  console.log('dump state newissue is:',state.newissue);
  var localize = state.localize;
  return {
    authed:state.authed,
    localize:state.localize,
    testplatforms:state.testplatforms,
    testProjects:state.testProjects,
    newissue:state.newissue,
    token:state.gitlabtoken,
    issuepriority:state.issuepriority,
  }
};

const mapDispatchToProps = dispatch => {
  var dispatchs = {
    jump: (url) =>{
      dispatch(pagesactions.JumpTo(url));
    }
  };
  function createDispatch(dispatchs,dispatch,key){
    dispatchs[key] = (value)=>{dispatch({type:key,value})};
    return dispatchs;
  }
  _.map(_.mapValues(updateaction_dispatchs),(value)=>{
    dispatchs = createDispatch(dispatchs,dispatch,value);
  });
  return dispatchs;
};

class testcase extends Component {
  constructor(props) {
    super(props);
    gitlabapiInstance.initInstance(this.props.token)
      .then(()=>{
        
      })
      .catch((e)=>{
        
      });
    this.state = {
      uploadingfile:false
    };
  }
  showUploadSuccessMsg(){
    message.info(this.props.localize.UploadSuccessInfo);
  }
  showValidInputMsg(){
    message.info(this.props.localize.InvalidInput);
  }



  CreateMenu(source,callback){
    return (
      <Menu onClick={value=>callback(value)}>
        {
          lodash.map(source,(value)=>{
            return <Menu.Item key={""+value} ><Icon type="user" />{value}</Menu.Item>})
        }
      </Menu>
    );
  }

  render() {
    return(
        <div className="componentcontainer">
          <Testcasepropertyinput className="testcasepropertycontainer"
                                 onChange={(value,index)=>{
                                   if(index === 0){
                                     this.props[updateaction_dispatchs.appver](value);
                                     // this.props[newissue_redux.updateaction(Object.getOwnPropertyNames(newissue_redux.newissueState.appver))](value);
                                   }
                                   else if(index === 1){
                                     this.props[updateaction_dispatchs.robotNo](value);
                                   }}}
            firstinput={this.props.localize.appver} secondinput={this.props.localize.robotNo}/>
            <Testcasepropertyinput className="testcasepropertycontainer" firstinput={this.props.localize.prdReference} secondinput={this.props.localize.robotVer}
                                   onChange={(value,index)=>{
                                   if(index === 0){
                                     this.props[updateaction_dispatchs.prdReference](value);
                                   }
                                   else if(index === 1){
                                     this.props[updateaction_dispatchs.robotVer](value);
                                   }}}/>
        <div className="testcasepropertycontainer">
          <Input  placeholder={this.props.localize.deviceNo || ""} onChange={newvalue=>{this.props[updateaction_dispatchs.deviceNo](newvalue.target.value)}}/>
        </div>
        <div className="testcasepropertycontainer">
          <Dropdown className="testcaseselectcomponent" overlay={this.CreateMenu(this.props.testplatforms,(value)=>{this.props[updateaction_dispatchs.platform](value.key)})}>
            <Button style={{ marginLeft: 8 }}>
              {this.props.localize.platform + ":  "}{this.props.newissue.platform || this.props.localize.platform}<Icon type="down" />
            </Button>
          </Dropdown>
          <Dropdown className="testcaseselectcomponent" overlay={this.CreateMenu(this.props.testProjects,(value)=>{this.props[updateaction_dispatchs.projecturl](value.key)})} >
            <Button style={{ marginLeft: 8 }}>
              {this.props.localize.Project + ":  "}{this.props.newissue.projecturl || this.props.localize.Project}<Icon type="down" />
            </Button>
          </Dropdown>
          <Dropdown className="testcaseselectcomponent" overlay={this.CreateMenu(this.props.issuepriority,(value)=>{this.props[updateaction_dispatchs.priority](value.key)})} >
            <Button style={{ marginLeft: 8 }}>
              {this.props.localize.Priority+":  "}{this.props.newissue.priority}<Icon type="down" />
            </Button>
          </Dropdown>
        </div>
        <Button type="dashed" onClick={()=>{
            if(!this.state.uploadingfile){
              this.state.uploadingfile = true;
              var filepath = dialog.showOpenDialog({properties:['openFile']},(filepath)=>{
                if (filepath && filepath[0]) {
                  var ret = JSON.parse(ipcRenderer.sendSync("uploadfile",{token:this.props.token,filepath:filepath[0]}));
                  clipboard.writeText(ret.markdown);
                  this.showUploadSuccessMsg();
                }
                this.state.uploadingfile = false;
              });
            }

          }}>{this.props.localize.UploadFile}</Button>
        <div className="testcasepropertycontainer">
          <Input  placeholder={this.props.localize.Issuetitle || ""} onChange={newvalue=>{this.props[updateaction_dispatchs.qaTitle](newvalue.target.value)}}
            value={this.props.newissue.qaTitle}/>
        </div>
        <TextArea className="testcaseinputareas" placeholder={this.props.localize.ExpectResult} autosize={{ minRows: 3}}
                  value={this.props.newissue.expectResult}
                  onChange={newvalue=>{this.props[updateaction_dispatchs.expectResult](newvalue.target.value)}}></TextArea>
        <TextArea className="testcaseinputareas" placeholder={this.props.localize.RealityResult} autosize={{ minRows: 3}}
                  value={this.props.newissue.realityReuslt}
                  onChange={newvalue=>{this.props[updateaction_dispatchs.realityReuslt](newvalue.target.value)}}></TextArea>
        <TextArea className="testcaseinputareas" placeholder={this.props.localize.reproductionSteps} autosize={{ minRows: 6}}
                  value={this.props.newissue.reproductionSteps}
                  onChange={newvalue=>{this.props[updateaction_dispatchs.reproductionSteps](newvalue.target.value)}}></TextArea>
        <Button className="testcasesubmit" type="primary" onClick={()=>{
            var issue_info = newissue_redux.formatDescription(this.props.newissue);
            if(issue_info){
              gitlabapiInstance.CreateIssue(this.props.token,this.props.newissue.projecturl,this.props.newissue.qaTitle,issue_info)
                .then(()=>{
                  this.props[updateaction_dispatchs.resetIssueinfo]();
                })
                .catch((e)=>{
                  console.log('create issue error:',e);
                  this.showValidInputMsg();
                });
            }else{
              this.showValidInputMsg();
            }
        }}>{this.props.localize.submit}</Button>
        </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(testcase);
