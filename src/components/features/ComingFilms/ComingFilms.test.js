import React from 'react';
import { shallow } from 'enzyme';
import ComingFilms from './ComingFilms';

const mockedPropsWhenLoading = {
  isLoading: true,
  isError: false,
  fetchMovies: jest.fn(),
};

const mockedPropsWhithData = {
  isLoading: false,
  isError: false,
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

  it('includes LoaderIndicator whith proper isLoading prop', () => {
    expect(componentWhenLoading.find('LoaderIndicator').prop('isActive')).toBe(true);
    expect(componentWithData.find('LoaderIndicator').prop('isActive')).toBe(false);
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