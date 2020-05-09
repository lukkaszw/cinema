import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

Object.defineProperty(window, 'innerWidth', {
  writable: true,
  value: 1920,
});

Object.defineProperty(window, 'scrollTo', {
  writable: false,
  value: function(scrollX, scrollY) {
    window.innerWidth = scrollX;
    window.innerHeight = scrollY;
  }
});

Object.defineProperty(window, 'location', {
  writable: true,
  value: {
    hash: '',
  }
});