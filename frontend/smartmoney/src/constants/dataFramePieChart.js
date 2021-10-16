import {colors} from './colors';
import {colorsLessOpacity} from './colorsLessOpacity';

export const dataFramePieChart = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: colorsLessOpacity,
      borderColor: colors,
      borderWidth: 1,
    },
  ],
};
