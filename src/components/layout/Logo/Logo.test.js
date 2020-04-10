import React from 'react';
import { shallow } from 'enzyme';
import Logo from './Logo';

const logoSrc = '/gold-cinema-logo.svg';

const component = shallow(<Logo />);

describe('Logo component', () => {
  it('redners without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes Link to main page', () => {
    const linkEl = component.find('Link');
    expect(linkEl.exists()).toBeTruthy();
    expect(linkEl.prop('to')).toBe('/');
  });

  it('includes logo image', () => {
    const imageEl = component.find('.image');
    expect(imageEl.exists()).toBeTruthy();
    expect(imageEl.prop('src')).toBe(logoSrc);
  });

  it('has img with class small when size prop value is "small"', () => {
    const componentWithSizeSmall = shallow(<Logo size="small" />);
    const imageEl = componentWithSizeSmall.find('img');
    expect(imageEl.hasClass('small')).toBeTruthy();
  });

  it('has img with class medium when size prop value is "medium"', () => {
    const componentWithSizeMedium = shallow(<Logo size="medium" />);
    const imageEl = componentWithSizeMedium.find('img');
    expect(imageEl.hasClass('medium')).toBeTruthy();
  });
});