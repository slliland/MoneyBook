import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './containers/Home';
import Create from './containers/Create';
import Account from './containers/Account'; // Import the new Account component
import ScrollToTop from './components/ScrollToTop';
import { testCategories, testItems } from './testData';
import { generateID as ID } from './utility';

export const AppContext = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: testItems,  // Use testItems directly
      categories: testCategories,  // Use testCategories directly
    };
    this.actions = {
      deleteItem: (item) => {
        const filteredItems = this.state.items.filter(i => i.id !== item.id);
        this.setState({ items: filteredItems });
      },
      createItem: (data, categoryId) => {
        const newId = ID();
        const parseToYearAndMonth = (data.date)
        data.monthCategory = `${parseToYearAndMonth.year}-${parseToYearAndMonth.month}`;
        data.timestamp = new Date(data.date).getTime();
        const newItem = { ...data, id: newId, cid: categoryId };
        this.setState({
          items: [...this.state.items, newItem],
        });
        },
        updateItem: (item, updatedCategoryId) => {
          const modifiedItem = {
            ...item,
            cid: updatedCategoryId,
            timestamp: new Date(item.date).getTime(),
          }
          this.setState({
            items: {
              ...this.state.items,
              [modifiedItem.id]: modifiedItem,
            }
          })
        }
      };
  }

  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        actions: this.actions,
      }}>
        <Router>
          <ScrollToTop />
          <div className="App">
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/edit/:id" element={<Create />} />
              <Route path="/account" element={<Account />} /> {/* Add the Account route */}
            </Routes>
          </div>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;
