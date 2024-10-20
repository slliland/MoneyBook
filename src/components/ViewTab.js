import React from 'react';
import Ionicon from 'react-ionicons';
import PropTypes from 'prop-types';
import './ViewTab.module.css';
import { LIST_VIEW, CHART_VIEW } from '../utility'; 


const generateLinkClass = (current, view) => {
  return current === view ? 'nav-link active' : 'nav-link';
};

const ViewTab = ({ activeTab, onTabChange }) => (
  <ul className="nav nav-tabs nav-fill my-4">
    <li className="nav-item">
      <a
        className={generateLinkClass(activeTab, 'list')}
        href="#"
        onClick={(event) => { event.preventDefault(); onTabChange(LIST_VIEW); }}
      >
        <Ionicon
          className="rounded-circle mr-2"
          fontSize="25px"
          color={activeTab === 'list' ? '#007bff' : '#000'}
          icon="ios-paper"
        />
        List Mode
      </a>
    </li>
    <li className="nav-item">
      <a
        className={generateLinkClass(activeTab, 'chart')}
        href="#"
        onClick={(event) => { event.preventDefault(); onTabChange(CHART_VIEW); }}
      >
        <Ionicon
          className="rounded-circle mr-2"
          fontSize="25px"
          color={activeTab === 'chart' ? '#61045F' : '#000'}
          icon="ios-pie"
        />
        Chart Mode
      </a>
    </li>
  </ul>
);

ViewTab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default ViewTab;
