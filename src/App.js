import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './containers/Home';
import Create from './containers/Create';
import ScrollToTop from './components/ScrollToTop';
import axios from 'axios';
import { parseToYearAndMonth, flatternArr, padLeft } from './utility';
import { generateID as ID } from './utility';

export const AppContext = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},  
      categories: {}, 
      isLoading: false,
      currentDate: parseToYearAndMonth(),
    };

    const withLoading = (cb) => {
      return (...args) => {
        this.setState({
          isLoading: true,
        });
        return cb(...args)
      }
    }

    this.actions = {
      getInitialData: withLoading(async () => {
        const { currentDate } = this.state;
        const getUrlWithData = `http://localhost:3004/items?monthCategory=${currentDate.year}-${padLeft(currentDate.month)}&_sort=timestamp&_order=desc`; // Full URL for items
        const results = await Promise.all([axios.get('http://localhost:3004/categories'), axios.get(getUrlWithData)]); // Full URL for categories
        const [categories, items] = results;
        this.setState({
          items: flatternArr(items.data),
          categories: flatternArr(categories.data),
          isLoading: false,
        })
        return items
      }),

      getEditData: withLoading(async (id) => {
        let promiseArr = [axios.get('http://localhost:3004/categories')];
        if(id) {
          const getUrlWithData = `http://localhost:3004/items/${id}`;
          promiseArr.push(axios.get(getUrlWithData));
        }
        const [categories, editItem] = await Promise.all(promiseArr);
        if(id) {
          this.setState({
            categories: flatternArr(categories.data),
            isLoading: false,
            items: { ...this.state.items, [id]: editItem.data },
          });
        } else {
          this.setState({
            categories: flatternArr(categories.data),
            isLoading: false,
          });
        }
        return {
          categories: flatternArr(categories.data),
          // editItem could be null if id is not provided
          editItem: editItem ? editItem.data : null,
        }
      }),

      selectNewMonth: withLoading(async (year, month) => {
        const getUrlWithData = `http://localhost:3004/items?monthCategory=${year}-${padLeft(month)}&_sort=timestamp&_order=desc`;
        const items = await axios.get(getUrlWithData)
        this.setState({
          items: flatternArr(items.data),
          currentDate: { year, month },
          isLoading: false,
        });
        return items;
      }),
      deleteItem: withLoading(async (item) => {
        const deleteItem = await axios.delete(`http://localhost:3004/items/${item.id}`)
        const updatedItems = { ...this.state.items };
        delete updatedItems[item.id]; // Remove the deleted item from state
        this.setState({
          items: updatedItems,
          isLoading: false,
        });
        return deleteItem;
      }),
      
      createItem: (data, categoryId) => {
        const newId = ID();
        const { year, month } = parseToYearAndMonth(data.date);
        data.monthCategory = `${year}-${month}`;
        data.timestamp = new Date(data.date).getTime();
        const newItem = { ...data, id: newId, cid: categoryId };
        this.setState({
          items: { ...this.state.items, [newId]: newItem },
        });
      },
      updateItem: (item, updatedCategoryId) => {
        const modifiedItem = {
          ...item,
          cid: updatedCategoryId,
          timestamp: new Date(item.date).getTime(),
        };
        this.setState({
          items: {
            ...this.state.items,
            [modifiedItem.id]: modifiedItem,
          }
        });
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
            </Routes>
          </div>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;
