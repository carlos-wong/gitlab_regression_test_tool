import React, { Component } from "react";
import ReactDOM from "react-dom";
import lodash from "lodash";
import { Grid, Row, Col } from "react-flexbox-grid";
import { StyleSheet, css } from "aphrodite";
import { Modal, Button, Divider, List, Avatar, Input } from "antd";
import { BrowserRouter as Router, Route, Link,Redirect,Switch} from "react-router-dom";
import { queue } from "async";
import { Provider,connect } from 'react-redux'

import VirtualList from "react-virtual-list";

import axios from "axios";

import logo from "./logo.svg";
import "./App.css";
import Index from "./pages/index";
import testcase from "./pages/testcases";


var { ipcRenderer } = window.require("electron");


const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

var global_this;

const mapStateToProps = (state /*, ownProps*/) => {
  console.log('App state changed:',state.cur_path);
  return {
    cur_path: state.cur_path,
  }
};

const mapDispatchToProps = dispatch => {
  return {
  }
};



class App extends Component {
  render() {
    return(
      <Router>
        <Switch location={{pathname:this.props.cur_path}}>
        <Route path="/" exact component={Index} />
        <Route path="/testcase" component={testcase} />
        </Switch>
      </Router>
    );
  }
}

const styles = StyleSheet.create({});

export default connect(mapStateToProps,mapDispatchToProps)(App);
