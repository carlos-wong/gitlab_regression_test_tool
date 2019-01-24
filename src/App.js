import React, { Component } from "react";
import ReactDOM from "react-dom";
import lodash from "lodash";
import { Grid, Row, Col } from "react-flexbox-grid";
import { StyleSheet, css } from "aphrodite";
import { Modal, Button, Divider, List, Avatar, Input } from "antd";
import { BrowserRouter as Router, Route, Link,Redirect,Switch} from "react-router-dom";
import { queue } from "async";
import VirtualList from "react-virtual-list";

import axios from "axios";

import logo from "./logo.svg";
import "./App.css";


var { ipcRenderer } = window.require("electron");
const Index = () => <h2>Home<Button onClick={()=>{ if(global_this){global_this.setState({ redirectToReferrer: true })}}}>Hicarlos</Button></h2>;
const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

var global_this;


class App extends Component {
  state = { cur_path: "/Users" };
  render() {
    global_this = this;
    let { redirectToReferrer } = this.state;
    if (redirectToReferrer) return <Redirect to={'/About'} />;
    return(
      <Router>
        <Switch location={{pathname:this.state.cur_path}}>
          <Route path="/about" component={About} />
          <Route path="/users" component={Users} />
          <Route path="/" exact component={Index} />
        </Switch>
      </Router>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
