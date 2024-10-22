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

export const isValidDate = dateStr => {
    const reg = /^\d{4}-(0[1-9]|1[0-2])-\d{2}$/;
    return reg.test(dateStr);
}

export const flatternArr = arr => {
    // Use the reduce method to convert the array to an object
    return arr.reduce((map, item) => {
        map[item.id] = item;
        return map;
    }, {});
};
