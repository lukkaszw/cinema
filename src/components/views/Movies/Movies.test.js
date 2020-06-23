import React from 'react';
import { shallow } from 'enzyme';
import Movies from './Movies';

const mockedProps = {
  movies: [
    {
      _id: '1',
      title: 'Title 1',
    },
    {
      _id: '2',
      title: 'Title 2',
    }
  ],
  isLoading: false,
  isError: false,
  fetchMovies: () => console.log('fetch movies'),
  dataFetched: false,
  page: 1,
  setPage: () => console.log('set page'),
  resetFilters: () => console.log('reset filters'),
};

const mockedPropsWithData = {
  ...mockedProps,
  dataFetched: true,
  movies: [{
    _id: '1',
    title: 'Title',
  }],
};

const component = shallow(<Movies {...mockedProps}/>);

describe('Movies Component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('fetches movies when mounted if movies have not been fetched', () => {
    const mockedFunc = jest.fn();
    let testProps = {...mockedProps};
    testProps.fetchMovies = mockedFunc;
    const componentWhithoutData= shallow(<Movies {...testProps} />);
    componentWhithoutData.instance();
    expect(mockedFunc).toHaveBeenCalledTimes(1);

    const mockedFunc2 = jest.fn();
    testProps = {...mockedPropsWithData};
    testProps.fetchMovies = mockedFunc2;
    const componentWhithData= shallow(<Movies {...testProps} />);
    componentWhithData.instance();
    expect(mockedFunc2).toHaveBeenCalledTimes(0);
  });

  it('includes page', () => {
    expect(component.find('Page').exists()).toBeTruthy();
  });

  it('includes filters panel connected with redux state', () => {
    const filtersPanelEl = component.find('Connect(FiltersPanel)');
    expect(filtersPanelEl.exists()).toBeTruthy();

    expect(filtersPanelEl.prop('foundMoviesAmount')).toEqual(mockedProps.movies.length);
  });

  it('includes movies list with proper props', () => {
    const movieListEl = component.find('Memo(MoviesList)');
    expect(movieListEl.exists()).toBeTruthy();
    const instance = component.instance();
    expect(movieListEl.props()).toEqual({
      movies: instance.getMoviesOnPage(),
    });

  });

  it('includes pagination with proper props', () => {
    const paginationEl = component.find('Pagination');
    expect(paginationEl.exists()).toBeTruthy();
    const instance = component.instance();

    expect(paginationEl.props()).toEqual({
      currentPage: mockedProps.page,
      itemsPerPage: instance.LIMIT_ON_PAGE,
      allItems: mockedProps.movies.length,
      paginate: mockedProps.setPage,
    });
  });
});