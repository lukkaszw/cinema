import React from 'react';
import { shallow } from 'enzyme';
import ScheduleItem from './ScheduleItem';
import mockedProps from './mockedProps';

let component;

describe('ScheduleItem component', () => {
  describe('rendering' , () => {
    beforeEach(() => {
      component = shallow(<ScheduleItem {...mockedProps} />);
    });
    
    it('renders without crashing', () => {
      expect(component).toBeTruthy();
    });
  
    it('includes ScheduleHeader with proper props', () => {
      const headerEl = component.find('ScheduleHeader');
      expect(headerEl.exists()).toBeTruthy();
  
      const expectedProps = {
        title: mockedProps.title,
        duration: mockedProps.duration,
        categories: mockedProps.categories,
        rate: mockedProps.rate,
      }
      expect(headerEl.props()).toEqual(expectedProps);
    });
  
    it('includes image with proper props', () => {
      const imageEl = component.find('ScheduleImage');
      expect(imageEl.exists()).toBeTruthy();
      const expectedProps = {
        img: mockedProps.img,
        title: mockedProps.title,
      };
      expect(imageEl.props()).toEqual(expectedProps);
  
    });
  
    it('includes ScheduleWeek component', () => {
      const scheduleWeekEl = component.find('ScheduleWeek');
      expect(scheduleWeekEl.exists()).toBeTruthy();
      const instance = component.instance();
      const expectedProps = {
        days: component.state('daysOfWeek'),
        getPrev: instance.getPrevWeek,
        getNext: instance.getNextWeek,
        prevDisabled: true,
        nextDisabled: false,
      };
      expect(scheduleWeekEl.props()).toEqual(expectedProps);
    });
  
    it('includes buttons list', () => {
      const instance = component.instance();
      const expectedProps = {
        buttons: instance.buttons,
        value: instance.state.filter,
        action: instance.setFilter,
      };
      const buttonsListEl = component.find('ButtonsList');
      expect(buttonsListEl.exists()).toBeTruthy();
      expect(buttonsListEl.props()).toEqual(expectedProps);
    });
  });

  describe('user interaction', () => {
    beforeEach(() => {
      component = shallow(<ScheduleItem {...mockedProps} />);
    });

    it('has proper state when user updates weekNr', () => {
      const instance = component.instance();
      //start state
      expect(instance.state.weekNr).toBe(0);

      //user tries to update prev weekNr and nothing should change because 0 is the least nr
      instance.getPrevWeek();
      expect(instance.state.weekNr).toBe(0);

      //user tries to update to next weekNr until the max nr
      for(let i = 1; i <= instance.MAX_WEEK_NR; i++) {
        instance.getNextWeek();
        expect(instance.state.weekNr).toBe(i);
      }

      //user tries to update to next weekNr and nothing should change
      instance.getNextWeek();
      expect(instance.state.weekNr).toBe(instance.MAX_WEEK_NR);

      //user tries to update to prev weekNr until 0 - MIN_WEEK_NR
      for(let i = instance.MAX_WEEK_NR - 1; i >= 0; i--) {
        instance.getPrevWeek();
        expect(instance.state.weekNr).toBe(i);
      }
    });

    it('has proper state when user updates filter', () => {
      const instance = component.instance();
      expect(instance.state.filter).toBe('all');

      //user updates filter to 2d
      instance.setFilter('2d');
      expect(instance.state.filter).toBe('2d');

      //user updates filter to 3d
      instance.setFilter('3d');
      expect(instance.state.filter).toBe('3d');

      //user updates filter to all
      instance.setFilter('all');
      expect(instance.state.filter).toBe('all');
    });
  });
});