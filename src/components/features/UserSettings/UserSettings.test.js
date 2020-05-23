import React from 'react';
import { shallow } from 'enzyme';
import UserSettings from './UserSettings';

const mockedProps = {

};

const component = shallow(<UserSettings {...mockedProps} />)

describe('UserSettings component', () => {
  it('renders withotu crashing', () => {
    expect(component).toBeTruthy();
  });
});
