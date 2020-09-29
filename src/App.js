import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Index from './views/index/Index';
import Login from './views/login/index';
import PrivateRouter from './components/privateRouter/index';
import { Provider } from 'react-redux';
import Store from '@/store/Index.js'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Provider store={Store}>
        <BrowserRouter>
          <Switch>
            <Route component={Login} exact path="/"></Route>
            <PrivateRouter component={Index} path="/index"></PrivateRouter>
          </Switch>
        </BrowserRouter>
      </Provider>

    )
  }
}

export default App;
