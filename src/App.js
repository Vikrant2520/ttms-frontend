import React, { useState } from 'react';
import Login from './components/Login';
import uploadCSV from './components/uploadCSV';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {

  

  return (
     
    <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={uploadCSV} />
    </Switch>
    
    </Router>
    
       
  );
}

export default App;
