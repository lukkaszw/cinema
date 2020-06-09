import React from 'react';
import { shallow } from 'enzyme';
import TicketsSummary from './TicketsSummary';

const mockedProps = {
  tickets: ['1A', '2B'],
  price: 10,
};

const component = shallow(<TicketsSummary {...mockedProps}/>);

describe('TicketsSummary component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders h3 element with proper text', () => {
    const h3El = component.find('h3');
    expect(h3El.exists()).toBeTruthy();
    const expTotalPrice = mockedProps.tickets.length * mockedProps.price;
    expect(h3El.text()).toBe(`Total price: ${expTotalPrice} $`);
  });
});