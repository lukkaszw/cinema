import React from 'react';
import { shallow } from 'enzyme';
import DividedLine from './DividedLine';

const component = shallow(<DividedLine />);

describe('DividedLine component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });
});