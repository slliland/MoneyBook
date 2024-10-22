import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './containers/Home';
import Create from './containers/Create';
import { testCategories, testItems } from './testData';
import { flatternArr } from './utility';

export const AppContext = React.createContext();
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: flatternArr(testItems),
      categories: flatternArr(testCategories),
    };
  }
  render() {
    return (
      // Pass the state to the AppContext.Provider
      <AppContext.Provider value={{
        state: this.state,
      }}>
      <Router>
        <div className="App">
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/edit/:id" element={<Create />} />
            </Routes>
          
        </div>
      </Router>
      </AppContext.Provider>
    );
  }
}

export default App;
