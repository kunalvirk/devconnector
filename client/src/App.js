import React, {
  Component
} from 'react';
import './App.css';

// React router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Provider} from 'react-redux';
import store from './store';

import setDefaultHeader from './utils/setDefaultHeader';
import { setCurrentUser, logOutAction } from './actions/authActions';
import { clearProfile } from './actions/profileActions';
import jwt_decode from 'jwt-decode';

// Components
import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import Footer from './components/Layout/Footer';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import CreateProfile from './components/CreateProfile/CreateProfile';
import EditProfile from './components/EditProfile/EditProfile';
import AddExperience from './components/AddProfileInfo/AddExperience';
import AddEducation from './components/AddProfileInfo/AddEducation';
import Profiles from './components/Profiles/Profiles';
import Profile from './components/Profile';
import Posts from './components/Posts/Posts';
import Post from './components/Post/Post';


// Private route
import PrivateRoute from './common/PrivateRoute';


if (localStorage.getItem('AUTH.TOKEN')) {
  // Set current user everytime user refreshes the page
  setDefaultHeader(localStorage.getItem('AUTH.TOKEN'))
  const decode = jwt_decode(localStorage.getItem('AUTH.TOKEN'))
  store.dispatch(setCurrentUser(decode)) 

  // Check for expired token
  const currTime = Date.now()/1000;
  if (decode.exp < currTime) {
    store.dispatch(logOutAction())
    store.dispatch(clearProfile())

    window.location.href = '/login';

  }

}

class App extends Component {
  render() {
    return (
    <Provider store={store}>
      <Router>
        <div className="App">
            <Navbar />
              <Route exact path="/" component={Landing} />

              <div className="container">
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:handle" component={Profile} />
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                  <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                  <PrivateRoute exact path="/add-experience" component={AddExperience} />
                  <PrivateRoute exact path="/add-education" component={AddEducation} />
                  <PrivateRoute exact path="/feeds" component={Posts} />
                  <PrivateRoute exact path="/post/:post_id" component={Post} />
                </Switch>
              </div>

            <Footer/>
        </div>
      </Router>
    </Provider>
    );
  }
}

export default App;