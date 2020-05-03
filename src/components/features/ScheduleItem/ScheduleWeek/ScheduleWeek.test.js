import React from 'react';
import { shallow } from 'enzyme';
import { faLongArrowAltLeft, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import ScheduleWeek from './ScheduleWeek';
import mockedProps from './mockedProps';


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
    const scheduleDayEl = component.find('ScheduleDay');
    expect(scheduleDayEl.length).toBe(7);
    scheduleDayEl.forEach((dayEl, index) => {
      expect(dayEl.props()).toEqual({...mockedProps.days[index], shows: []});
    });
  });

  it('includes buttons left and right', () => {
    const btnsEl = component.find('.buttons IconButton');
    expect(btnsEl.exists()).toBeTruthy();
    expect(btnsEl.at(0).prop('icon')).toEqual(faLongArrowAltLeft);
    expect(btnsEl.at(1).prop('icon')).toEqual(faLongArrowAltRight);
    expect(btnsEl.at(0).prop('action')).toBe(mockedProps.getPrev);
    expect(btnsEl.at(1).prop('action')).toBe(mockedProps.getNext);
    expect(btnsEl.at(0).prop('disabled')).toBe(mockedProps.prevDisabled);
    expect(btnsEl.at(1).prop('disabled')).toBe(mockedProps.nextDisabled);
  });
});