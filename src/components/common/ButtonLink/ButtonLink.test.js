import React from 'react';
import { shallow } from 'enzyme';
import ButtonLink from './ButtonLink';

const mockedProps = {
  to: '/test',
  title: 'test title',
  size: 'big',
  secondaryAction: () => { console.log('test'); }
};

const component = shallow(<ButtonLink {...mockedProps} />);

describe('ButtonLink', () => {
  it('redners without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes link', () => {
    const linkEl = component.find('Link');
    expect(linkEl.exists()).toBeTruthy();
    expect(linkEl.prop('to')).toBe(mockedProps.to);
    expect(linkEl.text()).toEqual(mockedProps.title);
  });

  it('includes big class', () => {
    expect(component.find('.big').exists()).toBeTruthy();
  });

  it('has secondaryAction prop used in link in method onClick', () => {
    const linkEl = component.find('Link');
    expect(linkEl.prop('onClick')).toBe(mockedProps.secondaryAction);
  });
});