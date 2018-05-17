import React, { Component } from "react";
import ReactDOM from "react-dom";
import lodash from "lodash";
import { Grid, Row, Col } from "react-flexbox-grid";
import { StyleSheet, css } from "aphrodite";
import { Modal, Button, Divider, List, Avatar, Input } from "antd";
import { queue } from "async";

import axios from "axios";

import logo from "./logo.svg";
import "./App.css";
import VirtualList from "react-virtual-list";

// import * as token from './token.js';
// const { ipcRenderer } = window.require('electron');

var { ipcRenderer } = window.require("electron");

class App extends Component {
  render() {
    return (
      <div className="App">
        <a>hello world</a>
      </div>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
