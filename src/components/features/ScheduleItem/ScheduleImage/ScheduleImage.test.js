import React from 'react';
import { shallow } from 'enzyme';
import ScheduleImage from './ScheduleImage';

const mockedProps = {
  img: '/image.jpg',
  title: 'Title',
};

const component = shallow(<ScheduleImage {...mockedProps}/>);

describe('ScheduleImage component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes image', () => {
    const imageEl = component.find('.image');
    expect(imageEl.exists()).toBeTruthy();
    expect(imageEl.prop('src')).toBe(mockedProps.img);
    expect(imageEl.prop('alt')).toBe(mockedProps.title);
  });
});