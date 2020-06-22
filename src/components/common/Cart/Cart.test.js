import React from 'react';
import { shallow } from 'enzyme';
import { Cart } from './Cart';

const mockedProps = {
  _id: '1',
  title: 'Title test 1',
  duration: 120,
  played: 'current',
  categories: ['Action', 'Drama'],
  image: '/images/carts/image-test.jpg',
};

const mockedPropsForFutureCart = {
  _id: '1',
  title: 'Title test 1',
  duration: 120,
  played: 'soon',
  categories: ['Action', 'Drama'], 
  image: '/images/carts/image-test.jpg',
}

const component = shallow(<Cart {...mockedProps}/>);
const futureComponent = shallow(<Cart {...mockedPropsForFutureCart} />);

describe('Cart component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
    expect(futureComponent).toBeTruthy();
  });

  it(`includes Link with props "to" with proper link to site`, () => {
    const expectedLink = `/movies/${mockedProps._id}`;
    const linkEl = component.find('Link');
    expect(linkEl.exists()).toBeTruthy();
    expect(linkEl.prop('to')).toBe(expectedLink);
  });

  it('includes image with props src with proper link to image', () => {
    const imageEl = component.find('img.image');
    expect(imageEl.exists()).toBeTruthy();
    expect(imageEl.prop('src')).toBe(mockedProps.image);
    expect(imageEl.prop('alt')).toBe(mockedProps.title);
  });

  it('includes title element with proper text', () => {
    const titleEl = component.find('h3.title');
    expect(titleEl.exists()).toBeTruthy();
    expect(titleEl.text()).toBe(mockedProps.title);
  });

  it('includes description element with proper text', () => {
    const { categories, duration } = mockedProps;
    const expectedText = `${duration} min | ${categories.join(' ').toUpperCase()}`;
    const descrEl = component.find('p.descr');
    expect(descrEl.exists()).toBeTruthy();
    expect(descrEl.text()).toBe(expectedText);

    const mockedPropsWithoutDuration = {...mockedProps};
    mockedPropsWithoutDuration.duration = null;
    const componentWithoutDuration = shallow(<Cart {...mockedPropsWithoutDuration}/>);
    const expectedTextWithoutDuration = `${categories.join(' ').toUpperCase()}`;
    const descrEl2 = componentWithoutDuration.find('p.descr');
    expect(descrEl2.exists()).toBeTruthy();
    expect(descrEl2.text()).toBe(expectedTextWithoutDuration);
  });

  it('includes date belt element if played prop value is soon', () => {
    expect(component.find('.dateBelt').exists()).toBeFalsy();
    expect(futureComponent.find('.dateBelt').exists()).toBeTruthy();
  });

  it('includes date belt with text "Coming soon!" by default', () => {
    expect(futureComponent.find('.dateBelt').text()).toBe('Coming soon!');
  });

  it('includes date belt with text from playDate prop if it is provided', () => {
    const expectedDateText = '12.01.2020';
    const propsWithPlayDate = {...mockedPropsForFutureCart, playDate: expectedDateText};
    const componentWithPlayDate = shallow(<Cart {...propsWithPlayDate} />);
    expect(componentWithPlayDate.find('.dateBelt').text()).toBe(expectedDateText);
  });
});