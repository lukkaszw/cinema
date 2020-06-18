import React from 'react';
import { shallow } from 'enzyme';
import FetchError from './FetchError';

const mockedProps = {
  message: 'Some error message!',
};

const component = shallow(<FetchError />);

describe('Error component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });
});