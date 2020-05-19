import React from 'react';
import { shallow } from 'enzyme';
import SearchPanel from './SearchPanel';

const mockedData = [
  {
    _id: '1',
    title: 'Title 1',
    categories: ['Comedy'],
    played: 'current',
    smallImg: 'image-1.jpg',
  },
  {
    _id: '2',
    title: 'Title 2',
    categories: ['Horror'],
    played: 'soon',
    smallImg: 'image-2.jpg',
  },
]

const initMockedProps = {
  closeAction: () => console.log('close action'),
  isLoading: false,
  isError: false,
  query: '',
  resetQuery: jest.fn(),
  movies: [],
  searchMovies: jest.fn(),
};

const propsWithData = {
  ...initMockedProps,
  movies: mockedData,
  query: 'title',
};

const propsWhenLoading = {
  ...initMockedProps,
  isLoading: true,
}

const propsWithError = {
  ...initMockedProps,
  isError: true,
};



const component = shallow(<SearchPanel {...initMockedProps}/>)
const componentWhenLoading = shallow(<SearchPanel {...propsWhenLoading} />);
const componentWithData = shallow(<SearchPanel {...propsWithData} />)
const componentWithError = shallow(<SearchPanel {...propsWithError} />);

describe('SearchPanel component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
    expect(componentWhenLoading).toBeTruthy();
    expect(componentWithData).toBeTruthy();
    expect(componentWithError).toBeTruthy();
  });

  it('renders in dark modal rendered outside mobile menu with', () => {
    const modalEl = component.find('Modal');
    expect(modalEl.exists()).toBeTruthy();
    expect(modalEl.prop('closeAction')).toEqual(initMockedProps.closeAction);
    expect(modalEl.prop('renderPlace')).toEqual('modals-after-menu');
  });

  it('includes SearchInput with proper props', () => {
    const searchInputEl = component.find('SearchInput');
    expect(searchInputEl.exists()).toBeTruthy();
  });

  it('fires searchMovies method from prop when user click to submit query input with input value', () => {
    const searchInputEl = component.find('SearchInput');
    const expectedSearchedText = 'dummy text';

    searchInputEl.prop('onChange')({ target: { value: expectedSearchedText}})

    expect(initMockedProps.searchMovies).toHaveBeenCalledTimes(0);
    component.find('SearchInput').prop('onSubmit')({ preventDefault: () => {}});
    expect(initMockedProps.searchMovies).toHaveBeenCalledTimes(1);
    expect(initMockedProps.searchMovies).toHaveBeenCalledWith(expectedSearchedText);
  });

  it('renders no message when it is searching - when isLoading prop is true', () => {
    expect(componentWhenLoading.find('.message').exists()).toBeFalsy();
  });

  it('renders text that no movies was found when movies data array is empty', () => {
    const expectedText = "No movies've been found! Try with another phrase!";
    const messageEl = component.find('.message');
    expect(messageEl.exists()).toBeTruthy();
    expect(messageEl.text()).toBe(expectedText);
  });

  it('renders text how many movies have been found when movies data array is not empty', () => {
    const expectedText = `${mockedData.length} movies've been found!`;
    const messageEl = componentWithData.find('.message');
    expect(messageEl.exists()).toBeTruthy();
    expect(messageEl.text()).toBe(expectedText);
  });

  it('renders text about error when props isError is true', () => {
    const expectedText = 'Error occured. Please try again later.';
    const messageEl = componentWithError.find('.message');
    expect(messageEl.exists()).toBeTruthy();
    expect(messageEl.text()).toBe(expectedText);
  });

  it('does not render loader when isLoading props is false', () => {
    expect(component.find('Loader').exists()).toBeFalsy();
  });

  it('renders loader when isLoading prop is true', () => {
    expect(componentWhenLoading.find('Loader').exists()).toBeTruthy();
  });

  it('renders SearchedByPanel with one SearchedByItem only when query prop is not empty string', () => {
    const searchedByItemEl= componentWithData.find('SearchedByPanel SearchedByItem');
    expect(searchedByItemEl.exists()).toBeTruthy();
    expect(searchedByItemEl.props()).toEqual({
      value: propsWithData.query,
      removeAction: propsWithData.resetQuery
    });

    expect(componentWhenLoading.find('SearchedByPanel SearchedByItem').exists()).toBeFalsy();
  });

  it('renders list of small movies items', () => {
    const listOfItemsEl = componentWithData.find('SmallMoviesItemsList');
    expect(listOfItemsEl.exists()).toBeTruthy();
    expect(listOfItemsEl.props()).toEqual({
      movies: mockedData,
      closeAction: propsWithData.closeAction,
    })
  });
});