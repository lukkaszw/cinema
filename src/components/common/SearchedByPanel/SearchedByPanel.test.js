import React from 'react';
import { shallow } from 'enzyme';
import SearchedByPanel from './SearchedByPanel';

const MockedComponent = () => <div></div>;

const component = shallow(<SearchedByPanel><MockedComponent /></SearchedByPanel>);

describe('SearchedByPanel component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes MockedComponent inside', () => {
    expect(component.find('MockedComponent').exists()).toBeTruthy();
  });
});