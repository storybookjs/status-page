import { format } from 'date-fns';

export const getFormattedDate = (date: Date) => {
  return format(date, 'dd-MM-yyyy');
};

export const get90DaysFromToday = () => {
  const result = [];
  const date = new Date();
  for (let i = 0; i < 90; i++) {
    date.setDate(date.getDate() - i);
    result.push(getFormattedDate(date));
  }
  return result;
};
