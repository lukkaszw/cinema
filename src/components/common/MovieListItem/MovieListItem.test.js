import React from 'react';
import { shallow } from 'enzyme';
import MovieListItem from './MovieListItem';

const mockedPropsCrntMovie = {
  _id: '1',
  title: 'Title',
  smallImg: 'image-1.jpg',
  details: {
    rating: 5.7,
    language: 'English',
    direction: 'Director 1',
  },
  categories: ['Horror', 'Thriller'],
  filters: ['2d', '3d'],
  duration: 124,
  played: 'current',
};

const mockedPropsSoonMovie = {
  _id: '2',
  title: 'Title 2',
  details: {
    language: 'Russian',
    direction: 'Director 2',
  },
  smallImg: 'image-2.jpg',
  categories: ['Comedy'],
  played: 'soon',
}

const component = shallow(<MovieListItem {...mockedPropsCrntMovie} />);
const componentSoonPlayed = shallow(<MovieListItem  {...mockedPropsSoonMovie} />);

describe('MovieListItem component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
    expect(componentSoonPlayed).toBeTruthy();
  });

  it('includes proper link', () => {
    const linkEl = component.find('Link');
    expect(linkEl.exists()).toBeTruthy();
    expect(linkEl.prop('to')).toBe(`/movies/${mockedPropsCrntMovie._id}`);
  });

  it('includes proper title', () => {
    const titleEl = component.find('.title');
    expect(titleEl.exists()).toBeTruthy();
    expect(titleEl.text()).toBe(mockedPropsCrntMovie.title);
  });

  it('includes small image', () => {
    const smallImgEl = component.find('img');
    expect(smallImgEl.exists()).toBeTruthy();
    expect(smallImgEl.props()).toEqual({
      className: 'image',
      src: mockedPropsCrntMovie.smallImg,
      alt: mockedPropsCrntMovie.title,
    });
  });

  it('includes rating if it is provided as props', () => {
    const rateEl = component.find('.rate');
    expect(rateEl.exists()).toBeTruthy();
    expect(rateEl.text()).toBe(`IMDB ${mockedPropsCrntMovie.details.rating}`);

    const componentWithoutRate = shallow(<MovieListItem {...mockedPropsSoonMovie} />);
    expect(componentWithoutRate.find('.rate').exists()).toBeFalsy();
  });

  it('includes played element which informs about playing time', () => {
    let playedEl = component.find('.playTime');
    expect(playedEl.exists()).toBeTruthy();
    expect(playedEl.text()).toEqual('AVAILABLE NOW!');
    expect(playedEl.hasClass('active')).toBeTruthy();

    playedEl = componentSoonPlayed.find('.playTime');
    expect(playedEl.exists()).toBeTruthy();
    expect(playedEl.text()).toEqual('COMING SOON!');
    expect(playedEl.hasClass('active')).toBeFalsy();

    const propsWithPlayDate = {...mockedPropsSoonMovie};
    propsWithPlayDate.playDate = '20.05.2021';
    const componentWithPlayDate = shallow(<MovieListItem  {...propsWithPlayDate} />);
    playedEl = componentWithPlayDate.find('.playTime');
    expect(playedEl.exists()).toBeTruthy();
    expect(playedEl.text()).toEqual(`FROM ${propsWithPlayDate.playDate}!`);
    expect(playedEl.hasClass('active')).toBeFalsy();
  });

  it('includes information about director', () => {
    const directEl = component.find('.direction');
    expect(directEl.exists()).toBeTruthy();
    expect(directEl.text()).toBe(`dir. ${mockedPropsCrntMovie.details.direction}`);
  });

  it('includes information about movie categories', () => {
    const catEl = component.find('.categories');
    expect(catEl.exists()).toBeTruthy();
    expect(catEl.text()).toEqual(mockedPropsCrntMovie.categories.join(' '));
  });

  it('includes information about language', () => {
    const langEl = component.find('.lang');
    expect(langEl.exists()).toBeTruthy();
    expect(langEl.text()).toEqual(mockedPropsCrntMovie.details.language);
  });

  it('includes information about duration if it is provided', () => {
    const durEl = component.find('.duration');
    expect(durEl.exists()).toBeTruthy();
    expect(durEl.text()).toBe(mockedPropsCrntMovie.duration + ' min');
    expect(componentSoonPlayed.find('.duration').exists()).toBeFalsy();
  });

  it('includes information about filters if they are provided', () => {
    const filtersEl = component.find('.filters');
    expect(filtersEl.exists()).toBeTruthy();
    expect(filtersEl.find('.filter').length).toBe(mockedPropsCrntMovie.filters.length);
    expect(componentSoonPlayed.find('.filters').exists()).toBeFalsy();
  });
});