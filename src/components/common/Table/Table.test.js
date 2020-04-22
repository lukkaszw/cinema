import React from 'react';
import { shallow } from 'enzyme';
import Table from './Table';

const mockedProps = {
  data: [
    {
      _id: '1',
      label: 'Label 1',
      value: 'Value 1', 
    },
    {
      _id: '2',
      label: 'Label 2',
      value: 'Value 2',
    },
    {
      _id: '3',
      label: 'Label 3',
      value: 'Value 3',
    },
  ],
};

const component = shallow(<Table {...mockedProps}/>);

describe('Table component', () => {
  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('includes table', () => {
    expect(component.find('table').exists()).toBeTruthy();
  });

  it('includes proper amount of rows', () => {
    expect(component.find('tr').length).toBe(mockedProps.data.length);
  });

  it('includes cells with proper text', () => {
    const rowsEl = component.find('tr');
    for(let i = 0; i < mockedProps.data.length; i++) {
      Object.keys(mockedProps.data[i]).forEach((column, index) => {
        if(column !== '_id') {
          expect(rowsEl.at(i).find('td').at(index - 1).text()).toBe(mockedProps.data[i][column]);
        }
      });
    }
  });
}); 