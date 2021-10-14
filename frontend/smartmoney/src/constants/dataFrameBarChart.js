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
  ],
};
