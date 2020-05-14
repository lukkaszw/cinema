import React from 'react';
import { shallow, mount } from 'enzyme';
import Schedule from './Schedule';
import mockedData from './mockedData';

const mockedProps = {
  fetchSchedule: jest.fn(),
  scheduleList: mockedData,
  isLoading: false,
  isError: false,
  page: 1,
  setPage: () => console.log('Set page'),
  searchText: '',
  changeSearchText: () => console.log('change search text'),
};

describe('Schedule Component', () => {
  describe('rendering', () => {
    let testedProps = {...mockedProps};
    let component;

    beforeEach(() => {
      testedProps = {...mockedProps};
      component = mount(<Schedule {...testedProps}/>);
    });

    it('renders without crashing', () => {
      expect(component).toBeTruthy();
    });

    it('includes page with proper props', () => {
      //when not loading and no error
      let pageEl = component.find('Page');
      expect(pageEl.exists()).toBeTruthy();
      expect(pageEl.prop('isFetching')).toBe(false);
      expect(pageEl.prop('isFetchingError')).toBe(false);
      //when loading
      testedProps.isLoading = true;
      const componentWhenLoading = mount(<Schedule {...testedProps}/>);
      pageEl = componentWhenLoading.find('Page');
      expect(pageEl.exists()).toBeTruthy();
      expect(pageEl.prop('isFetching')).toBe(true);
      expect(pageEl.prop('isFetchingError')).toBe(false);
      //when error occured
      testedProps.isLoading = false;
      testedProps.isError = true;
      const componentWhenError = mount(<Schedule {...testedProps}/>);
      pageEl = componentWhenError.find('Page');
      expect(pageEl.exists()).toBeTruthy();
      expect(pageEl.prop('isFetching')).toBe(false);
      expect(pageEl.prop('isFetchingError')).toBe(true);
    });

    it('includes searchInput with proper props', () => {
      const searchInputEl = component.find('SearchInput');
      expect(searchInputEl.exists()).toBeTruthy();
      expect(searchInputEl.props()).toEqual({
        placeholder: "Search by title",
        onChange: component.instance().handleChangeSearchText,
        value: testedProps.searchText,
        onSubmit: component.instance().onSubmit,
      });
    });

    it('includes SearchByPanel with SearchByItem when searchText is provided and not if is not provided', () => {
      let searchByPanelEl = component.find('SearchedByPanel');
      expect(searchByPanelEl.exists()).toBeFalsy();
      testedProps.searchText = 'test text';
      const componentWhithSearchText = mount(<Schedule {...testedProps} />);
      searchByPanelEl = componentWhithSearchText.find('SearchedByPanel');
      expect(searchByPanelEl.exists()).toBeTruthy();
      const searchByItemEl = searchByPanelEl.find('SearchedByItem');
      expect(searchByItemEl.exists()).toBeTruthy();
      expect(searchByItemEl.props()).toEqual({
        value: testedProps.searchText,
        removeAction: componentWhithSearchText.instance().resetSearchText,
      });
    });

    it('includes schedule list', () => {
      const instance = component.instance();
      const scheduleListEl = component.find('ScheduleList');
      expect(scheduleListEl.exists()).toBeTruthy();
      expect(scheduleListEl.prop('movies')).toEqual(instance.getMoviesOnPage());
    });

    it('includes error message only when there are no movies generate on page', () => {
      let errorMsgEl = component.find('ErrorMessage');
      expect(errorMsgEl.exists()).toBeFalsy();
      testedProps.scheduleList = [];
      const componentWithNoMovies = mount(<Schedule {...testedProps} />);
      const instance = componentWithNoMovies.instance();
      errorMsgEl = componentWithNoMovies.find('ErrorMessage');
      expect(errorMsgEl.exists()).toBeTruthy();
      expect(errorMsgEl.props()).toEqual({
        message: "No movies found!",
        action: instance.resetSearchText,
        btnTitle: "Cancel",
      });
    });

    it('includes pagination with proper props', () => {
      const paginationEl = component.find('Pagination');
      const instance = component.instance();
      expect(paginationEl.exists()).toBeTruthy();
      expect(paginationEl.props()).toEqual({
        currentPage: testedProps.page,
        itemsPerPage: instance.LIMIT_ON_PAGE,
        allItems: testedProps.scheduleList.length,
        paginate: testedProps.setPage,
      });
    });
  });

  describe('functionality', () => {
    let testedProps;
    let component;
    
    beforeEach(() => {
      testedProps = {...mockedProps};
      component = shallow(<Schedule {...testedProps}/>);
    });

    it('fetches data just after component is mounted', () => {
      const mockedFunc = jest.fn();
      testedProps.fetchSchedule = mockedFunc;
      component = shallow(<Schedule {...testedProps}/>);
      const instance = component.instance();
      //check if after component has instance fetching is started
      expect(mockedFunc).toHaveBeenCalledTimes(1);
      // for sure check if it is in componentDidMount
      instance.componentDidMount();
      expect(mockedFunc).toHaveBeenCalledTimes(2);
    });

    it('updates searchText properly', () => {
      //before we checked if handleChangeSearchText method and resetSearchText methods are in good places on page
      const mockedFunc = jest.fn();
      testedProps.changeSearchText = mockedFunc
      component = shallow(<Schedule {...testedProps} />);

      //check if handleChangeSearchText method is working well
      const instance = component.instance();
      //simulate event onChange
      instance.handleChangeSearchText({ target: {
        value: 'test text',
      }});
      //check if function from redux that change searchTex was called with good value
      expect(mockedFunc).toHaveBeenCalledTimes(1);
      expect(mockedFunc).toHaveBeenCalledWith('test text');

      //check if resetSearchText is working well
      instance.resetSearchText();
      expect(mockedFunc).toHaveBeenCalledTimes(2);
      expect(mockedFunc).toHaveBeenCalledWith('');
    });

    describe('getMoviesOnPage - rendering movies on page', () => {
      const checkRenderedMovies = (fromNr, toNr) => {
        return mockedData.slice(fromNr - 1, toNr);
      }

      const testedProps = {...mockedProps};
        
      it('renders proper movies on page on start', () => {
        const component = shallow(<Schedule {...testedProps} />);
        const instance = component.instance();
        expect(instance.getMoviesOnPage()).toEqual(checkRenderedMovies(1, 5));
      });

      it('renders proper movies on page on when page is changed', () => {
        testedProps.page = 2;
        let component = shallow(<Schedule {...testedProps} />);
        let instance = component.instance();
        expect(instance.getMoviesOnPage()).toEqual(checkRenderedMovies(6, 10));
        testedProps.page = 3;
        component = shallow(<Schedule {...testedProps} />);
        instance = component.instance();
        expect(instance.getMoviesOnPage()).toEqual(checkRenderedMovies(11, 15));
        testedProps.page = 4;
        component = shallow(<Schedule {...testedProps} />);
        instance = component.instance();
        expect(instance.getMoviesOnPage()).toEqual(checkRenderedMovies(16, 18));
      });
    })
  });
});