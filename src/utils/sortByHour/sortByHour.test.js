import sortByHour from './sortByHour';

describe('sortByHour - function to sort shows', () => {
  it('sort shows properly', () => {
    const mockedArgs1 = [{ startAt: '01:00'}, { startAt: '00:00'}];
    sortByHour(mockedArgs1);
    expect(mockedArgs1).toEqual([{ startAt: '00:00'}, { startAt: '01:00'}]);

    const mockedArgs2 = [{ startAt: '00:01'}, { startAt: '00:00'}];
    sortByHour(mockedArgs2);
    expect(mockedArgs2).toEqual([{ startAt: '00:00'}, { startAt: '00:01'}]);

    const mockedArgs3 = [{startAt: '17:00'}, {startAt: '13:22'}, {startAt: '00:00'}, { startAt: '22:32'}, { startAt: '22:31'}];
    sortByHour(mockedArgs3);
    expect(mockedArgs3).toEqual([{ startAt: '00:00'}, {startAt: '13:22'}, {startAt: '17:00'}, { startAt: '22:31'}, { startAt: '22:32'}]);
  });
});