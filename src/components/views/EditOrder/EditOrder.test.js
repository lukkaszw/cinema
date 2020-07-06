import React from 'react';
import { shallow } from 'enzyme';
import EditOrder from './EditOrder';

const mockedProps = {
  token: 'someToken',
  showData: {},
  userData: {},
  isFetchingError: false,
  isFetching: false,
  orderedSeats: [],
  orderToEdit: {},
  fetchShowData: () => console.log('fetchShowData'),
  fetchSeats: () => console.log('fetchSeats'),
  updateSeats: () => console.log('updateSeats'), 
  editOrder: () => console.log('orderTickets'),
  resetShowData: () => console.log('resetShowData'),
};

const component = shallow(<EditOrder {...mockedProps}/>);

describe('EditOrder component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders Order component with proper props', () => {
    const orderEl = component.find('Order');
    expect(orderEl.length).toBe(1);
    expect(orderEl.props()).toEqual({
      fetchShowData: mockedProps.fetchShowData,
      showData: mockedProps.showData,
      isFetching: mockedProps.isFetching,
      isFetchingError: mockedProps.isFetchingError,
      token: mockedProps.token,
      userData: mockedProps.userData,
      orderedSeats: mockedProps.orderedSeats,
      fetchSeats: mockedProps.fetchSeats,
      updateSeats: mockedProps.updateSeats,
      match: mockedProps.match,
      isEditing: true,
      orderToEdit: mockedProps.orderToEdit,
      orderTickets: mockedProps.editOrder,
      resetShowData: mockedProps.resetShowData,
    });
  });

  it('renders EditOrderBottomBar component with proper props', () => {
    const editBottomBar = component.find('EditOrderBottomBar');
    expect(editBottomBar.length).toBe(1);
    expect(editBottomBar.props()).toEqual({
      orderToEdit: mockedProps.orderToEdit,
    });
  });
});