import { mount, shallow } from 'enzyme';
import SignIn from './sign-in.component';
import { CurrentUser } from '../../App';
import BlueGreyButton from '../../core/blue-grey-button/blue-grey-button.component';

const signinFn = jest.fn();
const email = 'test@test.com';
const password = '12345';

it('renders sign in form component if user not signed in', () => {
  expect(shallow(<SignIn currentUser={null} signin={signinFn} />))
    .toMatchSnapshot();
});

it('renders submit button', () => {
  const wrapper = shallow(<SignIn currentUser={null} signin={signinFn} />);

  const button = wrapper.find(BlueGreyButton);
  expect(button.prop('type')).toEqual('submit');
});

it('redirects to home page if user is signed in', () => {
  const mockCurrentUser: CurrentUser = {
    id: 1,
    email: 'test@test.com',
    role: 'student',
  };

  expect(shallow(<SignIn currentUser={mockCurrentUser} signin={signinFn} />))
    .toMatchSnapshot();
});

it('updates state on input change', () => {
  const wrapper = shallow(<SignIn currentUser={null} signin={signinFn} />);

  const emailInput = wrapper.find('[name="email"]');
  emailInput.simulate('change', { target: {
    value: email,
    name: 'email',
  }});

  const passwordInput = wrapper.find('[name="password"]');
  passwordInput.simulate('change', { target: {
    value: password,
    name: 'password',
  }});
  
  expect(wrapper.state()).toEqual({ email, password });
});

it('calls sign in function on form submit', () => {
  const wrapper = mount(<SignIn currentUser={null} signin={signinFn} />);

  const emailInput = wrapper.find('[name="email"]');
  emailInput.simulate('change', { target: {
    value: email,
    name: 'email',
  }});

  const passwordInput = wrapper.find('[name="password"]');
  passwordInput.simulate('change', { target: {
    value: password,
    name: 'password',
  }});

  wrapper.update();

  const form = wrapper.find('form');
  form.simulate('submit');
  expect(signinFn).toHaveBeenCalledTimes(1);
  expect(signinFn).toHaveBeenCalledWith(email, password);
});
