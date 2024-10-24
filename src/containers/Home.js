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
import Loader from  '../components/Loader';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabView: LIST_VIEW,
    };
  }

  componentDidMount() {
    this.props.actions.getInitialData().then(items => {
      console.log('Home component:', items);
    }
    );
  };

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
    this.props.actions.selectNewMonth(year, month);
  };

  modifyItem = (item) => {
    this.props.navigate(`/edit/${item.id}`);
  };

  deleteItem = (deletedItem) => {
    this.props.actions.deleteItem(deletedItem); 
  };

  createItem = () => {
    this.props.navigate('/create');
  };

  render() {
    const { items, categories, currentDate, isLoading } = this.props.data;
    const { tabView } = this.state;

    let totalIncome = 0, totalOutcome = 0;

    const itemsWithCategory = Object.values(items) // Convert object to array
      .map(item => ({
        ...item,
        category: categories[item.cid],
      }))

    itemsWithCategory.forEach(item => {
      if (item.category.type === 'income') {
        totalIncome += item.price;
      } else if (item.category.type === 'outcome') {
        totalOutcome += item.price;
      }
    });

    const hasNoData = itemsWithCategory.length === 0;

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
          {isLoading && <Loader />}
          {!isLoading &&
          <React.Fragment>
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
              hasNoData ? (
                <div className="no-data-message">
                  No data available for this period, start recording your expenses now.
                </div>
              ) : (
                <PriceList
                  items={itemsWithCategory}
                  onModifyItem={this.modifyItem}
                  onDeleteItem={this.deleteItem}
                />
              )
            )}
            {tabView === CHART_VIEW && (
              hasNoData ? (
                <div className="no-data-message">
                  No chart data available for this period, start recording your expenses now.
                </div>
              ) : (
                <h1>Chart</h1>
              )
            )}
          </React.Fragment>
          }
        </div>
      </React.Fragment>
    );
  }
}

export default WithContext(withNavigate(Home));
