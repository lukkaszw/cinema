import React from 'react';
import { shallow } from 'enzyme';
import CheckboxesList from './CheckboxesList';

const mockedProps = {
  items: [
    {
      value: 'value-1',
      text: 'text 1',
    },
    {
      value: 'value-2',
      text: 'text-2',
    },
  ],
  values: [],
  toggleAction: () => console.log('toggle value'),
};

const component = shallow(<CheckboxesList {...mockedProps} />);

const testCheckedValues = (values, expectedChecked) => {
  const testedProps = {
    ...mockedProps,
    values,
  };
  const compForChecked = shallow(<CheckboxesList {...testedProps} />);

  const checkboxesEl = compForChecked.find('Checkbox');
  checkboxesEl.forEach((checkbox, i) => {
    expect(checkbox.prop('checked')).toBe(expectedChecked[i]);
  });
}

describe('CheckboxesList component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it(`includes list with ${mockedProps.items.length} checkboxes with proper props`, () => {
    const checkboxesEl = component.find('ul Checkbox');
    expect(checkboxesEl.length).toBe(mockedProps.items.length);

    checkboxesEl.forEach((checkbox, i) => {
      expect(checkbox.props()).toEqual({
        value: mockedProps.items[i].value,
        text: mockedProps.items[i].text,
        checked: false,
        toggleAction: mockedProps.toggleAction,
      });
    });
  });

  it('has checkboxes with good checked value', () => {
    testCheckedValues([], [false, false]);
    testCheckedValues(['value-1', 'value-2'], [true, true]);
    testCheckedValues(['value-1'], [true, false]);
    testCheckedValues(['value-2'], [false, true]);
    testCheckedValues(['value-3'], [false, false]);
  });
});