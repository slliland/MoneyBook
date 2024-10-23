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
  
  
  

export const flatternArr = arr => {
    // Use the reduce method to convert the array to an object
    return arr.reduce((map, item) => {
        map[item.id] = item;
        return map;
    }, {});
};

export const generateID = () => {
    // Generate a random ID using a more readable and reliable approach
    return `_${Math.random().toString(36).substring(2, 12)}`;
}
