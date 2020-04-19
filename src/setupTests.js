import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

Object.defineProperty(window, 'innerWidth', {
  writable: true,
  value: 1920,
});