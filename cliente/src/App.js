import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import LoginPage from './components/Login/Login';
import HomePage from './components/HomePage/HomePage';
import Casos from './components/Casos/Casos';
import './App.css';

const Home = () => (
  <HomePage />
);

const Login = () => (
  <LoginPage />
);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/casos">
            <Casos />
          </Route>
        </div>
      </Router>
    );
  }
}

export default App;