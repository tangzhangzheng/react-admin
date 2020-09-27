import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Index from './views/index/Index';
import Login from './views/login/index';
import PrivateRouter from './components/privateRouter/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route component={Login} exact path="/"></Route>
          <PrivateRouter component={Index} path="/index"></PrivateRouter>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
