import React from 'react';
import { shallow } from 'enzyme';
import ScheduleItem from './ScheduleItem';
import mockedProps from './mockedProps';

describe('ScheduleItem - generateFilterBtns method', () => {

  it('runs just after component is mounted', () => {
    const component = shallow(<ScheduleItem {...mockedProps}/>);
    const instance = component.instance();
    jest.spyOn(instance, 'generateFilterBtns');
    instance.componentDidMount();
    expect(instance.generateFilterBtns).toHaveBeenCalledTimes(1);
  });

  it('generates proper buttons and state when 2d, 3d, and for kids values are in filters', () => {
    const expectedBtnsData = [
      { key: 1, value: 'all', title: 'ALL' },
      { key: 2, value: '2d', title: '2D' },
      { key: 3, value: '3d', title: '3D' }
    ];
    const component = shallow(<ScheduleItem {...mockedProps}/>);
    const instance = component.instance();
    expect(instance.buttons).toEqual(expectedBtnsData);
    expect(instance.state.filter).toBe('all');
  });

  it('generate proper buttons and state when only 2d value are in filters', () => {
    const mockedProps2d = {
      ...mockedProps,
      filters: ['2d'],
    }
    const component2d = shallow(<ScheduleItem {...mockedProps2d} />);
    const instance2d = component2d.instance();
    const expectedBtnsData = [
      {
        key: 1, value: '2d', title: '2D' 
      }
    ];
    expect(instance2d.buttons).toEqual(expectedBtnsData);
    expect(instance2d.state.filter).toBe('2d');
  });

  it('generate proper buttons and state when only 3d value are in filters', () => {
    const mockedProps3d = {
      ...mockedProps,
      filters: ['3d'],
    }
    const component3d = shallow(<ScheduleItem {...mockedProps3d} />);
    const instance3d= component3d.instance();
    const expectedBtnsData = [
      {
        key: 1, value: '3d', title: '3D' 
      }
    ];
    expect(instance3d.buttons).toEqual(expectedBtnsData);
    expect(instance3d.state.filter).toBe('3d');
  });
});