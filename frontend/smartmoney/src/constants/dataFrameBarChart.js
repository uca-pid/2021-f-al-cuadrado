import {colors} from './colors';
import {colorsLessOpacity} from './colorsLessOpacity';

export let dataFrameBarChart = {
  labels: [],
  datasets: [
    {
      label: 'Amount expended',
      data: [],
      backgroundColor: colorsLessOpacity,
      borderColor: colors,
      borderWidth: 1,
    },
    {
      label: 'Budget total',
      data: [],
      backgroundColor: colorsLessOpacity,
      borderColor: colors,
      borderWidth: 1,
    },
  ],
};
export let dataFrameBarChartBudget = {
  labels: [],
  datasets: [
    {
      label: 'Budget total',
      data: [],
      backgroundColor: colorsLessOpacity,
      borderColor: colors,
      borderWidth: 1,
    },
  ],
};
export let dataFrameBarChartExpenses = {
  labels: [],
  datasets: [
    {
      label: 'Amount expended',
      data: [],
      backgroundColor: colorsLessOpacity,
      borderColor: colors,
      borderWidth: 1,
    }
  ],
};
