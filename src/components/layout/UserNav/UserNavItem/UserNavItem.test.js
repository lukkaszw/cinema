import React from 'react';
import { shallow } from 'enzyme';
import UserNavItem from './UserNavItem';

const mockedProps = {

};

const component = shallow(<UserNavItem {...mockedProps}/>);

describe('UserNavItem component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });
});