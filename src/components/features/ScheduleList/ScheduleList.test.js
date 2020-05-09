import React from 'react';
import { shallow } from 'enzyme';
import ScheduleList from './ScheduleList';

const mockedProps = {
  movies: [
    {
      _id: '1',
      title: 'Title 1',
      duration: 123,
      filters: ['2d', '3d'], 
      categories: ['Comedy', 'Sci-Fi'],
      rate: 6.5,
      img: 'image-1.jpg',
      shows: [],
    },
    {
      _id: '2',
      title: 'Title 2',
      duration: 100,
      filters: ['2d'], 
      categories: ['Thriller'],
      rate: 5.7,
      img: 'image-2.jpg',
      shows: [],
    }
  ],
};

const component = shallow(<ScheduleList {...mockedProps}/>);

describe('ScheduleList component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it(`includes list with ${mockedProps.movies.length} ScheduleItems`, () => {
    const scheduleItemsEl = component.find('ScheduleItem');
    expect(scheduleItemsEl.length).toBe(mockedProps.movies.length);
  });
});