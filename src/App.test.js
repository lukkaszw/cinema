import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

describe('Component App', () => {
  it('render without crashing', () => {
    const component = shallow(<App />);
    expect(component).toBeTruthy();
  });
});