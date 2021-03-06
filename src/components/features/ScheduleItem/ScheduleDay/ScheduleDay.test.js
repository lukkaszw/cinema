import React from 'react';
import { shallow } from 'enzyme';
import ScheduleDay from './ScheduleDay';

const mockedProps = {
  inWeek: 2,
  day: 'Tue',
  dayNr: 2,
  month: 'Jan',
  monthNr: 1,
  shows: [
    {
      _id: '1',
      startAt: '15:00',
    },
    {
      _id: '2',
      startAt: '17:00',
    }
  ],
  isToday: false,
  isBefore: false,
};

const component = shallow(<ScheduleDay {...mockedProps} />);

describe('ScheduleDay component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes proper name of the day', () => {
    const dayNameEl = component.find('.name');
    expect(dayNameEl.exists()).toBeTruthy();
    expect(dayNameEl.text()).toBe(mockedProps.day);
  });

  it('includes proper day number', () => {
    const dayNrEl = component.find('.dayNr');
    expect(dayNrEl.exists()).toBeTruthy();
    expect(dayNrEl.text()).toBe(mockedProps.dayNr.toString());
  });

  it('includes proper month', () => {
    const monthEl = component.find('.month');
    expect(monthEl.exists()).toBeTruthy();
    expect(monthEl.text()).toBe(mockedProps.month);
  });

  it('has class active only if rendered day is today', () => {
    expect(component.find('.active').exists()).toBeFalsy();
    const todayDayProps = {
      ...mockedProps,
      isBefore: false,
      isToday: true,
    };
    const componentWithTodayDate = shallow(<ScheduleDay {...todayDayProps}/>);
    expect(componentWithTodayDate.find('.active').exists()).toBeTruthy();
  });

  it(`renders ${mockedProps.shows.length} links to schedule pages`, () => {
    const linksEl = component.find('ScheduleLink');
    expect(linksEl.length).toBe(mockedProps.shows.length);
    linksEl.forEach((link, i) => {
      expect(link.props()).toEqual({
        hour: mockedProps.shows[i].startAt,
        isBefore: mockedProps.isBefore,
        isToday: mockedProps.isToday,
        showId: mockedProps.shows[i]._id,
      });
    });
  });
});