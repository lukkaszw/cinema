import React from 'react';
import { shallow } from 'enzyme';
import ScheduleItem from './ScheduleItem';
import { mockedProps } from './SheduleItem.test';

let component;

const realDate = Date;
const mockDate = customDate => class extends Date {
  constructor(...args) {
    if(args.length){
      super(...args);
    } else {
      super(customDate);
    }
    return this;
  }
  static now(){
    return (new Date(customDate)).getTime();
  }
};

const expectedDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const checkDay = (chosenMonth, chosenDay, expectedDaysNr, expectedMonths, weekNr = 0, filter) => {
  global.Date = mockDate(`${chosenMonth} ${chosenDay} 2020 10:00:00 GMT+0200`);

  component = shallow(<ScheduleItem {...mockedProps} />);
  const instance = component.instance();
  instance.setState({
    weekNr,
  });

  let expectedShows = mockedProps.shows
  .filter(show => expectedDaysNr.includes(show.day));

  if(filter) {
    instance.setState({
      filter,
    });

    expectedShows = expectedShows.filter(show => show.category === filter);
  }

  expectedShows = expectedShows.map(show => [{ _id: show._id, startAt: show.startAt }]);
  const indexOfChosenDay = expectedDaysNr.findIndex(day => day === chosenDay);

  instance.state.daysOfWeek.forEach((day, index) => {
    const dayNr = expectedDaysNr[index];

    expect(day).toEqual({
      day: expectedDays[index],
      dayNr: dayNr,
      month: (typeof expectedMonths === 'string') ? expectedMonths : expectedMonths[index],
      isBefore: index < indexOfChosenDay,
      isToday: index === indexOfChosenDay,
      shows: expectedShows.find((show, i) => show[0]._id === dayNr.toString()) || [],
    });
  });

  global.Date = realDate;
}

describe('ScheduleItem - generateWeek method', () => {

  it('runs just after component is mounted', () => {
    component = shallow(<ScheduleItem {...mockedProps} />);
    const instance = component.instance();
    jest.spyOn(instance, 'generateWeek');
    instance.componentDidMount();
    expect(instance.generateWeek).toHaveBeenCalledTimes(1);
  });

  it('runs after weekNr is updated', () => {
    component = shallow(<ScheduleItem {...mockedProps} />);
    const instance = component.instance();
    jest.spyOn(instance, 'generateWeek');
    instance.getNextWeek();
    expect(instance.generateWeek).toHaveBeenCalledTimes(1);
    instance.getPrevWeek();
    expect(instance.generateWeek).toHaveBeenCalledTimes(2);
  });

  it('runs after weekNr is updated', () => {
    component = shallow(<ScheduleItem {...mockedProps} />);
    const instance = component.instance();
    jest.spyOn(instance, 'generateWeek');
    instance.setFilter('2d');
    expect(instance.generateWeek).toHaveBeenCalledTimes(1);
    instance.setFilter('3d');
    expect(instance.generateWeek).toHaveBeenCalledTimes(2);
    instance.setFilter('all');
    expect(instance.generateWeek).toHaveBeenCalledTimes(3);
  });

  it('generates proper data for week at start', () => {
    checkDay('May', 17, [11, 12, 13, 14, 15, 16, 17], 'May');
    checkDay('July', 3, [29, 30, 1, 2, 3, 4, 5], ['June', 'June', 'Jul', 'Jul', 'Jul', 'Jul', 'Jul']);  
    checkDay('January', 1, [30, 31, 1, 2, 3, 4, 5], ['Dec', 'Dec', 'Jan', 'Jan', 'Jan', 'Jan', 'Jan']); 
    checkDay('December', 31, [28, 29, 30, 31, 1, 2, 3], ['Dec', 'Dec', 'Dec', 'Dec', 'Jan', 'Jan', 'Jan']);
  });

  it('generates proper data for week if user changed filter', () => {
    checkDay('September', 22, [21, 22, 23, 24, 25, 26, 27], 'Sept', 0, '2d');
    checkDay('September', 22, [21, 22, 23, 24, 25, 26, 27], 'Sept', 0, '3d');
  });

  it('generates proper data for week if user changed weekNr', () => {
    checkDay('March', 6, [2, 3, 4, 5, 6, 7, 8], 'Mar');
    checkDay('March', 6, [9, 10, 11, 12, 13, 14, 15], 'Mar', 1);
    checkDay('March', 6, [16, 17, 18, 19, 20, 21, 22], 'Mar', 2);
    checkDay('March', 6, [23, 24, 25, 26, 27, 28, 29], 'Mar', 3);

    checkDay('October', 30, [26, 27, 28, 29, 30, 31, 1], ['Oct', 'Oct', 'Oct', 'Oct', 'Oct', 'Oct', 'Nov'], 0);
    checkDay('October', 30, [2, 3, 4, 5, 6, 7, 8], 'Nov', 1);
    checkDay('October', 30, [9, 10, 11, 12, 13, 14, 15], 'Nov', 2);
    checkDay('October', 30, [16, 17, 18, 19, 20, 21, 22], 'Nov', 3);
  });
});