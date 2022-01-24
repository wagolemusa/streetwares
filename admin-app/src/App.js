import React, { useEffect} from 'react'
import './App.css';

import { Routes,Route } from "react-router-dom";

import Home from './container/Home';
import Signin from './container/Signin';
import Signup from './container/Signup';
import Header from './componets/Header';
import PrivateRoute from './componets/HOC/PrivateRoute'
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './actions'

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if(!auth.authenticate){
        dispatch(isUserLoggedIn());
    }
},[]);

  return (
    <div className="App">
            <Routes>
              {/* <Route exact path="/" element={ 
                <PrivateRoute>
                    <Home/>
                </PrivateRoute>
              } /> */}

          <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<Home/>}/>
          </Route>

              <Route path="/signin" element={ <Signin />} />
              <Route path="/signup" element={ <Signup />} />
            </Routes>
        
    </div>
  );
}

export default App;
