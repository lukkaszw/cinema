import React from 'react';
import { shallow } from 'enzyme';
import ContactForm from './ContactForm';

const mockedProps = {
  sendData: jest.fn(),
  resetForm: () => {},
}

const someDummyText = 'dasdsadsadasdasdsadasdsadasdadasdasdasdasdasdsdadaadadasdasada ';
let incorrectTextareaText = '';
const loopsCount = Math.ceil(1000 / someDummyText.length);
for(let i = 0; i < loopsCount; i++) {
  incorrectTextareaText += someDummyText;
}


let component;

const checkSentData = (providedData, isSent, expectedSentData) => {
  //check if sendData func is reseted
  expect(mockedProps.sendData).toHaveBeenCalledTimes(0);
  //change data of input and textarea
  component.find('InputField').prop('onChange')({ target: { value: providedData.email }});
  component.find('TextareaField').prop('onChange')({ target: { value: providedData.message }});
  component.find('Connect(Form)').prop('onSubmit')();

  const calledTimes = isSent ? 1 : 0;

  expect(mockedProps.sendData).toHaveBeenCalledTimes(calledTimes);
  if(expectedSentData) {
    expect(mockedProps.sendData).toHaveBeenCalledWith(expectedSentData);
  }
}


describe('ContactForm component', () => {
  beforeEach(() => {
    component = shallow(<ContactForm {...mockedProps}/>);
  })

  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  describe('Input field', () => {
    beforeEach(() => {
      component = shallow(<ContactForm {...mockedProps}/>);
    })

    it('renders input field with proper value after mount', () => {
      const inputFieldEl = component.find('InputField');
      expect(inputFieldEl.exists()).toBeTruthy();
      expect(inputFieldEl.prop('value')).toBe('');
    });

    it('renders input field without error and message at the begining', () => {
      const inputFieldEl = component.find('InputField');
      expect(inputFieldEl.prop('isError')).toBe(false);
      expect(inputFieldEl.prop('message')).toBe('');
    });

    it('changes input value on event change', () => {
      const expectedText = 'new input text';
      component.find('InputField').prop('onChange')({ target: { value: expectedText }});
      expect(component.find('InputField').prop('value')).toBe(expectedText);
    });

    it('renders input error if incorrect email value is provided', () => {
      const expectedText = 'some invalid email';
      component.find('InputField').prop('onChange')({ target: { value: expectedText }});
      expect(component.find('InputField').prop('isError')).toBe(true);
    });

    it('does not renders email empty string is provided', () => {
      const expectedText = '';
      component.find('InputField').prop('onChange')({ target: { value: expectedText }});
      expect(component.find('InputField').prop('isError')).toBe(false);
    });

    it('does not render error if correct value is provided', () => {
      const expectedText = 'correctemail@gmail.com';
      component.find('InputField').prop('onChange')({ target: { value: expectedText }});
      expect(component.find('InputField').prop('isError')).toBe(false);
    });
  });

  describe('Textarea field', () => {
    beforeEach(() => {
      component = shallow(<ContactForm {...mockedProps}/>);
    })

    it('renders textarea field with proper value after mount', () => {
      const textareaFieldEl = component.find('TextareaField');
      expect(textareaFieldEl.exists()).toBeTruthy();
      expect(textareaFieldEl.prop('value')).toBe('');
    });
  
    it('renders textarea field without error at the begining', () => {
      const textareaFieldEl = component.find('TextareaField');
      expect(textareaFieldEl.prop('isError')).toBe(false);
      expect(textareaFieldEl.prop('message')).toBe('');
    });

    it('changes textarea field on event change', () => {
      const expectedText = 'new textarea text';
      component.find('TextareaField').prop('onChange')({ target: { value: expectedText }});
      expect(component.find('TextareaField').prop('value')).toBe(expectedText);
    });

    it('renders textarea error if incorrect value (more than 1000 chars) is provided', () => {
  
      component.find('TextareaField').prop('onChange')({ target: { value: incorrectTextareaText }});
      expect(component.find('TextareaField').prop('isError')).toBe(true);
    });

    it('does not renders textarea error if empty string is provided', () => {
      const expectedText = '';
      component.find('TextareaField').prop('onChange')({ target: { value: expectedText }});
      expect(component.find('TextareaField').prop('isError')).toBe(false);
    });

    it('does not render textarea error if correct value (less than 1000 chars) is provided', () => {
      const correctValue = 'some correct message';

      component.find('TextareaField').prop('onChange')({ target: { value: correctValue }});
      expect(component.find('TextareaField').prop('isError')).toBe(false);
    });
  });

  describe('Form element', () => {
    beforeEach(() => {
      mockedProps.sendData = jest.fn();
      component = shallow(<ContactForm {...mockedProps}/>);
    })

    it('renders form element connected to redux', () => {
      expect(component.find('Connect(Form)').exists()).toBeTruthy();
    });
  
    it('fires sendData function from props with proper value on submit form if data is correct', () => {
      const expectedData = { email: 'dummyemail@gmail.com', message: 'correct message' }
      checkSentData(expectedData, true, expectedData);
    });
  
    it('does not fire sendData on submit form if email is empty string', () => {
      const expectedData = { email: '', message: 'correct message'};
      checkSentData(expectedData, false);
    });

    it('does not fire sendData on submit form if textarea is empty string', () => {
      const expectedData = { email: 'correctemail@wp.pl', message: ''};
      checkSentData(expectedData, false);
    });
  
    it('does not fire sendData on submit form if textarea email is incorrect', () => {
      const expectedData = { email: 'incorrectemail.pl', message: 'correct message'};
      checkSentData(expectedData, false);
    });

    it('does not fire sendData on submit form if textarea text is incorrect', () => {
      const expectedData = { email: 'correctemail@wp.pl', message: incorrectTextareaText };
      checkSentData(expectedData, false);
    });
  })
});