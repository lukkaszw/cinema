import React from 'react';
import { shallow } from 'enzyme';
import CartsSliderList from './CartsSliderList';
import { generalMockedProps } from '../CartSlider.test';

const mockedProps = {
  carts: generalMockedProps.data,
  cartWidth: 260,
  activeCart: 1,
};


const component = shallow(<CartsSliderList {...mockedProps} />);

describe('CartsSliderList component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it(`renders ${mockedProps.carts.length + 4} .cartWrappers with Carts inside`, () => {
    const cartsEl = component.find('.cartWrapper Memo(Cart)');
    expect(cartsEl.length).toBe(mockedProps.carts.length + 4);
    cartsEl.forEach((cartEl, i) => {
      if(i >= mockedProps.carts.length) {
        expect(cartEl.props()).toEqual({
          ...mockedProps.carts[i - mockedProps.carts.length],
        });
      } else {
        expect(cartEl.props()).toEqual({
          ...mockedProps.carts[i],
        });
      }
    
    })
  });

  it('renders all carts wrappers with proper width', () => {
    const cartWrappersEl = component.find('.cartWrapper');
    cartWrappersEl.forEach(cartWrapper => {
      expect(cartWrapper.prop('style')).toEqual({ width: '260px'});
    });
  });

  it('renders list with proper transform translateX value depends on activeCart and carts amount', () => {
    //create 6 fake carts so if we add 4 additionals it will be 10!
    const cart = mockedProps.carts[0];
    const carts = [{ ...cart}, { ...cart, _id: '2'}, { ...cart, _id: '3'}, { ...cart, _id: '4'}, { ...cart, _id: '5'}, { ...cart, _id: '6'}];
    
    const expecetd = [0, -10, -20, -30, -40, -50, -60];

    for(let i = 0; i < 6; i++) {
      const comp = shallow(<CartsSliderList activeCart={i} carts={carts} cartWidth={200} />);
      expect(comp.find('ul').prop('style')).toEqual({ transform: `translateX(${expecetd[i]}%)`});
    }
  });
});