import React from 'react';
import { shallow } from 'enzyme';
import Ticket from './Ticket';

const mockedProps = {
  ticketId: '1A',
  onCancel: () => console.log('on cancel'),
  price: 10,
};

const component = shallow(<Ticket {...mockedProps} />);

describe('Ticket component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders 2 columns with proper text', () => {
    const columnEl = component.find('.column');
    expect(columnEl.length).toBe(2);
    const expSeatText = 'seat:1';
    expect(columnEl.at(0).text()).toBe(expSeatText);
    const expRowText = 'row:A';
    expect(columnEl.at(1).text()).toBe(expRowText);
  });

  it('renders proper price text', () => {
    const priceEl = component.find('.value').at(2);
    expect(priceEl.text()).toBe(`${mockedProps.price}$`);
  });

  it('renders proper IconButton el to cancel ticket', () => {
    const iconBtnEl = component.find('IconButton');
    expect(iconBtnEl.prop('action')).toBe(mockedProps.onCancel);
  });
});