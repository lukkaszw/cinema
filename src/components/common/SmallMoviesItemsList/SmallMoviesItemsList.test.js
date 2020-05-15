import React from 'react';
import { shallow } from 'enzyme';
import SmallMoviesItemsList from './SmallMoviesItemsList';
const mockedProps = {
  movies: [
    {
      _id: '1',
      title: 'Title 1',
      smallImg: 'image-1.jpg',
      played: 'current',
    },
    {
      _id: '2',
      title: 'Title 2',
      smallImg: 'image-2.jpg',
      played: 'soon',    
    }
  ],
  closeAction: () => console.log('close action'),
};

const component = shallow(<SmallMoviesItemsList {...mockedProps}/>);

describe('SmallMoviesItemsList component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it(`renders ${mockedProps.movies.length} SmallMoviesItems with proper props`, () => {
    const smallMovieItemEl = component.find('SmallMovieItem');
    expect(smallMovieItemEl.length).toBe(mockedProps.movies.length);
    smallMovieItemEl.forEach((item, i) => {
      expect(item.props()).toEqual({...mockedProps.movies[i], closeAction: mockedProps.closeAction });
    });
  });
});