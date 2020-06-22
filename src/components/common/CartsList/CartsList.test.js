import React from 'react';
import { shallow } from 'enzyme';
import CartsList from './CartsList';

const mockedProps = {
  movies: [
    {
      _id: '1',
      title: 'Title test 1',
      duration: 120,
      categories: ['Action', 'Drama'],
      image: '/images/carts/image-test.jpg',
    },
    {
      _id: '2',
      title: 'Title test 2',
      duration: 116,
      categories: ['Adventure'],
      image: '/images/carts/image-test2.jpg',
    },
    {
      _id: '3',
      title: 'Title test 3',
      duration: 105,
      categories: ['Horror'],
      image: '/images/carts/image-test3.jpg',
    },
    {
      _id: '4',
      title: 'Title test 4',
      duration: 105,
      categories: ['Thriller'],
      image: '/images/carts/image-test4.jpg',
    },
  ],

};

const component = shallow(<CartsList {...mockedProps}/>);
const componentWithoutProps = shallow(<CartsList />);

describe('CartsList component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders without crashing when movies prop is not provided', () => {
    expect(componentWithoutProps).toBeTruthy();
  });

  it('has no carts when movies prop is not provided', () => {
    expect(componentWithoutProps.find('Cart').length).toBe(0);
  });

  it(`includes list with ${mockedProps.movies.length} item elements with proper key prop`, () => {
    const listEl = component.find('ul');
    const itemEl = listEl.find('li.item');
    expect(itemEl.length).toBe(mockedProps.movies.length);
    mockedProps.movies.forEach((movie, index) => {
      expect(itemEl.at(index).key()).toBe(movie._id);
    });
  });

  it(`includes ${mockedProps.movies.length} Cart elements with proper props`, () => {
    const cartEl = component.find('Memo(Cart)');
    expect(cartEl.length).toBe(mockedProps.movies.length);
    mockedProps.movies.forEach((movie, index) => {
      expect(cartEl.at(index).props()).toEqual(movie);
    });
  });
});