import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PriceList from '../components/PriceList';
import { LIST_VIEW, CHART_VIEW, parseToYearAndMonth, padLeft } from '../utility';
import TotalPrice from '../components/TotalPrice';
import MonthPicker from '../components/MonthPicker';
import CreateBtn from '../components/CreateBtn.js';
import React from 'react';
import Ionicon from 'react-ionicons';
import { Tabs, Tab } from '../components/Tabs';
import "../styles/Home.css";
import { AppContext } from '../App.js';

const categories = {
  "1": { "id": "1", "name": "Travel", "type": "outcome", "iconName": "ios-plane" },
  "2": { "id": "2", "name": "Food", "type": "outcome", "iconName": "ios-restaurant" },
  "3": { "id": "3", "name": "Movie", "type": "outcome", "iconName": "ios-film" },
  "4": { "id": "4", "name": "Freelance", "type": "income", "iconName": "ios-infinite" }
};

const items = [
  { "id": 1, "title": "Freelance Project", "price": 4200, "date": "2024-03-15", "cid": 4 },
  { "id": 2, "title": "Online Shopping", "price": 120, "date": "2024-10-25", "cid": 2 },
  { "id": 3, "title": "Movie Night", "price": 50, "date": "2024-05-02", "cid": 3 }
];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items,
      currentDate: parseToYearAndMonth(),
      tabView: LIST_VIEW
    };
  }

  scrollToContent = () => {
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
      contentArea.scrollIntoView({ behavior: 'smooth' });
    }
  }

  changeView = (viewIndex) => {
    const tabView = viewIndex === 0 ? LIST_VIEW : CHART_VIEW;
    this.setState({ tabView });
  }

  changeDate = (year, month) => {
    this.setState({ currentDate: { year, month } });
  }

  modifyItem = (modifiedItem) => {
    const modifiedItems = this.state.items.map(item =>
      item.id === modifiedItem.id ? { ...item, title: 'updated' } : item
    );
    this.setState({ items: modifiedItems });
  }

  deleteItem = (deletedItem) => {
    const filteredItems = this.state.items.filter(item => item.id !== deletedItem.id);
    this.setState({ items: filteredItems });
  }

  createItem = () => {
    const newItem = {
      id: Math.max(...this.state.items.map(i => i.id)) + 1,
      title: "New Item",
      price: 0,
      date: "2024-05-02",
      cid: 1
    };
    this.setState({ items: [newItem, ...this.state.items] });
  }

  render() {
    const { items, currentDate, tabView } = this.state;
    let totalIncome = 0, totalOutcome = 0;

    const itemsWithCategory = items
      .map(item => {
        const category = categories[item.cid];
        if (category) {
          return { ...item, category };
        }
        return null;
      })
      .filter(item => item !== null)
      .filter(item => item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`));

    itemsWithCategory.forEach(item => {
      if (item.category.type === 'income') {
        totalIncome += item.price;
      } else if (item.category.type === 'outcome') {
        totalOutcome += item.price;
      }
    });

    return (
      <AppContext.Consumer>
        {({ state }) => (
          <React.Fragment>
            <header className="App-header">
              <div className="banner-container">
                <img className="banner" src={require('../banner.png')} alt="banner" />
                <button onClick={this.scrollToContent} className="scroll-down-btn">
                  <Ionicon icon="ios-arrow-down" fontSize="70px" color="white" />
                </button>
              </div>
            </header>
            <div className="row-with-background justify-content-center">
              <div className="col-4">
                <MonthPicker
                  year={currentDate.year}
                  month={currentDate.month}
                  onChange={this.changeDate}
                />
              </div>
              <div className="col-4">
                <TotalPrice income={totalIncome} outcome={totalOutcome} />
              </div>
            </div>
            <div className="content-area py-3 px-3">
              <Tabs activeIndex={0} onTabChange={this.changeView}>
                <Tab>
                  <Ionicon className="rounded-circle" fontSize="25px" color={'#007bff'} icon='ios-paper' />
                  List
                </Tab>
                <Tab>
                  <Ionicon className="rounded-circle" fontSize="25px" color={'#007bff'} icon='ios-pie' />
                  Chart
                </Tab>
              </Tabs>
              <CreateBtn className="create-btn" onClick={this.createItem} />
              {tabView === LIST_VIEW && (
                <PriceList
                  items={itemsWithCategory}
                  onModifyItem={this.modifyItem}
                  onDeleteItem={this.deleteItem}
                />
              )}
              {tabView === CHART_VIEW && <h1>Chart</h1>}
            </div>
          </React.Fragment>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Home;
