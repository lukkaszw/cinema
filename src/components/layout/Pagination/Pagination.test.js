import React from 'react';
import { shallow, mount } from 'enzyme';
import Pagination from './Pagination';

let mockedProps = {
  currentPage: 1,
  itemsPerPage: 1,
  allItems: 20,
  paginate: () => {console.log('paginate')},
};

const checkNrs = (itemsPerPage, allItems, expectedPageNrs) => {
  const mockedProps = {
    currentPage: 1,
    itemsPerPage,
    allItems,
    paginate: () => console.log('paginate'),
  };

  const component = shallow(<Pagination {...mockedProps} />);
  const pageNrEL = component.find('.pageNr');
  expect(pageNrEL.length).toBe(expectedPageNrs);
};

const checkCurrentPage = (currentPage) => {
  mockedProps.currentPage = currentPage;

  const component = shallow(<Pagination {...mockedProps} />);
  const pageNrEL = component.find('.pageNr');
  const indexOfCrntPage = currentPage - 1;
  pageNrEL.forEach((pageNr, i) => {

    if(i === indexOfCrntPage) {
      expect(pageNr.hasClass('active')).toBeTruthy();
    } else {
      expect(pageNr.hasClass('active')).toBeFalsy();
    }
  });

  mockedProps.currentPage = 1;
};

describe('Pagination component', () => {
  it('renders without crashing', () => {
    const component = shallow(<Pagination {...mockedProps} />);
    expect(component).toBeTruthy();
  });

  it('renders proper amount of page numbers on screen', () => {
    checkNrs(5, 18, 4);
    checkNrs(6, 18, 3);
    checkNrs(1,10, 10);
    checkNrs(20,10, 1);
    checkNrs(3, 5, 2);
  });

  it('selects only proper page as current', () => {
    checkCurrentPage(1);
    checkCurrentPage(13);
    checkCurrentPage(20);
    checkCurrentPage(7);
    checkCurrentPage(5);
  });

  it('fires good functions when user clicked on pageNr', () => {
    const mockedFunc = jest.fn();
    mockedProps.paginate = mockedFunc;

    const component = mount(<Pagination {...mockedProps} />);
    const pageNrEl = component.find('.pageNr');
    pageNrEl.forEach(pageNr => {
      const expectedValue = parseInt(pageNr.text());
      pageNr.simulate('click');
      expect(mockedFunc).toHaveBeenCalledWith(expectedValue);
    });
  });
});