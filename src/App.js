import React , {Component} from 'react';
import {BrowserRouter , Route , Switch} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
//@ts-ignore
import 'bootstrap/dist/js/bootstrap';
// to import react-bootstrap import {...} from 'react-bootstrap'
import 'jquery';
import 'popper.js';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/login" component={Login} exact/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
