import React, { Component } from 'react';
import Header from './header';
import DialogForm from "./dialogForm";
import DataTable from './datatable';
class Counters extends Component {
  state = {
  };

  render() {
    return (
      <div>
        <Header />
        <br />
        {/* <Form /> */}
        <br />
        <div className="container" style={{paddingTop:20}}>
          <DialogForm />
          <br></br>
          <DataTable />
        </div>
        <div />
      </div>
    );
  }
}
 
export default Counters;