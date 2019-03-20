import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import './index.css';
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';
import { Redirect, Route, Router } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";
import Counters from "./components/counters";
import Form from "./components/form";


export const customHistory = createBrowserHistory();
const Root = () => (
    <Router history={customHistory}>
      <div>
        <Route path="/home" component={Counters} />
        <Route path="/admin" component={Form} />
        <Redirect from="/" to="/home" />
      </div>
    </Router>
);
ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
