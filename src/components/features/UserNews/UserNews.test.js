import React from 'react';
import { shallow } from 'enzyme';
import UserNews from './UserNews';

const mockedProps = {

};

const component = shallow(<UserNews {...mockedProps} />)

describe('UserSettings component', () => {
  it('renders withotu crashing', () => {
    expect(component).toBeTruthy();
  });
});