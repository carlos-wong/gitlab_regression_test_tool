import React, { Component } from "react";
import { connect } from 'react-redux'
import { Button, Input} from "antd";
import "../css/app.css";
import LejuhubActions from "../actions/lejuhubactions.js";
import gitlabapi from '../gitlabs/apis.js';


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
      } catch (err) {
        dispatch(LejuhubActions.loginWithToken(false));
      } finally {
      }
    }
  }
}

class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<div className="fullscreen">
            <div className="spacetokeninput">
            </div>
            <div className="tokeninputcontainer">
            <Search
            placeholder="Your lejuhub token"
            enterButton="Login"
            size="large"
            onSearch={value => this.props.login(value)}
            />
            </div>
            <div className="spacetokeninput">
            </div>
            </div>);
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Index);
