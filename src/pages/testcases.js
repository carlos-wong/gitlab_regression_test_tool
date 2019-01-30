import React, { Component } from "react";
import { connect } from 'react-redux'
import {   Menu, Dropdown, Button, Icon, message,Input} from "antd";
import "../css/app.css";
import LejuhubActions from "../actions/lejuhubactions.js";
import gitlabapi from '../gitlabs/apis.js';
import pagesactions  from '../actions/pagesactions.js';
import Testcasepropertyinput from "../components/testcasepropertyinput.js";
import Newissue_redux from '../redux/newissue_redux.js';

var newissue_redux = new Newissue_redux();

var updateaction_dispatchs = newissue_redux.actions;


var lodash = require('lodash');

const _ = lodash;

const { TextArea } = Input;


var { ipcRenderer } = window.require("electron");


var gitlabpaiInstance = new gitlabapi();

const mapStateToProps = (state /*, ownProps*/) => {
  console.log('dump state newissue is:',state.newissue);
  var localize = state.localize;
  return {
    authed:state.authed,
    localize:state.localize,
    testplatforms:state.testplatforms,
    testProjects:state.testProjects,
    newissue:state.newissue
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
    if(!this.props.authed){
      setTimeout(()=>{
        this.props.jump('/');
      }, 100);
    }
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
              {this.props.newissue.platform || this.props.localize.platform}<Icon type="down" />
            </Button>
          </Dropdown>
          <Dropdown className="testcaseselectcomponent" overlay={this.CreateMenu(this.props.testProjects,(value)=>{this.props[updateaction_dispatchs.projecturl](value.key)})} >
            <Button style={{ marginLeft: 8 }}>
              {this.props.newissue.projecturl || this.props.localize.Project}<Icon type="down" />
            </Button>
          </Dropdown>
        </div>
        <Button type="dashed" onClick={()=>{
          }}>{this.props.localize.UploadFile}</Button>
        <div className="testcasepropertycontainer">
          <Input  placeholder={this.props.localize.Issuetitle || ""} onChange={newvalue=>{this.props[updateaction_dispatchs.qaTitle](newvalue.target.value)}}/>
        </div>
        <TextArea className="testcaseinputareas" placeholder={this.props.localize.ExpectResult} autosize={{ minRows: 3}}
                  onChange={newvalue=>{this.props[updateaction_dispatchs.expectResult](newvalue.target.value)}}></TextArea>
        <TextArea className="testcaseinputareas" placeholder={this.props.localize.RealityResult} autosize={{ minRows: 3}}
                  onChange={newvalue=>{this.props[updateaction_dispatchs.realityReuslt](newvalue.target.value)}}></TextArea>
        <TextArea className="testcaseinputareas" placeholder={this.props.localize.reproductionSteps} autosize={{ minRows: 6}}
                  onChange={newvalue=>{this.props[updateaction_dispatchs.reproductionSteps](newvalue.target.value)}}></TextArea>
        <Button className="testcasesubmit" type="primary" onClick={()=>{
        }}>{this.props.localize.submit}</Button>
        </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(testcase);
