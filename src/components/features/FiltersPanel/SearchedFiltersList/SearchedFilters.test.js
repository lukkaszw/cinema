import React from 'react';
import { shallow } from 'enzyme';
import SearchedFilters from './SearchedFilters';

const mockedProps = {
  items: [
    {
      value: 'Value 1',
      removeAction: () => console.log('removeAction 1'),
    },
    {
      value: 'Value 2',
      removeAction: () => console.log('removeAction 2'),
    }
  ],
};

const component = shallow(<SearchedFilters {...mockedProps} />);

describe('SearchedFilters component', () => { 
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes SearchedByPanel', () => {
    expect(component.find('SearchedByPanel').exists()).toBeTruthy();
  });

  it(`includes ${mockedProps.items.length} amount of SearchedByItems with proper props`, () => {
    const searchedItemsEl = component.find('SearchedByItem');
    expect(searchedItemsEl.length).toBe(mockedProps.items.length);
    searchedItemsEl.forEach((item, i) => {
      expect(item.props()).toEqual(mockedProps.items[i]);
    });
  }); 
});