import React from 'react';
import { shallow } from 'enzyme';
import ShowsDetails from './ShowsDetails';

const mockedProps = {
  title: 'Title', 
  img: '/img.jpg', 
  date: {
    date: '11 JUN',
    dayOfWeek: 'THU',
  }, 
  hour: '22:00', 
  hall: 2, 
  technology: '2d', 
  price: 10,
};
const component = shallow(<ShowsDetails {...mockedProps}/>);

describe('ShowsDetails component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders details with 4 items with proper text inside', () => {
    const itemEl = component.find('.details .item');
    expect(itemEl.length).toBe(4);
    expect(itemEl.at(0).text()).toBe(mockedProps.date.date);
    expect(itemEl.at(1).text()).toBe(mockedProps.date.dayOfWeek);
    expect(itemEl.at(2).text()).toBe(mockedProps.hour);
    expect(itemEl.at(3).text()).toBe(`hall: ${mockedProps.hall}`);
  });

  it('renders technology element with proper text', () => {
    const techEl = component.find('.technology');
    expect(techEl.text()).toBe(mockedProps.technology);
  });

  it('renders price element with proper text', () => {
    const priceEl = component.find('.price');
    expect(priceEl.text()).toBe(`${mockedProps.price}$`);
  });
});