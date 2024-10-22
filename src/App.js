import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './containers/Home';
import Create from './containers/Create';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/edit/:id" element={<Create />} />
            </Routes>
          
        </div>
      </Router>
    );
  }
}

export default App;
