import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import ReactNotifications from 'react-notifications-component';

import PatientForm from './components/PatientForm/PatientForm'
import Search from './components/Search/Search'

function App() {

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/add-user">Add user</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/search" component={Search} />
          <Route path="/add-user" component={PatientForm} />
          <Route path="/edit-user/:id" render={(props) => <PatientForm {...props} hei="hei" />}
 />
        </Switch>

        <ReactNotifications />
      </div>
    </Router>
  );
}

export default App;
