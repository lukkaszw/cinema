import React from 'react';
import { shallow } from 'enzyme';
import PurchaserDetails from './PurchaserDetails';

const mockedProps = {
  name: 'Name',
  surname: 'Surname',
  phone: '111 111 111',
  email: 'someemail@gmail.com',
};

const component = shallow(<PurchaserDetails {...mockedProps} />);

describe('PurchaserDetails component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders info about name and surname', () => {
    const expectedText = `${mockedProps.name} ${mockedProps.surname}`;
    const nameSurnEl = component.find('.value').at(0);
    expect(nameSurnEl.text()).toBe(expectedText);
  });

    it('renders info about phone and emial', () => {
    const contactEl = component.find('.contactItem');
    expect(contactEl.at(0).text()).toBe(mockedProps.phone);
    expect(contactEl.at(1).text()).toBe(mockedProps.email);
  });
});