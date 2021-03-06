import React from 'react';
import { shallow } from 'enzyme';
import CurrentFilms from './CurrentFilms';

const oneMovie =     {
  title: 'Title test',
  duration: 120,
  categories: ['Action', 'Drama'],
  image: '/images/carts/image-test.jpg',
};

const mockedMovies = [];

for(let i = 0; i < 18; i++) {
  mockedMovies.push({
    id: `${i}`,
    ...oneMovie,
  });
}

const mockedPropsWithData = {
  isLoading: false,
  isError: false,
  filter: 'all',
  movies: mockedMovies,
  fetchMovies: jest.fn(),
  setFilter: jest.fn(),
}


const mockedPropsWhenLoading = {
  isLoading: true,
  isError: false,
  filter: 'all',
  fetchMovies: jest.fn(),
  setFilter: jest.fn(),
};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const componentWhenLoading = shallow(<CurrentFilms {...mockedPropsWhenLoading}/>);
const componentWithData = shallow(<CurrentFilms {...mockedPropsWithData}/>);

describe('CurrentFilmsList component', () => {

  it('renders without crashing', () => {
    expect(componentWhenLoading).toBeTruthy();
    expect(componentWithData).toBeTruthy();
  });

  it('renders LoaderIndicator with proper isLoading prop', () => {
    expect(componentWhenLoading.find('LoaderIndicator').prop('isActive')).toBe(true);
    expect(componentWithData.find('LoaderIndicator').prop('isActive')).toBe(false);
  });

  it('includes CartsList with proper amount of data generated by method getGeneratedCarts', () => {
    const cartsListEl = componentWithData.find('CartsList');
    expect(cartsListEl.exists()).toBeTruthy();
    const instance = componentWithData.instance();
    expect(cartsListEl.prop('movies')).toEqual(instance.getGeneratedCarts());
  });

  it('includes button with proper action to get more carts only when carts amount is less than movies provided to component', () => {
    const buttonEl = componentWithData.find('.moreBtn Button');
    expect(buttonEl.exists()).toBeTruthy();
    expect(buttonEl.prop('action')).toBe(componentWithData.instance().getMoreCarts);
    // update state to 2 lists - it should rener max number of carts on screen
    componentWithData.setState({
      lists: 2,
    });
    // so button should not appear any more
    expect(componentWithData.find('.moreBtn Button').exists()).toBeFalsy();
  });
  
  it('includes noFound element with proper text only if loading has finished and movies data are not provided', () => {
    const expectedText = 'No movies were found. Please try to update searching criteria and try again. If you have chosen all movies and nothing was found, please try again later!';
    expect(componentWhenLoading.find('.noFound').exists()).toBeFalsy();
    expect(componentWithData.find('.noFound').exists()).toBeFalsy();
    const component = shallow(<CurrentFilms fetchMovies={jest.fn()} setFilter={jest.fn()} isLoading={false} isError={false} movies={[]}/>);
    const noFoundEl = component.find('p.noFound');
    expect(noFoundEl.exists()).toBeTruthy();
    expect(noFoundEl.text()).toEqual(expectedText);
  });

  it('includes ButtonList', () => {
    const buttonsListEl = componentWhenLoading.find('ButtonsList');
    expect(buttonsListEl.exists()).toBeTruthy();
    expect(buttonsListEl.prop('value')).toBe(mockedPropsWhenLoading.filter);
    expect(buttonsListEl.prop('buttons')).toBe(componentWhenLoading.instance().categoriesButtons);
    expect(buttonsListEl.prop('action')).toBe(mockedPropsWhenLoading.setFilter);
  });
});