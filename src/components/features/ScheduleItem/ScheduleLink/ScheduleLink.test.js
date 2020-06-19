import React from 'react';
import { shallow } from 'enzyme';
import ScheduleLink from './ScheduleLink';

const mockedProps = {
  showId: '123',
  hour: '22:30',
  isBefore: false,
  isToday: false,
};

const componentActive = shallow(<ScheduleLink {...mockedProps} />);
let componentBefore;
let componentTodayActive;
let componentTodayInactive;

describe('ScheduleLink component', () => {

  it('renders without crashing', () => {
    expect(componentActive).toBeTruthy();

  });

  it('renders Link with proper link to page and text', () => {
    const linkEl = componentActive.find('Link');
    expect(linkEl.length).toBe(1);
    expect(linkEl.text()).toBe(mockedProps.hour);
    expect(linkEl.prop('to')).toBe(`/schedule/123`);
  });

  it('renders li element with proper classes', () => {
    const propsBefore = { ...mockedProps, isBefore: true };

    const date = new Date();
    const lastInactiveHour = `${date.getUTCHours() + 3}:${date.getUTCMinutes() - 1}`;
    const firstActiveHour = `${date.getUTCHours() + 3}:${date.getUTCMinutes()}`;

    const propsTodayInactive = {
      ...mockedProps,
      isBefore: false,
      isToday: true,
      hour: lastInactiveHour,
    };

    const propsTodayActive = { ...propsTodayInactive, hour: firstActiveHour };

    
  componentBefore = shallow(<ScheduleLink {...propsBefore}/>);
  componentTodayInactive = shallow(<ScheduleLink {...propsTodayInactive} />);
  componentTodayActive = shallow(<ScheduleLink {...propsTodayActive} />);


    expect(componentActive.find('li').prop('className')).toBe('root');
    expect(componentBefore.find('li').prop('className')).toBe('root inactive');
    expect(componentTodayInactive.find('li').prop('className')).toBe('root inactive');
    expect(componentTodayActive.find('li').prop('className')).toBe('root');
  });
});