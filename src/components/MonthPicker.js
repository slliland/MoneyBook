import React from "react";
import PropTypes from "prop-types";
import { padLeft, range } from "../utility";

class MonthPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    toggleDropdown = (event) => {  
        event.preventDefault();
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    closeDropdown = () => {
        this.setState({ isOpen: false });
    }

    render() {
        const { year, month } = this.props;
        const { isOpen } = this.state;
        const years = range(9, -4).map(number => number + year);
        const months = range(12, 1);

        return (
            <div className="month-picker-component">
                <h4>Select Month</h4>
                <div className="btn-group" style={{ display: 'block' }}>
                    <button
                        className="btn btn-lg btn-secondary dropdown-toggle"
                        onClick={this.toggleDropdown}
                    >
                        {`${year} - ${padLeft(month)}`}
                    </button>  
                    {isOpen && (
                        <div className="dropdown-menu show" style={{ display: 'block', position: 'relative !important', margin: '47px -264px 0 !important' }}>
                            <div className="row">
                                <div className="col border-right">
                                    {years.map((yearNumber, index) => (
                                        <a
                                            key={index}
                                            className="dropdown-item"
                                            onClick={() => { this.props.onYearChange(yearNumber); this.closeDropdown(); }}
                                        >
                                            {yearNumber} Year
                                        </a>
                                    ))}
                                </div>
                                <div className="col">
                                    {months.map((monthNumber, index) => (
                                        <a
                                            key={index}
                                            className="dropdown-item"
                                            onClick={() => { this.props.onMonthChange(monthNumber); this.closeDropdown(); }}
                                        >
                                            {padLeft(monthNumber)} Month
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div> 
        );
    }
}

MonthPicker.propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    onYearChange: PropTypes.func.isRequired,
    onMonthChange: PropTypes.func.isRequired
};

export default MonthPicker;
