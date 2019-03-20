import React, { Component } from 'react';
import Header from './header';
import Form from "./form";
import DialogForm from "./dialogForm";
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
        <DialogForm />
        <div />
      </div>
    );
  }
}
 
export default Counters;