import React from 'react';
import { faSortAlphaDown, faSortAlphaUp } from '@fortawesome/free-solid-svg-icons';
import { shallow } from 'enzyme';
import SortPanel from './SortPanel';

const mockedProps = {
  sort: 'asc',
  setSort: jest.fn(),
};

const component = shallow(<SortPanel {...mockedProps} />);

describe('SortPanel component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes two icon buttons with proper sort icons', () => {
    const iconBtnEl = component.find('IconButton');
    expect(iconBtnEl.length).toBe(2);
    expect(iconBtnEl.at(0).prop('icon')).toEqual(faSortAlphaDown)
    expect(iconBtnEl.at(1).prop('icon')).toEqual(faSortAlphaUp);
  });

  it('fires setSort function with good values when user use icon buttons', () => {
    const iconBtnEl = component.find('IconButton');
    iconBtnEl.at(0).prop('action')();
    expect(mockedProps.setSort).toHaveBeenCalledTimes(1);
    expect(mockedProps.setSort).toHaveBeenCalledWith('asc');
    iconBtnEl.at(1).prop('action')();
    expect(mockedProps.setSort).toHaveBeenCalledTimes(2);
    expect(mockedProps.setSort).toHaveBeenCalledWith('desc');
  });

  it('has buttons with proper inactive prop depended on parents sort prop', () => {
    //check when sort is asc
    expect(component.find('IconButton').at(0).prop('inactive')).toBeFalsy();
    expect(component.find('IconButton').at(1).prop('inactive')).toBeTruthy();
    //check when sort is desc
    const descSortComp = shallow(<SortPanel setSort={mockedProps.setSort} sort="desc"/>);
    expect(descSortComp.find('IconButton').at(0).prop('inactive')).toBeTruthy();
    expect(descSortComp.find('IconButton').at(1).prop('inactive')).toBeFalsy();
  });
});