import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Home from './containers/Home';
import Create from './containers/Create';
import ScrollToTop from './components/ScrollToTop';
import axios from 'axios';
import { parseToYearAndMonth, flatternArr, flatternObj, padLeft } from './utility';
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
        this.setState({ isLoading: true });
        return cb(...args);
      };
    };

    this.actions = {
      getInitialData: withLoading(async () => {
        const { currentDate } = this.state;
        const getUrlWithData = `/items?monthCategory=${currentDate.year}-${padLeft(currentDate.month)}&_sort=timestamp&_order=desc`;
        const results = await Promise.all([axios.get('/categories'), axios.get(getUrlWithData)]);
        const [categories, items] = results;

        this.setState({
          items: Array.isArray(items.data) ? flatternArr(items.data) : flatternObj(items.data),
          categories: Array.isArray(categories.data) ? flatternArr(categories.data) : flatternObj(categories.data),
          isLoading: false,
        });
        return items;
      }),

      getEditData: withLoading(async (id) => {
        const { items, categories } = this.state;
        let promiseArr = [];

        if (Object.keys(categories).length === 0) {
          promiseArr.push(axios.get('/categories'));
        }

        const itemAlreadyFetched = Object.keys(items).indexOf(id) > -1;
        if (id && !itemAlreadyFetched) {
          const getUrlWithData = `/items/${id}`;
          promiseArr.push(axios.get(getUrlWithData));
        }

        const [fetchedCategories, editItem] = await Promise.all(promiseArr);

        const finalCategories = fetchedCategories ? flatternArr(fetchedCategories.data) : categories;
        const finalItem = editItem ? editItem.data : items[id];

        if (id) {
          this.setState({
            categories: finalCategories,
            isLoading: false,
            items: { ...this.state.items, [id]: finalItem },
          });
        } else {
          this.setState({
            categories: finalCategories,
            isLoading: false,
          });
        }

        return {
          categories: finalCategories,
          editItem: finalItem,
        };
      }),

      selectNewMonth: withLoading(async (year, month) => {
        const getUrlWithData = `/items?monthCategory=${year}-${padLeft(month)}&_sort=timestamp&_order=desc`;
        const items = await axios.get(getUrlWithData);
        this.setState({
          items: flatternArr(items.data),
          currentDate: { year, month },
          isLoading: false,
        });
        return items;
      }),
      deleteItem: withLoading(async (item) => {
        const deleteItem = await axios.delete(`/items/${item.id}`);
        const updatedItems = { ...this.state.items };
        delete updatedItems[item.id];
        this.setState({
          items: updatedItems,
          isLoading: false,
        });
        return deleteItem;
      }),

      createItem: withLoading(async (data, categoryId) => {
        const newId = ID();
        const { year, month } = parseToYearAndMonth(data.date);
        data.monthCategory = `${year}-${month}`;
        data.timestamp = new Date(data.date).getTime();
        const newItem = await axios.post('/items', { ...data, id: newId, cid: categoryId });
        this.setState({
          items: { ...this.state.items, [newId]: newItem.data },
          isLoading: false,
        });
        return newItem;
      }),

      updateItem: withLoading(async (item, updatedCategoryId) => {
        const updatedDate = new Date(Date.UTC(
          new Date(item.date).getUTCFullYear(),
          new Date(item.date).getUTCMonth(),
          new Date(item.date).getUTCDate()
        ));

        const year = updatedDate.getUTCFullYear();
        const month = padLeft(updatedDate.getUTCMonth() + 1);

        const updatedData = {
          ...item,
          cid: updatedCategoryId,
          timestamp: updatedDate.getTime(),
          monthCategory: `${year}-${month}`
        };

        const updatedItem = await axios.put(`/items/${item.id}`, updatedData);

        this.setState({
          items: { ...this.state.items, [updatedItem.data.id]: updatedItem.data },
          isLoading: false,
        });

        return updatedItem;
      }),
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
          <Navbar bg="dark" variant="dark" expand="lg" className="mb-0" style={{ marginBottom: '0' }}>
            <Navbar.Brand as={Link} to="/">Money Book</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/create">Create</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>


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