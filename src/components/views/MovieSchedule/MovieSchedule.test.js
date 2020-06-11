import React from 'react';
import { shallow } from 'enzyme';
import { MovieSchedule } from './MovieSchedule';

const mockedProps = {
  isAuth: false,
  match: {
    params: {
      id: '1',
    },
  },
};

const mockedPropsAuth = {
  ...mockedProps,
  isAuth: true,
}

const componentNotAuth = shallow(<MovieSchedule {...mockedProps}/>);
const componentAuth = shallow(<MovieSchedule {...mockedPropsAuth}/>);

describe('MovieSchedule Component', () => {
  it('renders without crashing', () => {
    expect(componentAuth).toBeTruthy();
    expect(componentNotAuth).toBeTruthy();
  });

  it('renders Redirect component with proper link when user is authenticated', () => {
    const rediretEl = componentAuth.find('Redirect');
    expect(rediretEl.exists()).toBeTruthy();
    expect(rediretEl.prop('to')).toBe(`/order/${mockedPropsAuth.match.params.id}`);
  });

  it('does not render Redirect component when user is not authenticated', () => {
    const redirectEl = componentNotAuth.find('Redirect');
    expect(redirectEl.exists()).toBeFalsy();
  });

  it('renders two Links', () => {
    const linkEl = componentNotAuth.find('Link');
    expect(linkEl.length).toBe(2);
  });

  it('renders first link to /auth with proper text', () => {
    const linkToAuthEl = componentNotAuth.find('Link').at(0);
    const expectedShowId = mockedProps.match.params.id;
    expect(linkToAuthEl.prop('to')).toEqual({pathname: "/auth", state: {from: expectedShowId}});
    expect(linkToAuthEl.text()).toBe('Sign in to order');
  });

  it('renders second link to order with proper text', () => {
    const linkToAuthEl = componentNotAuth.find('Link').at(1);
    const expectedShowId = mockedProps.match.params.id;
    expect(linkToAuthEl.prop('to')).toEqual(`/order/${expectedShowId}`);
    expect(linkToAuthEl.text()).toBe('Order without logging in');
  });
});