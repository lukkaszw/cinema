import React from 'react';
import { shallow } from 'enzyme';
import Movie from './Movie';

const fetchMovieData = jest.fn();
const mockedData = {
  _id: '1',
  title: 'dadada',
};

const mockedProps = {
  data: mockedData,
  fetchMovieData: fetchMovieData,
  isLoading: false,
  isError: false,
  match: {
    params: {
      id: '1'
    }
  },
}

const component = shallow(<Movie {...mockedProps}/>);


describe('Movie Component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('uses fetchMovieData in componentDidMount only if fetched movie is other than movie fetched before', () => {
    expect(fetchMovieData).toHaveBeenCalledTimes(0);
    const mockedPropsWithAnotherID  = JSON.parse(JSON.stringify(mockedProps));
    mockedPropsWithAnotherID.data._id = '2';
    mockedPropsWithAnotherID.fetchMovieData = fetchMovieData;
    shallow(<Movie {...mockedPropsWithAnotherID}/>);
    expect(fetchMovieData).toHaveBeenCalledTimes(1);
  });

  it('includes Page component', () => {
    expect(component.find('Page').exists()).toBeTruthy();
  });
});