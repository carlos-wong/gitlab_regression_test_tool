import React, { Component } from "react";
import { connect } from 'react-redux'
import { Modal, Button, Divider, List, Avatar, Input } from "antd";



const mapStateToProps = (state /*, ownProps*/) => {
  console.log('init index state:',state);
  return {
    counter: state.counter + 2
  }
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
    reset: () => dispatch({ type: 'RESET' })
  }
}

class Index extends Component {
  componentWillReceiveProps(NextProps) {
    console.log('componentWillReceiveProps', NextProps);
  }
  render() {
    console.log('render of index',this.props.counter);
    return <h2>Home Carlos<Button onClick={()=>{
      this.props.increment();
    }}>hi carlos {this.props.counter}</Button></h2>;
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Index);
