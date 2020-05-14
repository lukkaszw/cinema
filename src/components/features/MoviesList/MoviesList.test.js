import React from 'react';
import { shallow } from 'enzyme';
import MoviesList from './MoviesList';

const mockedProps = {
  movies: [
    {
      _id: '1',
      title: 'Title 1',
      details: {
        rating: 5.7,
        language: 'English',
        direction: 'Director 1',
      },
      smallImg: 'image-1.jpg',
      categories: ['Horror'],
      filters: ['2d', '3d'],
      duration: 124,
      played: 'current',
    },
    {
      _id: '2',
      title: 'Title 2',
      details: {
        language: 'Russian',
        direction: 'Director 2',
      },
      smallImg: 'image-2.jpg',
      categories: ['Comedy'],
      played: 'soon',
    },
  ],
};

const component = shallow(<MoviesList {...mockedProps} />);


describe('MoviesList component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes list of movie list items', () => {
    const listEl = component.find('.list');
    expect(listEl.exists()).toBeTruthy();
  });

  it(`includes ${mockedProps.movies.length} movie list items with proper props`, () => {
    const movieItemEl = component.find('MovieListItem');
    expect(movieItemEl.length).toBe(mockedProps.movies.length);
    movieItemEl.forEach((el, i) => {
      expect(el.props()).toEqual(mockedProps.movies[i]);
    })
  });
}); 