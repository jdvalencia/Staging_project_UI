import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBarComponent from './components/NavBarComponent';
import EventComponent from './components/EventComponent';
import RegisterComponent from './components/RegisterComponent';
import RootComponent from './components/RootComponent';
import LoginComponent from './components/LoginComponent';
import AppUser from './models/AppUser';
import LogoutComponent from './components/LogoutComponent';

function App() {
  //@ts-ignore
  const [authUser, setAuthUser] = useState(null as AppUser);

  return (
    <>
      <Router>
        <NavBarComponent authUser={authUser} />
        <Switch>
          <Route exact path='/' render={() => <RootComponent />} />
          <Route exact path='/events' render={() => <EventComponent authUser={authUser} />} />
          <Route exact path='/register' render={() => <RegisterComponent />} />
          <Route exact path='/login' render={() => <LoginComponent authUser={authUser} setAuthUser={setAuthUser}/>} />
          <Route exact path="/logout" render={() => <LogoutComponent />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
