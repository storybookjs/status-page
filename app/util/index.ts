import { format } from 'date-fns';

export const getFormattedDate = (date: Date | string) => {
  return format(typeof date === 'string' ? new Date(date) : date, 'dd LLL yyyy');
};
