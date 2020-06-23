import React from 'react';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { shallow } from 'enzyme';
import FiltersPanel from './FiltersPanel';
import filtersBtns from '../../../config/filtersBtns';
import playTimeBtns from '../../../config/playTimeBtns';

const mockedProps = {
  inputText: 'text',
  changeInput: () => console.log('change input'),
  submitInput: () => console.log('submit input'),
  placeholder: 'Search',
  filtersBtns,
  setFilter: () => console.log('set filter'),
  playTimeBtns,
  setPlayTime: () => console.log('set play time'),
  playTime: 'current',
  filter: 'all',
  sort: 'asc',
  setSort: () => console.log('set sort filter'),
  genres: [],
  toggleGenre: () => console.log('toggle genre'),
  foundMoviesAmount: 10,
};

const component = shallow(<FiltersPanel {...mockedProps} />);

describe('FiltersPanel component', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      expect(component).toBeTruthy();
    });
  
    it('includes three parts: top, center, bottom', () => {
      expect(component.find('.top').exists()).toBeTruthy();
      expect(component.find('.center').exists()).toBeTruthy();
      expect(component.find('.bottom').exists()).toBeTruthy();
    });
  
    it('includes search input in top part with proper props', () => {
      const searchInputEl = component.find('.top Memo(SearchInput)');
      expect(searchInputEl.exists()).toBeTruthy();
      expect(searchInputEl.props()).toEqual({
        value: mockedProps.inputText,
        onChange: mockedProps.changeInput,
        onSubmit: mockedProps.submitInput,
        placeholder: mockedProps.placeholder,
      })
    });
  
    it('includes filter icon button in top part with proper props', () => {
      const filterBtn = component.find('.top Memo(IconButton)');
      expect(filterBtn.exists()).toBeTruthy();
      expect(filterBtn.prop('icon')).toEqual(faFilter);
    });

    it('includes center part with no active class at begining', () => {
      expect(component.find('.center').hasClass('active')).toBeFalsy();
    });

    it('includes two buttons list in center part with proper props', () => {
      const btnListEl = component.find('.center ButtonsList');
      expect(btnListEl.length).toBe(2);
      //check first button props
      expect(btnListEl.at(0).props()).toEqual({
        buttons: filtersBtns,
        action: mockedProps.setFilter,
        value: mockedProps.filter,
        variants: ['small'],
      });
      //check second button props
      expect(btnListEl.at(1).props()).toEqual({
        buttons: playTimeBtns,
        action: mockedProps.setPlayTime,
        value: mockedProps.playTime,
        variants: ['small', 'secondary'],
      });
    });

    it('includes sort panel with proper props', () => {
      const sortPanelEl = component.find('Memo(SortPanel)');
      expect(sortPanelEl.exists()).toBeTruthy();
      expect(sortPanelEl.props()).toEqual({
        sort: mockedProps.sort,
        setSort: mockedProps.setSort,
      });
    });

    it('includes movies genres filter panel with proper props', () => {
      const genreFilterEl = component.find('Memo(GenreFilterPanel)');
      expect(genreFilterEl.exists()).toBeTruthy();

      expect(genreFilterEl.props()).toEqual({
        activeGenres: mockedProps.genres,
        toggleGenre: mockedProps.toggleGenre,
        foundMoviesAmount: mockedProps.foundMoviesAmount,
      })
    });

    it('includes SearchedFilters in bottom part', () => {
      const searchedFiltersEl = component.find('.bottom Memo(SearchedFilters)');
      expect(searchedFiltersEl.exists()).toBeTruthy();
    });
  })
});