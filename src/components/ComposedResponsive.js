import React, { PureComponent } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export default class ComposedResponsive extends PureComponent {
  processChartData = () => {
    const { items, categories, showIncome } = this.props;
    const dataMap = {};

    // Summarize data by category based on income/outcome
    items
      .filter(item => item.category && item.category.type === (showIncome ? 'income' : 'outcome'))
      .forEach(item => {
        const categoryName = categories[item.cid]?.name; // Safely access category name
        if (!categoryName) return; // Skip if no valid category name is found

        if (!dataMap[categoryName]) {
          dataMap[categoryName] = {
            name: categoryName,
            amount: 0,
            price: 0,
          };
        }
        dataMap[categoryName].amount += 1;
        dataMap[categoryName].price += item.price;
      });

    return Object.values(dataMap); // Return array of summarized data
  };

  render() {
    const { title } = this.props;
    const data = this.processChartData();

    // Display message if no data is available
    if (!data || data.length === 0) {
      return <h2 className="text-center">No data available for {title}</h2>;
    }

    return (
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <ComposedChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="price" fill="#8884d8" stroke="#8884d8" />
            <Bar dataKey="price" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="amount" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
