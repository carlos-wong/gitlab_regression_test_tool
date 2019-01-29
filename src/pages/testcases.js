import React, { Component } from "react";
import { connect } from 'react-redux'
import { Button, Input} from "antd";
import "../css/app.css";
import LejuhubActions from "../actions/lejuhubactions.js";
import gitlabapi from '../gitlabs/apis.js';
import pagesactions  from '../actions/pagesactions.js';
import Testcasepropertyinput from "../components/testcasepropertyinput.js";


var { ipcRenderer } = window.require("electron");


var gitlabpaiInstance = new gitlabapi();

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    authed: state.authed,
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
        <Testcasepropertyinput className="testcasepropertycontainer" firstinput={"carlos"} secondinput={"nihao"}></Testcasepropertyinput>
        <Button onClick={()=>{
        }}>Test upload</Button>
        </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(testcase);
