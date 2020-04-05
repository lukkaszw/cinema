import React from 'react';
import { shallow } from 'enzyme';
import MovieSchedule from './MovieSchedule';

describe('MovieSchedule Component', () => {
  it('renders without crashing', () => {
    const component = shallow(<MovieSchedule />);
    expect(component).toBeTruthy();
  });
});