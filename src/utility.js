export const LIST_VIEW = 'list';
export const CHART_VIEW = 'chart';
export const TYPE_INCOME = 'income';
export const TYPE_OUTCOME = 'outcome';

// Define the padLeft function
export const padLeft = n => {
    return n < 10 ? '0' + n : n;
}

// range is used in MonthPicker, representing the years and months
export const range = (size, startAt = 0) => {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr[i] = startAt + i;
    }
    return arr;
}

export const parseToYearAndMonth = str => {
    const date = str ? new Date(str) : new Date();
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1
    }
}

export const isValidDate = (input) => {
    // If the input is a Date object, check if it's valid
    if (input instanceof Date && !isNaN(input)) {
      return true;
    }
    
    // If the input is a string, validate its format first
    const reg = /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/;
  
    // If the input doesn't match the YYYY/MM/DD pattern, return false
    if (!reg.test(input)) {
      return false;
    }
  
    // Parse the string into year, month, and day
    const [year, month, day] = input.split('/').map(Number);
  
    // Check if the date is valid using JavaScript's Date object
    const date = new Date(year, month - 1, day);  // month is 0-based in JavaScript Date
  
    // Validate that the constructed date matches the input values
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };
  
  
  

  // Flatten an array into an object
export const flatternArr = (arr) => {
    if (!Array.isArray(arr)) {
      console.error("Expected an array, but got:", arr);
      return {};
    }
    return arr.reduce((map, item) => {
      map[item.id] = item;
      return map;
    }, {});
  };
  
  // Handle single object case
  export const flatternObj = (obj) => {
    if (typeof obj !== 'object' || Array.isArray(obj)) {
      console.error("Expected an object, but got:", obj);
      return {};
    }
    return { [obj.id]: obj };
  };
  
  
  

export const generateID = () => {
    // Generate a random ID using a more readable and reliable approach
    return `_${Math.random().toString(36).substring(2, 12)}`;
}

export const Colors = {
    blue: '#3e95cd',
    red: '#ff6384',
    yellow: '#ffce56',
    green: '#4bc0c0',
    purple: '#9966ff',
    grey: '#c9cbcf',
    darkBlue: '#3e95cd',
    darkRed: '#ff6384',
    darkYellow: '#ffce56',
    darkGreen: '#4bc0c0',
    darkPurple: '#9966ff',
    darkGrey: '#c9cbcf',
  };
  
  export const chartColors = [
    Colors.blue,
    Colors.red,
    Colors.yellow,
    Colors.green,
    Colors.purple,
    Colors.grey,
  ];
  
  export const filterCategoriesByType = (categories, type) => {
    return Object.keys(categories)
      .filter(cid => categories[cid]?.type === type)  // Safely access `categories[cid]`
      .map(cid => categories[cid]);
  };
  
  export const filterItemsByMonth = (items, year, month) => {
    return Object.keys(items)
      .filter(id => {
        const item = items[id];
        return item.date.includes(`${year}-${String(month).padStart(2, '0')}`);
      })
      .map(id => items[id]);
  };
  
  export const calculateTotalPrice = (items, categories, type) => {
    return Object.values(items)
      .filter(item => categories[item.cid]?.type === type)  // Safely access `categories[item.cid]`
      .reduce((total, item) => total + item.price, 0);
  };
  
  export const generateChartData = (items, categories) => {
    const income = calculateTotalPrice(items, categories, TYPE_INCOME);
    const outcome = calculateTotalPrice(items, categories, TYPE_OUTCOME);
    const netIncome = income - outcome;
  
    return {
      netIncome,
      totalIncome: income,
      totalOutcome: outcome,
    };
  };
  
  export const getChartData = (items, categories) => {
    const data = generateChartData(items, categories);
    const { netIncome, totalIncome, totalOutcome } = data;
  
    return {
      labels: ['Income', 'Outcome'],
      datasets: [
        {
          label: 'Net Income',
          data: [totalIncome, totalOutcome],
          backgroundColor: [Colors.green, Colors
            .red],
        },
      ],
    };
  }