import React, { Component } from "react";
import { connect } from 'react-redux'
import { Button, Input} from "antd";
import "../css/app.css";
import LejuhubActions from "../actions/lejuhubactions.js";
import pagesactions  from '../actions/pagesactions.js';
import gitlabapi from '../gitlabs/apis.js';
import _ from 'lodash';


var gitlabpaiInstance = new gitlabapi();

const Search = Input.Search;


const mapStateToProps = (state /*, ownProps*/) => {
  console.log('index page state updated:',state);
  return {
    authed: state.authed,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    login: async (token) => {
      var ret;
      try {
        ret = await gitlabpaiInstance.initInstance(token);
        dispatch(LejuhubActions.loginWithToken(ret.status === 200));
        if(ret.status === 200){
          dispatch(pagesactions.JumpTo('/testcase'));
        }
      } catch (err) {
        dispatch(LejuhubActions.loginWithToken(false));
      } finally {
      }
    },
    jump: (url) =>{
      dispatch(pagesactions.JumpTo(url));
    }
  }
}

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showvalue:"",
      inputvalue:""
    }
  }
  render() {
    return (<div className="fullscreen">
            <div className="spacetokeninput">
            </div>
            <div className="tokeninputcontainer">
            <Search
            placeholder="Your lejuhub token"
            enterButton="Login"
            onChange={newvalue=>{
              this.setState({showvalue:_.repeat('*', newvalue.target.value.length),
                             inputvalue:newvalue.target.value});
            }}
            value={this.state.showvalue}
            size="large"
            onSearch={value => this.props.login(this.state.inputvalue)}
            />
            </div>
            <div className="spacetokeninput">
            </div>
            </div>);
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Index);
