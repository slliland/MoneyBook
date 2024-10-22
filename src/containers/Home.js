import React from 'react';
import Ionicon from 'react-ionicons';
import { LIST_VIEW, CHART_VIEW, padLeft } from '../utility';
import TotalPrice from '../components/TotalPrice';
import MonthPicker from '../components/MonthPicker';
import CreateBtn from '../components/CreateBtn.js';
import PriceList from '../components/PriceList';
import { Tabs, Tab } from '../components/Tabs';
import "../styles/Home.css";
import withNavigate from '../withNavigate';
import WithContext from '../WithContext';
import { parseToYearAndMonth } from '../utility';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: parseToYearAndMonth(),
      tabView: LIST_VIEW,
    };
  }

  scrollToContent = () => {
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
      contentArea.scrollIntoView({ behavior: 'smooth' });
    }
  };

  changeView = (viewIndex) => {
    const tabView = viewIndex === 0 ? LIST_VIEW : CHART_VIEW;
    this.setState({ tabView });
  };

  changeDate = (year, month) => {
    this.setState({ currentDate: { year, month } });
  };

  modifyItem = (item) => {
    this.props.navigate(`/edit/${item.id}`);
  };

  deleteItem = (deletedItem) => {
    this.props.actions.deleteItem(deletedItem); // Use the deleteItem action from context
  };

  createItem = () => {
    this.props.navigate('/create');
  };

  render() {
    const { data } = this.props; // Get data from context
    const { items = [], categories } = data;
    const { currentDate, tabView } = this.state;

    let totalIncome = 0, totalOutcome = 0;

    const itemsWithCategory = items
      .map(item => ({
        ...item,
        category: categories[item.cid],
      }))
      .filter(item => item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`));

    itemsWithCategory.forEach(item => {
      if (item.category.type === 'income') {
        totalIncome += item.price;
      } else if (item.category.type === 'outcome') {
        totalOutcome += item.price;
      }
    });

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
    );
  }
}

export default WithContext(withNavigate(Home));
