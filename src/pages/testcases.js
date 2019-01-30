import React, { Component } from "react";
import { connect } from 'react-redux'
import {   Menu, Dropdown, Button, Icon, message,Input} from "antd";
import "../css/app.css";
import LejuhubActions from "../actions/lejuhubactions.js";
import gitlabapi from '../gitlabs/apis.js';
import pagesactions  from '../actions/pagesactions.js';
import Testcasepropertyinput from "../components/testcasepropertyinput.js";
import Newissue_redux from '../redux/newissue_redux.js';

var action_dispatchs = new Newissue_redux().actions;


var lodash = require('lodash');

const _ = lodash;

const { TextArea } = Input;


var { ipcRenderer } = window.require("electron");


var gitlabpaiInstance = new gitlabapi();

const mapStateToProps = (state /*, ownProps*/) => {
  console.log('dump state new issue is:',state.newissue);
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
  _.map(_.keys(action_dispatchs),(value)=>{
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
      <Menu onClick={callback()}>
        {
          lodash.map(source,(value)=>{
            return <Menu.Item key={""+value}><Icon type="user" />{value}</Menu.Item>})
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
                                     this.props[action_dispatchs.Updateappver](value);
                                   }
                                   else if(index === 1){
                                     this.props[action_dispatchs.UpdaterobotNo](value);
                                   }}}
            firstinput={this.props.localize.appver} secondinput={this.props.localize.robotNo}/>
            <Testcasepropertyinput className="testcasepropertycontainer" firstinput={this.props.localize.prdReference} secondinput={this.props.localize.robotVer}
                                   onChange={(value,index)=>{
                                   if(index === 0){
                                     this.props[action_dispatchs.UpdateprdReference](value);
                                   }
                                   else if(index === 1){
                                     this.props[action_dispatchs.UpdaterobotVer](value);
                                   }}}/>
        <div className="testcasepropertycontainer">
        <Input  placeholder={this.props.localize.deviceNo || ""} />
        </div>
        <div className="testcasepropertycontainer">
          <Dropdown className="testcaseselectcomponent" overlay={this.CreateMenu(this.props.testplatforms,()=>{})}>
        <Button style={{ marginLeft: 8 }}>
        {this.props.localize.platform}<Icon type="down" />
        </Button>
        </Dropdown>
        <Dropdown className="testcaseselectcomponent" overlay={this.CreateMenu(this.props.testProjects,()=>{})} >
        <Button style={{ marginLeft: 8 }}>
        {this.props.localize.Project}<Icon type="down" />
        </Button>
        </Dropdown>
        </div>
        <Button type="dashed" onClick={()=>{
          }}>{this.props.localize.UploadFile}</Button>
        <div className="testcasepropertycontainer">
        <Input  placeholder={this.props.localize.Issuetitle || ""} />
        </div>

        <TextArea className="testcaseinputareas" placeholder={this.props.localize.ExpectResult} autosize={{ minRows: 3}}/>
        <TextArea className="testcaseinputareas" placeholder={this.props.localize.RealityResult} autosize={{ minRows: 3}}/>
        <TextArea className="testcaseinputareas" placeholder={this.props.localize.reproductionSteps} autosize={{ minRows: 6}}/>
        <Button className="testcasesubmit" type="primary" onClick={()=>{
        }}>{this.props.localize.submit}</Button>
        </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(testcase);
