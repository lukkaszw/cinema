import React from 'react';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { shallow } from 'enzyme';
import { GenreFilterPanel } from './GenreFilterPanel';

const mockedProps = {
  activeGenres: [],
  toggleGenre: jest.fn(),
  foundMoviesAmount: 10,
};

const component = shallow(<GenreFilterPanel {...mockedProps} />);

describe('GenreFilterPanel component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes movies icon button with proper props', () => {
    const moviesIconBtnEl = component.find('IconButton');
    expect(moviesIconBtnEl.exists()).toBeTruthy();
    expect(moviesIconBtnEl.prop('icon')).toEqual(faFilm);
  });

  it('does not render modal at first', () => {
    const genresModalEl = component.find('GenresModal');
    expect(genresModalEl.exists()).toBeFalsy();
  });

  it('renders modal if user click on movies icon button', () => {
    const moviesIconBtnEl = component.find('IconButton');
    moviesIconBtnEl.prop('action')();
    const genreModalEl = component.find('GenreModal');
    expect(genreModalEl.exists()).toBeTruthy();

    //check modals props 
    expect(genreModalEl.prop('foundMoviesAmount')).toBe(mockedProps.foundMoviesAmount);
    expect(genreModalEl.prop('values')).toBe(mockedProps.activeGenres);
    expect(genreModalEl.prop('toggleAction')).toBe(mockedProps.toggleGenre);
  });
});