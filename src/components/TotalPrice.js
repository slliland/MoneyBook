import React from 'react';
import Ionicon from 'react-ionicons';
import PropTypes from 'prop-types';

const TotalPrice = ({ income, outcome }) => (
  <div className="row text-center">
    <div className="col font-weight-bold">
      <h5>Income: <span>{income}</span></h5>
      <div className="icon-container">
        <Ionicon
          className="rounded-circle"
          fontSize="30px"
          color="#28a745"
          icon="ios-arrow-down"
          data-testid="income-icon"
        />
      </div>
    </div>
    <div className="col font-weight-bold">
      <h5>Outcome: <span>{outcome}</span></h5>
      <div className="icon-container">
        <Ionicon
          className="rounded-circle"
          fontSize="30px"
          color="#dc3545"
          icon="ios-arrow-up"
          data-testid="outcome-icon"
        />
      </div>
    </div>
  </div>
);

TotalPrice.propTypes = {    
  income: PropTypes.number.isRequired,
  outcome: PropTypes.number.isRequired,
};

export default TotalPrice;
