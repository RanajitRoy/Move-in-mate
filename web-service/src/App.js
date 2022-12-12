// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import Header from "./header/header"
import Login from "./login/login"
import Register from "./register/register"
import Home from "./home/home"

const init_state = {
  loggedIn: false
}

function App() {
  const [globalState, setGlobalState] = useState({
    loggedIn: false,
    sessionKey: ""
  })
  
  return (
    <div className="App">
      <Router>
        <Header loggedIn={globalState.loggedIn}/>
        <Routes>
          <Route exact path='/' element={globalState.loggedIn ? <Navigate to='/home'/> : <Navigate to='/login'/>} />
          <Route path='/login' element={globalState.loggedIn ? <Navigate to='/home'/> : <Login stateSetter={setGlobalState} state={globalState}/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={globalState.loggedIn ? <Home /> : <Navigate to='/login'/>} />
        </Routes>
      </Router>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
