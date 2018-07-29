import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './Component/Home/Home';
import Doc from './Component/Doc/Doc';

class App extends Component {
  render(){
    return (
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/doc/:id" component={Doc} />
          </div>  
        </Router>  
    );
  }  
}

export default App;
