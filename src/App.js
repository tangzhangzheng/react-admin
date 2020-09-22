import React, { Component } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom'
import Login from './views/login/index';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route component={Login} exact path="/"></Route>


        </Switch>
      </HashRouter>
    )
  }
}

export default App;
