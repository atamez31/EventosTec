import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import FormDialog from './login';

class Header extends Component {
    state = {  }
    render() { 
        return (
            <nav className="navbar navbar-dark bg-primary sticky-top">
            <div className="container">
                <NavLink className="navbar-brand" to="/home">Eventos</NavLink>
                {/* <NavLink className="nav navItems text-light" to="/admin"><FormDialog/></NavLink> */}
                <FormDialog/>
            </div>
          </nav>
        );
    }
}
 
export default Header;