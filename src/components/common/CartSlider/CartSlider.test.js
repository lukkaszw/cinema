import React from 'react';
import { shallow } from 'enzyme';
import CartSlider from './CartSlider';
export const generalMockedProps = {
  data: [
    {
      _id: '1',
      title: 'Title test 1',
      duration: 120,
      categories: ['Action', 'Drama'],
      image: '/images/carts/image-test.jpg',
    },
    {
      _id: '2',
      title: 'Title test 2',
      duration: 116,
      categories: ['Adventure'],
      image: '/images/carts/image-test2.jpg',
    },
    {
      _id: '3',
      title: 'Title test 3',
      duration: 104,
      categories: ['Thriller'],
      image: '/images/carts/image-test3.jpg',
    },
    {
      _id: '4',
      title: 'Title test 4',
      duration: 119,
      categories: ['Horror'],
      image: '/images/carts/image-test4.jpg',
    },
  ],
  cartWidth: 260,
  cartHeight: 320,
};

const mockedProps = generalMockedProps;

const component = shallow(<CartSlider {...mockedProps}/>);

describe('Slider component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders CartsSliderList with proper props', () => {
    const cartsListEl = component.find('CartsSliderList');
    expect(cartsListEl.length).toBe(1);
    expect(cartsListEl.props()).toEqual({
      cartWidth: 260,
      activeCart: component.state('activeCart'),
      carts: mockedProps.data,
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

  it('renders CartsSliderPanel with proper props', () => {
    const instance = component.instance();

    const sliderPanelEl = component.find('Memo(CartsSliderPanel)');
    expect(sliderPanelEl.length).toBe(1);

    expect(sliderPanelEl.props()).toEqual({
      goToNextCart: instance.goToNextCart,
      goToPreviousCart: instance.goToPreviousCart,
      moviesAmount: mockedProps.data.length,
      isInactivePrev: true,
      isInactiveNext: false,
    });
  });

  it('updates carts in slides properly and updates buttons disable props', () => {
    const instance = component.instance();
    expect(instance.state.activeCart).toBe(0);
    // try to go to previous cart - should be impossible because cart is 0
    instance.goToPreviousCart();
    expect(instance.state.activeCart).toBe(0);
    // check icon buttons elements disabled prop after unsuccessful action
    let sliderPanelEl = component.find('Memo(CartsSliderPanel)');
    expect(sliderPanelEl.prop('isInactiveNext')).toBe(false);
    expect(sliderPanelEl.prop('isInactivePrev')).toBe(true);


    //try go to next carts to the end of data
    for(let i = 1; i < mockedProps.data.length; i++) {
      instance.goToNextCart();
      expect(instance.state.activeCart).toBe(i);
      // check icon buttons elements disabled prop after actions
      sliderPanelEl = component.find('Memo(CartsSliderPanel)');
      expect(sliderPanelEl.prop('isInactivePrev')).toBe(false);
      if(i === mockedProps.data.length - 1) {
        expect(sliderPanelEl.prop('isInactiveNext')).toBe(true);
      } else {
        expect(sliderPanelEl.prop('isInactiveNext')).toBe(false);
      }
    }
    
    //again try go to next cart - should be impossible because active cart is the last cart in data
    instance.goToNextCart();
    expect(instance.state.activeCart).toBe(mockedProps.data.length - 1);
    // check icon buttons elements disabled prop after unsuccessful action
    sliderPanelEl = component.find('Memo(CartsSliderPanel)');
    expect(sliderPanelEl.prop('isInactiveNext')).toBe(true);
    expect(sliderPanelEl.prop('isInactivePrev')).toBe(false);

    // try to go to previous carts to the end - to cart 0
    for(let i = mockedProps.data.length - 2; i === 0; i--) {
      instance.goToPreviousCart();
      expect(instance.state.activeCart).toBe(i);
      // check icon buttons elements disabled prop after actions
      sliderPanelEl = component.find('Memo(CartsSliderPanel)');
      expect(sliderPanelEl.prop('isInactivePrev')).toBe(false);
      if(i === 0) {
        expect(sliderPanelEl.prop('isInactiveNext')).toBe(true);
      } else {
        expect(sliderPanelEl.prop('isInactiveNext')).toBe(false);
      }
    }
  });
});