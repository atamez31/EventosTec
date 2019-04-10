import React, { Component } from 'react';
import Header from './header';
import DialogForm from "./dialogForm";
import DataTable from './datatable';
class Home extends Component {
  state = {
  };

  render() {
    return (
      <div>
        <Header />
        <br />
        {/* <Form /> */}
        <br />
        <div className="container" style={{ paddingTop: 20 }}>
          <DialogForm type={"Add"} icon={"fab"} />
          <br />
          <DataTable />
        </div>
        <div />
      </div>
    );
  }
}
 
export default Home;