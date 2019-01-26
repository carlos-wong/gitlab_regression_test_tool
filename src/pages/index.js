import React, { Component } from "react";
import { connect } from 'react-redux'
import { Button, Input} from "antd";
import "../css/app.css";
import LejuhubActions from "../actions/lejuhubactions.js";
const Search = Input.Search;


const mapStateToProps = (state /*, ownProps*/) => {
  console.log('state updated:',state);
  return {
    counter: state.counter + 2
  }
};

const mapDispatchToProps = dispatch => {
  return {
    login: (token) => dispatch(LejuhubActions.loginwithtokenaddtodo(token)),
  }
}

class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('render of index',this.props.counter);
    return (<div className="fullscreen">
            <div className="spacetokeninput">
            </div>
            <div className="tokeninputcontainer">
            <Search
            placeholder="Your lejuhub token"
            enterButton="Login"
            size="large"
            onSearch={value => console.log(value)}
            />
            </div>
            <div className="spacetokeninput">
            </div>
            </div>);
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Index);
