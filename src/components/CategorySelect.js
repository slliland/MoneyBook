import React from "react";
import Ionicon from "react-ionicons";
import PropTypes from "prop-types";

class CategorySelect extends React.Component {
    constructor(props) {
        super(props);
    }
    selectedCategory = (event, category) => {
        this.props.onSelectCategory(category);
        event.preventDefault();
    }

    render() {
        const { categories, selectedCategory } = this.props;
        const selectedCategoryId = selectedCategory && selectedCategory.id;
        return (
            <div className="category-select-component">
                <div className="row">
                    {
                        categories.map((category, index) => {
                            const backColor = (category.id === selectedCategoryId) ? '#007bff' : 'rgb(51,51,51)';
                            const iconColor = (category.id === selectedCategoryId) ? '#fff' : '#555';
                            const activeClassName = (selectedCategoryId === category.id) ? 'category-item col-3 active' : 'category-item col-3';
                            return (
                                <div className={activeClassName} key={index} role="button" onClick={(event) => { this.selectedCategory(event, category); }}>
                                    <Ionicon
                                        className="rounded-circle"
                                        fontSize="50px"
                                        color={iconColor}
                                        icon={category.iconName}
                                        style={{ backgroundColor: backColor, padding: '5px' }}
                                    />
                                    <p>{category.name}</p>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

CategorySelect.propTypes = {
    categories: PropTypes.object.isRequired,
    onSelectCategory: PropTypes.func.isRequired
};

export default CategorySelect;