import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PriceList from './components/PriceList';
import ViewTab from './components/ViewTab';
import { LIST_VIEW, CHART_VIEW } from './utility';
import TotalPrice from './components/TotalPrice';
import MonthPicker from './components/MonthPicker';

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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <MonthPicker 
        year={2024}
        month={5}
      />
    </div>
  );
}

export default App;
