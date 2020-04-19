import React from 'react';
import { shallow } from 'enzyme';
import CartSlider from './CartSlider';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {
  mockedProps
} from './mockedPropsForCartSlider';

const component = shallow(<CartSlider {...mockedProps}/>);

describe('Slider component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes carts list  with carts wrappers and carts inside with proper props', () => {
    const listEl = component.find('.slider > ul.cartsList');
    expect(listEl.exists()).toBeTruthy();
    const cartWrappersEl = listEl.find('.cartWrapper');
    expect(cartWrappersEl.length).toBe(4);
    cartWrappersEl.forEach((wrapper, index) => {
      const cartEl = wrapper.find('Cart');
      expect(cartEl.exists()).toBeTruthy();
      expect(cartEl.props()).toEqual(mockedProps.data[index]);
    });
  });

  it('includes proper height and width', () => {
      const wrapperEl = component.find('.slider');
      const expectedHeight = mockedProps.cartHeight + 30 + 'px';
      const expectedWidth = mockedProps.cartWidth + 'px';
      expect(wrapperEl.prop('style')).toEqual({ height: expectedHeight});
      const cartWrapersEl = component.find('.cartWrapper');
      cartWrapersEl.forEach(cartWrapper => expect(cartWrapper.prop('style')).toEqual({ width: expectedWidth}));
  });

  it('includes buttons to change slides with proper props', () => {
    const panelEl = component.find('.panel');
    expect(panelEl.exists()).toBeTruthy();
    const instance = component.instance();
    const buttonsEl = panelEl.find('IconButton');
    expect(buttonsEl.at(0).prop('action')).toBe(instance.goToNextCart);
    expect(buttonsEl.at(0).prop('icon')).toEqual(faChevronLeft);
    expect(buttonsEl.at(1).prop('action')).toBe(instance.goToPreviousCart);
    expect(buttonsEl.at(1).prop('icon')).toEqual(faChevronRight);
    //check buttons elemenets disable prop at the begining
    expect(buttonsEl.at(0).prop('disabled')).toBe(false);
    expect(buttonsEl.at(1).prop('disabled')).toBe(true);
  });

  it('updates carts in slides properly and updates buttons disable props', () => {
    const instance = component.instance();
    expect(instance.state.activeCart).toBe(0);
    // try to go to previous cart - should be impossible because cart is 0
    instance.goToPreviousCart();
    expect(instance.state.activeCart).toBe(0);
    // check icon buttons elements disabled prop after unsuccessful action
    let iconButtonsEl = component.find('IconButton');
    expect(iconButtonsEl.at(0).prop('disabled')).toBe(false);
    expect(iconButtonsEl.at(1).prop('disabled')).toBe(true);


    //try go to next carts to the end of data
    for(let i = 1; i < mockedProps.data.length; i++) {
      instance.goToNextCart();
      expect(instance.state.activeCart).toBe(i);
      // check icon buttons elements disabled prop after actions
      iconButtonsEl = component.find('IconButton');
      expect(iconButtonsEl.at(1).prop('disabled')).toBe(false);
      if(i === mockedProps.data.length - 1) {
        expect(iconButtonsEl.at(0).prop('disabled')).toBe(true);
      } else {
        expect(iconButtonsEl.at(0).prop('disabled')).toBe(false);
      }
    }
    
    //again try go to next cart - should be impossible because active cart is the last cart in data
    instance.goToNextCart();
    expect(instance.state.activeCart).toBe(mockedProps.data.length - 1);
    // check icon buttons elements disabled prop after unsuccessful action
    iconButtonsEl = component.find('IconButton');
    expect(iconButtonsEl.at(0).prop('disabled')).toBe(true);
    expect(iconButtonsEl.at(1).prop('disabled')).toBe(false);

    // try to go to previous carts to the end - to cart 0
    for(let i = mockedProps.data.length - 2; i === 0; i--) {
      instance.goToPreviousCart();
      expect(instance.state.activeCart).toBe(i);
      // check icon buttons elements disabled prop after actions
      iconButtonsEl = component.find('IconButton');
      expect(iconButtonsEl.at(1).prop('disabled')).toBe(false);
      if(i === 0) {
        expect(iconButtonsEl.at(0).prop('disabled')).toBe(true);
      } else {
        expect(iconButtonsEl.at(0).prop('disabled')).toBe(false);
      }
    }
  });
});