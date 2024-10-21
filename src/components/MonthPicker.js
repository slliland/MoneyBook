import React from "react";
import PropTypes from "prop-types";
import { padLeft, range } from "../utility";

class MonthPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            selectedYear: this.props.year,
            selectedMonth: this.props.month
        };
        this.dropdownRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener("click", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)) {
            this.closeDropdown();
        }
    };

    toggleDropdown = (event) => {
        event.preventDefault();
        this.setState((prevState) => ({
            isOpen: !prevState.isOpen
        }));
    }

    closeDropdown = () => {
        this.setState({ isOpen: false });
    }

    handleSelection = (event, key, value) => {
        event.preventDefault();
        this.setState({ [key]: value }, () => {
            if (key === "selectedMonth") {
                this.setState({ isOpen: false });
                this.props.onChange(this.state.selectedYear, value);
            }
        });
    }

    render() {
        const { year, month } = this.props;
        const { selectedYear, selectedMonth, isOpen } = this.state;
        const years = range(9, -4).map((number) => number + year);
        const months = range(12, 1);

        return (
            <div className="month-picker-component" ref={this.dropdownRef}>
                <h4>Select Month</h4>
                <div className="btn-group" style={{ display: 'block' }}>
                    <button
                    className="btn btn-primary dropdown-toggle"
                    onClick={this.toggleDropdown}
                    style={{ fontSize: '1rem', padding: '5px 30px' }}  // Add inline styles for bigger size
                    >
                    {`${selectedYear} - ${padLeft(selectedMonth)}`}
                    </button>

                    {isOpen && (
                        <div className="dropdown-menu" style={{ display: 'block' }}>
                            <div className="row">
                                <div className="col border-right">
                                    {years.map((yearNumber, index) => (
                                        <a
                                            key={index}
                                            href="#"
                                            onClick={(event) => this.handleSelection(event, 'selectedYear', yearNumber)}
                                            className={yearNumber === selectedYear ? "dropdown-item active" : "dropdown-item"}
                                        >
                                            {yearNumber}
                                        </a>
                                    ))}
                                </div>
                                <div className="col">
                                    {months.map((monthNumber, index) => (
                                        <a
                                            key={index}
                                            href="#"
                                            onClick={(event) => this.handleSelection(event, 'selectedMonth', monthNumber)}
                                            className={monthNumber === selectedMonth ? "dropdown-item active" : "dropdown-item"}
                                        >
                                            {padLeft(monthNumber)}
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
    onChange: PropTypes.func.isRequired
};

export default MonthPicker;
