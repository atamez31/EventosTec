import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import './index.css';
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';
import { Redirect, Route, Router } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";
import Home from "./components/home";


export const customHistory = createBrowserHistory();
const Root = () => (
    <Router history={customHistory}>
      <div>
        <Route path="/home" component={Home} />
        <Redirect from="/" to="/home" />
      </div>
    </Router>
);
ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
