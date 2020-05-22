import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

const mockedProps = {
  isAuth: false,
}

const component = shallow(<App {...mockedProps} />);

describe('Component App', () => {
  it('render without crashing', () => {
    expect(component).toBeTruthy();
  });
});