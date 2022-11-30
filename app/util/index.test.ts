import { getFormattedDate } from './index';

describe('getFormattedDate', () => {
  it('should return formatted date', () => {
    expect(getFormattedDate('2022-11-25')).toBe('25 Nov 2022');
  });

  it('should return formatted date', () => {
    const TODAY = new Date(1669383837565);
    expect(getFormattedDate(new Date(TODAY))).toBe('25 Nov 2022');
  });
});
