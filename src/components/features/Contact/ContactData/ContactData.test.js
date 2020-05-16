import React from 'react';
import { shallow } from 'enzyme';
import ContactData from './ContactData';

describe('ContactData component', () => {
  it('renders without crashing', () => {
    const component = shallow(<ContactData />);
    expect(component).toBeTruthy();
  });
});