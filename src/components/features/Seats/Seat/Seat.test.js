import React from 'react';
import { shallow } from 'enzyme';
import Seat from './Seat';


const mockedProps = {
  onClick: jest.fn(),
  disabled: false,
  chosen: false,
};

const disabledProps = {
  ...mockedProps,
  disabled: true,
};

const chosenProps = {
  ...mockedProps,
  chosen: true,
}

const component = shallow(<Seat {...mockedProps}/>);
const componentDisabled = shallow(<Seat {...disabledProps} />);
const componentChosen = shallow(<Seat {...chosenProps} />);

describe('Seat component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
    expect(componentChosen).toBeTruthy();
    expect(componentChosen).toBeTruthy();
  });

  it('renders button with proper props', () => {
    let btnEl = component.find('button');
    expect(btnEl.props()).toEqual({
      onClick: mockedProps.onClick,
      disabled: false,
      className: 'root',
    });

    btnEl = componentDisabled.find('button');
    expect(btnEl.props()).toEqual({
      onClick: disabledProps.onClick,
      disabled: true,
      className: 'root',
    });

    btnEl = componentChosen.find('button');
    expect(btnEl.props()).toEqual({
      onClick: chosenProps.onClick,
      disabled: false,
      className: 'root chosen',
    });
  });

  it('fires proper function when button is clicked', () => {
    expect(mockedProps.onClick).toHaveBeenCalledTimes(0);
    const btnEl = component.find('button');
    btnEl.prop('onClick')();
    expect(mockedProps.onClick).toHaveBeenCalledTimes(1);
  });
});