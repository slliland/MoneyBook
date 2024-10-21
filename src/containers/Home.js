import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PriceList from '../components/PriceList';
import ViewTab from '../components/ViewTab';
import { LIST_VIEW, CHART_VIEW } from '../utility';
import TotalPrice from '../components/TotalPrice';
import MonthPicker from '../components/MonthPicker';
import CreateBtn from '../components/CreateBtn.js';
import React from 'react';
import { TYPE_INCOME, TYPE_OUTCOME } from '../utility';

const items = [
    {
      "id": 1,
      "title": "Freelance Project",
      "price": 4200,
      "date": "2024-03-15",
      "category": {
        "id": 4,
        "name": "Freelance",
        "type": "income",
        "iconName": "ios-infinite"
      }
    },
    {
      "id": 2,
      "title": "Online Shopping",
      "price": 120,
      "date": "2023-10-25",
      "category": {
        "id": 5,
        "name": "Shopping",
        "type": "outcome",
        "iconName": "ios-cart"
      }
    },
    {
      "id": 3,
      "title": "Movie Night",
      "price": 50,
      "date": "2024-05-02",
      "category": {
        "id": 3,
        "name": "Entertainment",
        "type": "outcome",
        "iconName": "ios-film"
      }
    }
  ]

  class Home extends React.Component {
    render() {
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
            <div className="row mb-5" >
            <img className="banner" src={require('../banner.png')} alt="banner" style={{ width: '100%', height: '400px%', objectFit: 'cover' }} />
            </div>
            <div className="row">
              <div className="col">
                <MonthPicker 
                  year={2024}
                  month={5}
                  onChange={(year, month) => { console.log(year, month) }}
                />
              </div>
              <div className="col">
                <TotalPrice income={totalIncome} outcome={totalOutcome} />
              </div>
            </div>
          </header>
          <div className="content-area py-3 px-3">
            <ViewTab activeTab={LIST_VIEW} onTabChange={(view) => { console.log(view) }} />
            <CreateBtn className="create-btn" onClick={() => { console.log('create button clicked') }} />
            <PriceList
              items={items}
              onModifyItem={(item) => { console.log(item) }}
              onDeleteItem={(item) => { console.log(item) }}
            />
          </div>
        </React.Fragment>
      )
    }
  }
  
export default Home;