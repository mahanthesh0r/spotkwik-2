import { render } from '@testing-library/react';
import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Switch, Route, Router} from 'react-router-dom';
import Home from './components/Home'
import AddUser from './components/AddUser'
import SingleUser from './components/SingleUser';


export default class App extends Component {
  render() {
  return (
    <BrowserRouter>
      <Switch>
        <Route  path="/adduser"  component={AddUser} />
        <Route  exact path="/user/:id"  component={SingleUser} />
        <Route exact path="/"  component={Home} />
      </Switch>
      </BrowserRouter>

  );
}
}

