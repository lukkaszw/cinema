import React from 'react';
import { mount } from 'enzyme';
import Gallery from './Gallery';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import createTouchEvent from '../../../utils/createTouchEvent/createTouchEvent.helper';

const mockedProps = {
  padImage: 'pad-image.jpg',
  gallery: [
    '/images-1.jpg',
    '/images-2.jpg',
    '/images-3.jpg',
    '/images-4.jpg',
    '/images-5.jpg',
  ],
  title: 'Test Title',
};

describe('Gallery component', () => {
  describe('rendering', () => {
    const component = mount(<Gallery {...mockedProps}/>);

    it('renders without crashing', () => {
      expect(component).toBeTruthy();
    });
  
    it(`renders list with ${mockedProps.gallery.length} images`, () => {
      const listEl = component.find('.list');
      expect(listEl.exists()).toBeTruthy();
      const imageEl = listEl.find('img');
      expect(imageEl.length).toBe(mockedProps.gallery.length);
      imageEl.forEach((imgEl, i) => {
        expect(imgEl.prop('src')).toBe(mockedProps.gallery[i])
      });
    });
  
    it('has images with proper alt prop from title prop', () => {
      const imageEl = component.find('.list img');
  
      imageEl.forEach((imgEl, i) => {
        const expectedTitle = component.props().title + '-' + i;
        expect(imgEl.prop('alt')).toBe(expectedTitle);
      });
    });
  
    it('has pad-image.jpg to keep responsive width and height of the images', () => {
      const padImageEl = component.find('.pad');
      expect(padImageEl.exists()).toBeTruthy();
      expect(padImageEl.prop('src')).toBe(mockedProps.padImage);
    });
  
    it('has to two icon buttons with proper arrows and functions in actions', () => {
      const iconBtnEl = component.find('IconButton');
      expect(iconBtnEl.length).toBe(2);
      expect(iconBtnEl.at(0).prop('icon')).toEqual(faChevronLeft);
      expect(iconBtnEl.at(1).prop('icon')).toEqual(faChevronRight);
    });
  
    it('renders good description at start', () => {
      const descrEl = component.find('.descr');
      expect(descrEl.exists()).toBeTruthy();
      expect(descrEl.text()).toBe(`1/${mockedProps.gallery.length}`);  
    });
  
    it('renders good slider list container position at the start', () => {
      const sliderListEL = component.find('.list');
      expect(sliderListEL.prop('style')).toEqual({ transform: 'translateX(-0%)' });
    });
  });

  describe('user interaction', () => {

    let component;
    const ALL_IMGS = mockedProps.gallery.length;
    const LAST_IMG = ALL_IMGS;

    beforeEach(() => {
      component = component = mount(<Gallery {...mockedProps}/>);
    });

    const checkExpectedImage = (imageNr) => {
      expect(component.find('.descr').text()).toBe(`${imageNr}/${ALL_IMGS}`);
      const expectPercent = `-${((imageNr - 1)/ALL_IMGS) * 100}%`;
      expect(component.find('.list').prop('style')).toEqual({ transform: `translateX(${expectPercent})` });
    }


    it('renders description and slider properly when user click on buttons', () => {
      
      //user clicks prev btn trying to go to prev image - ignored because first image is viewed on screen 
      component.find('button').at(0).simulate('click');
      checkExpectedImage(1);

      //user is clicking the next btn - tries to go to next images
      mockedProps.gallery.forEach((image, i) => {
        component.find('button').at(1).simulate('click');
        //if this is last image clicking for changes should be ignored - last image already is viewed on screen
        if(i === ALL_IMGS - 1) {
          checkExpectedImage(LAST_IMG);
        } else {
          const expectedImg = i + 2;
          checkExpectedImage(expectedImg);
        }
      });

      //user is clicking prev btn - tries to go to prev images until first image
      for(let i = ALL_IMGS; i > 1; i--) {
        component.find('button').at(0).simulate('click');
        const expectedImg = i - 1;
        checkExpectedImage(expectedImg);
      }
    });

    it('renders description and slider properly when user uses touch screen', () => {
      const sliderEL = component.find('.list');

      const simulateUserTouch = (startPos = {x : 0, y : 0}, endPos = {x : 0, y : 0}) => {
        sliderEL.simulate('touchStart', createTouchEvent(startPos));
        sliderEL.simulate('touchMove', createTouchEvent(endPos));
        sliderEL.simulate('touchEnd');
      }

      /* user tries to go to next image correctly 
      different between start touch and touch on begining should be more than -50 points */
      for(let i = 1; i <= ALL_IMGS; i++) {
        const startX = Math.floor(Math.random() * 1000 + 100);
        const endX = startX - 51; 
        // y position should not matter but to check it we can get some random values
        const startY = Math.floor(Math.random() * 1000);
        const endY = Math.floor(Math.random() * 1000);
        simulateUserTouch({ x: startX, y: startY}, { x: endX, y : endY});
        //if it is the last image, image on screen should not be updated
        if(i === ALL_IMGS) {
          checkExpectedImage(i);
        } else {
          const expectedImg = i + 1;
          checkExpectedImage(expectedImg);
        }
      }

       /* user tries to go to previous image correctly 
      different between start touch and touch on begining should be more than +50 points */
      for(let i = ALL_IMGS; i > 0; i--) {
        const startX = Math.floor(Math.random() * 1000);
        const endX = startX + 51; 
        const startY = Math.floor(Math.random() * 1000);
        const endY = Math.floor(Math.random() * 1000);
        simulateUserTouch({ x: startX, y: startY}, { x: endX, y : endY});
        // if it is the first image, image on screen should not be updated
        if(i === 1) {
          checkExpectedImage(i);
        } else {
          const expectedImg = i - 1;
          checkExpectedImage(expectedImg);
        }
      }
    });
  });
});