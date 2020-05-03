import React from 'react';
import { shallow } from 'enzyme';
import ScheduleHeader from './ScheduleHeader';

const mockedProps = {
  title: 'Title',
  duration: 123,
  categories: ['Action', 'Fantasy'],
  rate: 9.2,
}

const component = shallow(<ScheduleHeader {...mockedProps}/>);

describe('ScheduleHeader component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes title with proper text', () => {
    const titleEl = component.find('.title');
    expect(titleEl.exists()).toBeTruthy();
    expect(titleEl.text()).toBe(mockedProps.title);
  });

  it('includes rate with proper text', () => {
    const rateEl = component.find('.rate');
    expect(rateEl.exists()).toBeTruthy();
    expect(rateEl.text()).toBe(`IMDB ${mockedProps.rate}`);
  })

  it('includes description element with proper text', () => {
    const descrEl = component.find('.descr');
    expect(descrEl.exists()).toBeTruthy();
    expect(descrEl.text()).toBe(`${mockedProps.duration} min|${mockedProps.categories.join(' ').toUpperCase()}`)
  });
});