import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PriceList from '../components/PriceList';
import ViewTab from '../components/ViewTab';
import { LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, parseToYearAndMonth, padLeft } from '../utility';
import TotalPrice from '../components/TotalPrice';
import MonthPicker from '../components/MonthPicker';
import CreateBtn from '../components/CreateBtn.js';
import React from 'react';
import Ionicon from 'react-ionicons';

const categories = {
  "1": {
    "id": "1",
    "name": "Travel",
    "type": "outcome",
    "iconName": "ios-plane"
  },
  "2": {
    "id": "2",
    "name": "Food",
    "type": "outcome",
    "iconName": "ios-restaurant"
  },
  "3": {
    "id": "3",
    "name": "Movie",
    "type": "outcome",
    "iconName": "ios-film"
  },
  "4": {
    "id": "4",
    "name": "Freelance",
    "type": "income",
    "iconName": "ios-infinite"
  }
}

const items = [
  {
    "id": 1,
    "title": "Freelance Project",
    "price": 4200,
    "date": "2024-03-15",
    "cid": 4
  },
  {
    "id": 2,
    "title": "Online Shopping",
    "price": 120,
    "date": "2024-10-25",
    "cid": 2
  },
  {
    "id": 3,
    "title": "Movie Night",
    "price": 50,
    "date": "2024-05-02",
    "cid": 3
  }
]

const newItem = {
  "id": 4,
  "title": "New Item",
  "price": 0,
  "date": "2024-05-02",
  "cid": 1
}

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items,
      currentDate: parseToYearAndMonth(),
      tabView: LIST_VIEW
    }
  }

  scrollToContent = () => {
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
      contentArea.scrollIntoView({ behavior: 'smooth' });
    }
  }
  changeView = (view) => {
    this.setState({
      tabView: view
    })
  }
  changeDate = (year, month) => {
    this.setState({
      currentDate: { year, month }
    })
  }
  modiftItem = (modifiedItem) => {
    const modifiedItems = this.state.items.map(item => {
      if (item.id === modifiedItem.id) {
        return { ...item, title: 'updated' }
      } else {
        return item
      }
    })
    this.setState({
      items: modifiedItems
    })
  }
  deleteItem = (deletedItem) => {
    const filteredItems = this.state.items.filter(item => item.id !== deletedItem.id)
    this.setState({
      items: filteredItems
    })
  }
  createItem = () => {
    this.setState({
      items: [newItem, ...this.state.items]
    })
}

  render() {
    const { items, currentDate, tabView } = this.state
    const itemsWithCategory = items.map(item => {
      item.category = categories[item.cid]
      return item
    }).filter(item => {
      return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
    })
    let totalIncome = 0, totalOutcome = 0;
    items.forEach(item => {
      if (item.category.type === 'income') {
        totalIncome += item.price
      } else if (item.category.type === 'outcome') {
        totalOutcome += item.price
      }
    })

    return (
      <React.Fragment>
        <header className="App-header">
          <div className="banner-container">
            <img className="banner" src={require('../banner.png')} alt="banner" />
            <button onClick={this.scrollToContent} className="scroll-down-btn">
              <Ionicon icon="ios-arrow-down" fontSize="70px" color="white" />
            </button>
          </div>
        </header>
        <div className="row-with-background">
        <div className="col">
          </div>
            <div className="col">
              <MonthPicker
                year={currentDate.year}
                month={currentDate.month}
                onChange={this.changeDate}
              />
            </div>
            <div className="col">
              <TotalPrice income={totalIncome} outcome={totalOutcome} />
            </div>
            <div className="col">
          </div>
          </div>
        <div className="content-area py-3 px-3">
          <ViewTab activeTab={tabView} onTabChange={this.changeView} />
          <CreateBtn className="create-btn" onClick={this.createItem } />
          {tabView == LIST_VIEW &&
          <PriceList
            items={ itemsWithCategory}
            onModifyItem={(item) => { this.modiftItem(item) }}
            onDeleteItem={(item) => { this.deleteItem(item) }}
          />
          }
          {tabView == CHART_VIEW &&
          <h1>chart</h1>
          }

        </div>
      </React.Fragment>
    )
  }
}

export default Home;
