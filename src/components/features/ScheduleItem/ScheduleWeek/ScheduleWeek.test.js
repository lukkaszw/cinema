import React from 'react';
import { shallow } from 'enzyme';
import { faLongArrowAltLeft, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { ScheduleWeek } from './ScheduleWeek';

const mockedProps = {
  days: [
    {
      inWeek: 1,
      day: 'Mon',
      dayNr: 1,
      month: 'Jan',
    },
    {
      inWeek: 2,
      day: 'Tue',
      dayNr: 2,
      month: 'Jan',
    },
    {
      inWeek: 3,
      day: 'Wed',
      dayNr: 3,
      month: 'Jan',
    },
    {
      inWeek: 4,
      day: 'Thu',
      dayNr: 4,
      month: 'Jan',
    },
    {
      inWeek: 5,
      day: 'Fri',
      dayNr: 5,
      month: 'Jan',
    
    },
    {
      inWeek: 6,
      day: 'Sat',
      dayNr: 6,
      month: 'Jan',
    },
    {
      inWeek: 0,
      day: 'Sun',
      dayNr: 7,
      month: 'Jan',
    },
  ],
  getNext: () => {},
  getPrev: () => {},
  prevDisabled: false,
  nextDisabled: false,
};


const component = shallow(<ScheduleWeek {...mockedProps}/>);

describe('ScheduleWeek component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes list of days', () => {
    const listEl = component.find('.dayList');
    expect(listEl.exists()).toBeTruthy();
  });

  it('includes 7 ScheduleDay elements with proper data', () => {
    const scheduleDayEl = component.find('Memo(ScheduleDay)');
    expect(scheduleDayEl.length).toBe(7);
    scheduleDayEl.forEach((dayEl, index) => {
      expect(dayEl.props()).toEqual({...mockedProps.days[index]});
    });
  });

  it('includes buttons left and right', () => {
    const btnsEl = component.find('.buttons Memo(IconButton)');
    expect(btnsEl.exists()).toBeTruthy();
    expect(btnsEl.at(0).prop('icon')).toEqual(faLongArrowAltLeft);
    expect(btnsEl.at(1).prop('icon')).toEqual(faLongArrowAltRight);
    expect(btnsEl.at(0).prop('action')).toBe(mockedProps.getPrev);
    expect(btnsEl.at(1).prop('action')).toBe(mockedProps.getNext);
    expect(btnsEl.at(0).prop('disabled')).toBe(mockedProps.prevDisabled);
    expect(btnsEl.at(1).prop('disabled')).toBe(mockedProps.nextDisabled);
  });
});