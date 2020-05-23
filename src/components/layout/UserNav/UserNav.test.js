import React from 'react';
import { shallow } from 'enzyme';
import UserNav from './UserNav';

const mockedProps = {
  updatePage: jest.fn(),
};

const component = shallow(<UserNav {...mockedProps} />);

describe('UserNav component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });
});