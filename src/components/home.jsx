import React, { Component } from 'react';
import Header from './header';
import DialogForm from "./dialogForm";
import DataTable from './datatable';
class Home extends Component {
  state = {
    isSignedIn: false
  };

  myCallback = dataFromChild => {
    this.setState({ isSignedIn: dataFromChild });
  };

  render() {
    return (
      <div>
        <Header callbackFromParent={this.myCallback} />
        <br />
        {/* <Form /> */}
        <br />
        <div className="container" style={{ paddingTop: 20 }}>
          <DialogForm type={"Add"} icon={"fab"} />
          <br />
          <DataTable isSignedIn={this.state.isSignedIn}/>
        </div>
        <div />
      </div>
    );
  }
}
 
export default Home;