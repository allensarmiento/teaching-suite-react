import { shallow } from 'enzyme';
import ImageContent from './image-content.component';

it('renders one image component', () => {
  expect(shallow(<ImageContent content={['//:0']} />)).toMatchSnapshot();
});

it('renders mulitple images', () => {
  expect(shallow(<ImageContent content={['//:0', '//:0']} />))
    .toMatchSnapshot();
});
