import { shallow } from 'enzyme';
import BlueGreyButton from './blue-grey-button.component';

it('renders component', () => {
  expect(shallow(<BlueGreyButton>Button</BlueGreyButton>)).toMatchSnapshot();
});

it('renders component with className props', () => {
  expect(shallow(<BlueGreyButton className="large">Button</BlueGreyButton>))
    .toMatchSnapshot();
});

it('renders component with type props', () => {
  expect(shallow(<BlueGreyButton type="button">Button</BlueGreyButton>))
    .toMatchSnapshot();
});
