import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './utils/store';

// Components
import Navbar from './components/common/navbar';
import NotFound from './components/common/page-not-found';
import Login from './components/user/login';
import Dashboard from './components/dashboard/dashboard'
import Register from './components/user/register';
import RegisterDetails from './components/user/register_details';


import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/enter_details" component={RegisterDetails} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
      </Router>
    </Provider>
  );
}

export default App;
