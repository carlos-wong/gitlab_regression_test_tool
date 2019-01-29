import React, { Component } from "react";
import { connect } from 'react-redux'
import { Button, Input} from "antd";
import "../css/app.css";
const mapStateToProps = (state /*, ownProps*/) => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {
  }
};
class testcasepropertyinput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(<div className="testcasepropertycontainer">
           <Input className="testcasepropertyinput1" placeholder={this.props.firstinput || "input1"} onChange={newvalue=>{
             this.props.onChange(newvalue.target.value,0);
           }}/>
           <Input className="testcasepropertyinput2" placeholder={this.props.secondinput || "input2"} onChange={newvalue=>{
             this.props.onChange(newvalue.target.value,1);
           }}/>
           </div>)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(testcasepropertyinput);
