import React from 'react';
import { shallow } from 'enzyme';
import OrderItem from './OrderItem';
import { getDateString } from '../../../utils/getDate/getDate';

const mockedProps = {
  _id: '1',
  showId: {
    movieId: {
      title: 'Some title',
    },
    day: 21,
    startAt: '22:00',
    hall: 2,
  },
  seats: ['1A', '2A'],
  email: 'somemail@wp.pl',
  phone: '666 666 666',
  price: 20,
  surname: 'Surname',
  name: 'Name',
  showDate: 'SUN JUN 21 2020 22:00 GMT+0200',
  isActive: false,
  onDelete: jest.fn(),
  onEdit: jest.fn(),
};

const component = shallow(<OrderItem {...mockedProps}/>);

describe('OrderItem component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders header with title, date and hour', () => {
    const expectedTitle = mockedProps.showId.movieId.title;
    const expectedHour = mockedProps.showId.startAt;
    const expectedDate = getDateString(mockedProps.showDate);

    const headerEl = component.find('.header');
    expect(headerEl.exists()).toBeTruthy();

    const titleEl = headerEl.find('.title');
    expect(titleEl.text()).toBe(expectedTitle);
    const dateEl = headerEl.find('.date');
    expect(dateEl.text()).toBe(expectedDate);
    const hourEl = headerEl.find('.dates span').at(1);
    expect(hourEl.text()).toBe(expectedHour);
  });

  it('renders proper info about hall nr', () => {
    const expected = mockedProps.showId.hall.toString();
    const hallEl = component.find('.important').at(0);
    expect(hallEl.text()).toBe(expected);
  });

  it('renders proper info about tickets amount', () => {
    const expected = mockedProps.seats.length.toString();
    const ticketsAmountEl = component.find('.important').at(1);
    expect(ticketsAmountEl.text()).toBe(expected)
  });

  it('renders proper info about ordered seats', () => {
    const expected = mockedProps.seats.join(', ');
    const seatsEl = component.find('.tickets span').at(1);
    expect(seatsEl.text()).toBe(expected);
  });

  it('renders proper info about user', () => {
    const expected = `${mockedProps.name} ${mockedProps.surname}`;
    const userEl = component.find('.important').at(2);
    expect(userEl.text()).toBe(expected);
  });

  it('renders proper info about email', () => {
    const expected = mockedProps.email;
    const emailEl = component.find('.data').at(3).find('span').at(1);
    expect(emailEl.text()).toBe(expected);
  });

  it('renders proper info about phone', () => {
    const expected = mockedProps.phone;
    const phoneEl = component.find('.data').at(4).find('span').at(1);
    expect(phoneEl.text()).toBe(expected);
  });

  it('renders proper info about price', () => {
    const expected = `${mockedProps.price}$`;
    const priceEl = component.find('.data').at(5).find('span').at(1);
    expect(priceEl.text()).toBe(expected);
  });

  it('renders 2 Buttons', () => {
    const btnEl = component.find('Button');
    expect(btnEl.length).toBe(2);
  });

  it('renders first Button for edit', () => {
    const btnEditEl = component.find('Button').at(0);
    expect(btnEditEl.props()).toEqual({
      action: mockedProps.onEdit,
      children: 'Edit',
      variants: ['small', 'secondary'],
      disabled: false,
    });
  });

  it('renders second Button for delete', () => {
    const btnEditEl = component.find('Button').at(1);
    expect(btnEditEl.props()).toEqual({
      action: mockedProps.onDelete,
      children: 'Delete',
      variants: ['small'],
    });
  });
});