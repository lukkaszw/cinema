import React from 'react';
import { shallow } from 'enzyme';
import User from './User';

const mockedData = {
  _id: 'some id',
  name: 'Somename',
  surname: 'Somesurname',
  phone: '666 666 666',
  email: 'email@wp.pl',
}

const mockedProps = {
  token: 'some token',
  fetchUserData: jest.fn(),
  data: mockedData,
}

const component = shallow(<User {...mockedProps} />);

describe('User component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });
})