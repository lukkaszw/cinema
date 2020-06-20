import React from 'react';
import { shallow } from 'enzyme';
import EditOrderBottomBar from './EditOrderBottomBar';

const mockedProps = {
  orderToEdit: {
    seats: ['1A', '2B'],
    showId: {
      day: 2,
      startAt: '22:00',
      movieId: {
        title: 'Title',
      }
    },
    showDate: 'WED DEC 2 2020 22:00 GMT+0200',
  }
};

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

let component;

describe('BottomBar component', () => {

  beforeEach(() => {
    component = shallow(<EditOrderBottomBar {...mockedProps}/>);
  });

  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders proper text', () => {
    const mockComp = shallow(<EditOrderBottomBar {...mockedProps} />);
    const textEl = mockComp.find('.text');
    expect(textEl.length).toBe(1);
    expect(textEl.text()).toBe('2 DEC22:00Title');
  });

  it('renders one "Cancel" Button', () => {
    const btnEl = component.find('Button');
    expect(btnEl.length).toBe(1);
    expect(btnEl.prop('children')).toBe('Cancel');
  });

  it('renders other text after Button was clicked', () => {
    //simulate 'Cancel' clik
    component.find('Button').prop('action')();

    const textEl = component.find('.text');
    expect(textEl.length).toBe(1);
    expect(textEl.text()).toBe('Are you sure you want to cancel editing?');
  });

  it('renders two Buttons: "No" and "Yes" after Button Cancel was clicked', () => {
    //simulate 'Cancel' clik
    component.find('Button').prop('action')();

    const btnEl = component.find('Button');
    expect(btnEl.length).toBe(2);
    expect(btnEl.at(0).prop('children')).toBe('No');
    expect(btnEl.at(1).prop('children')).toBe('Yes');
  });


  it('renders the same text and one "Cancel" Button when Button "No" was clicked', () => {
    //simulate 'Cancel' clik
    component.find('Button').prop('action')();

    //simulate 'No' click
    const noBtnEl = component.find('Button').at(0);
    noBtnEl.prop('action')();
    const textEl = component.find('.text');
    expect(textEl.text()).toBe('2 DEC22:00Title');
  });

  it('renders the same one "Cancel" Button when Button "No" was clicked', () => {
    //simulate 'Cancel' clik
    component.find('Button').prop('action')();

    //simulate 'No' click
    const noBtnEl = component.find('Button').at(0);
    noBtnEl.prop('action')();
    
    const btnEl = component.find('Button');
    expect(btnEl.length).toBe(1);
    expect(btnEl.prop('children')).toBe('Cancel');
  });
});