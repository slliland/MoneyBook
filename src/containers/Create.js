import React from "react";
import PropTypes from "prop-types";
import '../App.css';
import '../styles/Create.css'; // Add your custom CSS here
import 'bootstrap/dist/css/bootstrap.min.css';
import CategorySelect from "../components/CategorySelect";
import PriceForm from "../components/PriceForm";
import { testCategories } from '../testData';  // Import the JSON file
import { Tabs, Tab } from '../components/Tabs';
import { AppContext } from '../App';
import WithContext from '../WithContext';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategoryId: null,
      categories: testCategories, // Load the categories from the JSON file
      type: 'outcome' // or 'income' based on the tab selected
    };
  }

  handleTabChange = (index) => {
    const type = index === 0 ? 'income' : 'outcome';
    this.setState({ type });
  }

  handleCategorySelect = (category) => {
    this.setState({ selectedCategoryId: category.id });
  }

  render() {
    const { data } = this.props;
    const { categories, type, selectedCategoryId } = this.state;
    // Filter categories by income or outcome based on the selected tab
    const filteredCategories = Object.values(categories).filter(cat => cat.type === type);
    
    return (
      <div className="create-page container mt-5 py-4 px-3 rounded">
        <h2 className="text-center mb-4">Create a New Record</h2>
        <Tabs activeIndex={0} onTabChange={this.handleTabChange}>
          <Tab>Income</Tab>
          <Tab>Outcome</Tab>
        </Tabs>

        {/* Pass filtered categories to CategorySelect */}
        <CategorySelect
          categories={filteredCategories}
          onSelectCategory={this.handleCategorySelect}
          selectedCategory={categories[selectedCategoryId]}
        />

        <PriceForm onFormSubmit={() => {}} onCancelSubmit={() => {}} />
      </div>
    );
  }
}

export default WithContext(Create);
