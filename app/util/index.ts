export const get90DaysFromToday = () => {
  const result = [];
  for (let i = 0; i < 90; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    result.push(date.toISOString().split('T')[0]);
  }
  return result;
};
