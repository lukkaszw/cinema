import React from 'react';
import { shallow } from 'enzyme';
import ComingFilms from './ComingFilms';

const mockedPropsWhenLoading = {
  isLoading: true,
  fetchMovies: jest.fn(),
};

const mockedPropsWhithData = {
  isLoading: false,
  movies: [
    {
      id: '1',
      title: 'Title test 1',
      duration: 120,
      categories: ['Action', 'Drama'],
      image: '/images/carts/image-test.jpg',
    },
    {
      id: '2',
      title: 'Title test 2',
      duration: 116,
      categories: ['Adventure'],
      image: '/images/carts/image-test2.jpg',
    },
  ],
  fetchMovies: jest.fn(),
};

const componentWhenLoading = shallow(<ComingFilms {...mockedPropsWhenLoading}/>);
const componentWithData = shallow(<ComingFilms {...mockedPropsWhithData}/>);

const expectedErrorText = "No comming soon movies were found. Please come back later for more information.";

describe('CurrentFilmsList component', () => {

  it('renders without crashing', () => {
    expect(componentWhenLoading).toBeTruthy();
    expect(componentWithData).toBeTruthy();
  });

  it('uses fetchMovies in ComponentDidMount only when movies data is not provided', () => {
    const fetchMoviesFunc = jest.fn();
    const fetchMoviesFunc2 = jest.fn();
    const component = shallow(<ComingFilms isLoading={false} fetchMovies={fetchMoviesFunc}/>);
    component.instance();
    expect(fetchMoviesFunc).toHaveBeenCalledTimes(1);
    const component2 = shallow(
      <ComingFilms 
        isLoading={false}
        movies={mockedPropsWhithData.movies}
        fetchMovies={fetchMoviesFunc2}
      />);
    component2.instance();
    expect(fetchMoviesFunc2).toHaveBeenCalledTimes(0);
  });

  it('includes Loader when data is loading', () => {
    const loaderEl = componentWhenLoading.find('.loader');
    expect(loaderEl.find('Loader').exists()).toBeTruthy();
  });

  it('does not includes Loader when loading data is finished', () => {
    expect(componentWithData.find('.loader').exists()).toBeFalsy();
  });

  it('includes slider when data are loaded with proper props', () => {
    const cartSliderEl = componentWithData.find('CartSlider');
    expect(cartSliderEl.exists()).toBeTruthy();
    expect(cartSliderEl.props()).toEqual({
      cartHeight: 390,
      cartWidth: 270,
      data: mockedPropsWhithData.movies,
    });
  });

  it('does not includes slider when movies data are not provided', () => {
    expect(componentWhenLoading.find('CartSlider').exists()).toBeFalsy();
  });

  it('includes info message about no movies if fetching error happened', () => {
    const componentWithError = shallow(<ComingFilms isError={true} isLoading={false}  fetchMovies={jest.fn()}/>);
    expect(componentWithError.find('.errorMessage').text()).toEqual(expectedErrorText);
  });

  it('includes info message about no movies if fetching returns no movies', () => {
    const componentWithNoMovies = shallow(<ComingFilms movies={[]} isError={false} isLoading={false}  fetchMovies={jest.fn()}/>);
    expect(componentWithNoMovies.find('.errorMessage').text()).toEqual(expectedErrorText);
  });
});