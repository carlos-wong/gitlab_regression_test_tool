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


var { ipcRenderer } = window.require("electron");


const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

var global_this;


class App extends Component {
  state = { cur_path: "/" };
  render() {
    console.log('dump app.js rerender');
    global_this = this;
    let { redirectToReferrer } = this.state;
    return(<Index ></Index>)
    // return(
    //   <Router>
    //     <Switch location={{pathname:this.state.cur_path}}>
    //       <Route path="/about" component={About} />
    //       <Route path="/abouts" component={Users} />
    //       <Route path="/" exact component={Index} />
    //     </Switch>
    //   </Router>
    // );
  }
}

const styles = StyleSheet.create({});

export default App;
