import React from 'react';
import { shallow } from 'enzyme';
import UserOrders from './UserOrders';

const mockedProps = {

};

const component = shallow(<UserOrders {...mockedProps} />)

describe('UserSettings component', () => {
  it('renders withotu crashing', () => {
    expect(component).toBeTruthy();
  });
});