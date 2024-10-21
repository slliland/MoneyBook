import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PriceList from './components/PriceList';
import ViewTab from './components/ViewTab';
import { LIST_VIEW, CHART_VIEW } from './utility';
import TotalPrice from './components/TotalPrice';
import MonthPicker from './components/MonthPicker';
import Home from './containers/Home';



function App() {
  return (
    <div className="App">
      <Home />
      {/* <MonthPicker 
        year={2024}
        month={5}
        onChange={(year, month) => { console.log(year, month) }}
      /> */}
    </div>
  );
}

export default App;
