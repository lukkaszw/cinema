import React from 'react';
import { shallow } from 'enzyme';
import Schedule from './Schedule';

describe('Home Component', () => {
  it('renders without crashing', () => {
    const component = shallow(<Schedule />);
    expect(component).toBeTruthy();
  });
});