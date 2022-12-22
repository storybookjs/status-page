import { format } from 'date-fns';

export const getFormattedDate = (date: Date | string, short?: boolean) => {
  return format(typeof date === 'string' ? new Date(date) : date, short ? 'MMM. do' : 'yyyy-MM-dd');
};

export function range(from: number, to: number) {
  return Array.from(
    (function* () {
      for (let i = from; i < to; i++) yield i;
    })()
  );
}
