import { format } from 'date-fns';

export const getFormattedDate = (date: Date) => {
  return format(date, 'dd LLL yyyy');
};
