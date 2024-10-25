import React from "react";
import PropTypes from "prop-types";
import { isValidDate } from "../utility";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/PriceForm.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

class PriceForm extends React.Component {
    static propTypes = {
      onFormSubmit: PropTypes.func.isRequired,
      onCancelSubmit: PropTypes.func.isRequired,
      item: PropTypes.object,
    };
      
    static defaultProps = {
      item: {},
    };
      
    state = {
      validatePass: true,
      errorMessage: "",
      date: this.props.item.date ? new Date(this.props.item.date + 'T00:00:00') : new Date(), // Ensure date is treated as local
    };
      
    handleDateChange = (date) => {
      this.setState({ date });
    };
  
    submitForm = (event) => {
      const { item, onFormSubmit } = this.props;
      const editMode = !!item.id;
      const price = this.priceInput.value.trim() * 1;
      const { date } = this.state; // Get the date from the state
      const title = this.titleInput.value.trim();
  
      let errorMessages = [];
  
      // Check for each field
      if (!title) {
        errorMessages.push("Title is required");
      }
      if (!price) {
        errorMessages.push("Price is required");
      } else if (price < 0) {
        errorMessages.push("Price must be greater than 0");
      }
      if (!isValidDate(date)) {
        errorMessages.push("Please enter a valid date");
      }
  
      // If there are any error messages, stop form submission
      if (errorMessages.length > 0) {
        this.setState({
          validatePass: false,
          errorMessage: errorMessages.join(". "),
        });
      } else {
        this.setState({
          validatePass: true,
          errorMessage: "",
        });
        
        // Correctly format the date (YYYY-MM-DD) to avoid timezone shift
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit month
        const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
        const formattedDate = `${year}-${month}-${day}`; // Format as YYYY-MM-DD
  
        if (editMode) {
          onFormSubmit({ ...item, title, price, date: formattedDate }, editMode);
        } else {
          onFormSubmit({ title, price, date: formattedDate }, editMode);
        }
      }
      event.preventDefault();
    };
  
    render() {
      const { title, price } = this.props.item;
      const { validatePass, errorMessage, date } = this.state;
      
      return (
        <form onSubmit={this.submitForm}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              className={`form-control ${!validatePass && !title ? 'is-invalid' : ''}`}
              id="title"
              placeholder="Please enter the title"
              defaultValue={title}
              ref={(input) => { this.titleInput = input; }}
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="price">Price *</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input
                type="number"
                className={`form-control ${!validatePass && (!price || price < 0) ? 'is-invalid' : ''}`}
                id="price"
                placeholder="Please enter the price"
                defaultValue={price}
                ref={(input) => { this.priceInput = input; }}
              />
            </div>
          </div>
  
          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <DatePicker
              selected={date}
              onChange={this.handleDateChange}
              className={`form-control ${!validatePass && !isValidDate(date) ? 'is-invalid' : ''}`}
              id="date"
              dateFormat="yyyy/MM/dd"
              placeholderText="Please select a date"
            />
          </div>
  
          <div className="form-group">
            <button type="submit" className="btn btn-primary mr-3">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.props.onCancelSubmit}
            >
              Cancel
            </button>
          </div>
  
          {!validatePass && (
            <div className="alert alert-danger mt-3" role="alert">
              {errorMessage}
            </div>
          )}
        </form>
      );
    }
  }
  

export default PriceForm;
