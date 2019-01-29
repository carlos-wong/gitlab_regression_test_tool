import React, { Component } from "react";
import { connect } from 'react-redux'
import { Button, Input} from "antd";
import "../css/app.css";
import LejuhubActions from "../actions/lejuhubactions.js";
import gitlabapi from '../gitlabs/apis.js';
import pagesactions  from '../actions/pagesactions.js';
import Testcasepropertyinput from "../components/testcasepropertyinput.js";

const { TextArea } = Input;


var { ipcRenderer } = window.require("electron");


var gitlabpaiInstance = new gitlabapi();

const mapStateToProps = (state /*, ownProps*/) => {
  var localize = state.localize;
  return {
    authed:state.authed,
    localize:state.localize,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    jump: (url) =>{
      dispatch(pagesactions.JumpTo(url));
    }
  }
};

class testcase extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if(!this.props.authed){
      setTimeout(()=>{
        this.props.jump('/');
      }, 100);
    }
    return(
        <div className="componentcontainer">
        <Testcasepropertyinput className="testcasepropertycontainer" firstinput={this.props.localize.appver} secondinput={this.props.localize.robotNo}></Testcasepropertyinput>
        <Testcasepropertyinput className="testcasepropertycontainer" firstinput={this.props.localize.prdReference} secondinput={this.props.localize.robotVer}></Testcasepropertyinput>
        <Testcasepropertyinput className="testcasepropertycontainer" firstinput={this.props.localize.platform} secondinput={this.props.localize.deviceNo}></Testcasepropertyinput>
        <Button type="dashed" onClick={()=>{
        }}>{this.props.localize.UploadFile}</Button>
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
