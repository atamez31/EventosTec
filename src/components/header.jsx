import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import FormDialog from './login';

class Header extends Component {
    state = {  }

    passDataToParent = isSignedIn => {
        this.props.callbackFromParent(isSignedIn);
    }

    myCallback = (dataFromChild) => {
        this.passDataToParent(dataFromChild);
    }

    render() { 
        return (
            <nav className="navbar navbar-dark bg-primary sticky-top">
            <div className="container">
                <NavLink className="navbar-brand" to="/home">Eventos</NavLink>
                <FormDialog callbackFromParent={this.myCallback}/>
            </div>
          </nav>
        );
    }
}
 
export default Header;