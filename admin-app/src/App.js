import React from 'react'
import './App.css';

import { BrowserRouter, Routes,Route } from "react-router-dom";

import Home from './container/Home';
import Signin from './container/Signin';
import Signup from './container/Signup';
import Header from './componets/Header';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
              <Route exact path="/" element={ <Home/>} />
            
              <Route path="/signin" element={ <Signin />} />
              <Route path="/signup" element={ <Signup />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
