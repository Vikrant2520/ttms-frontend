import React, { useState } from 'react';
import Login from './components/Login';
import uploadCSV from './components/uploadCSV';
import timetable from './components/Timetable';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {

  

  return (
     
    <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/uploadCSV" component={uploadCSV} />
      <Route path="/timetable" component={timetable} />
    </Switch>
    
    </Router>
    
       
  );
}

export default App;
