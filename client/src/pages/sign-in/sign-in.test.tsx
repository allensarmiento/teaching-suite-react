import { mount, shallow } from 'enzyme';
import SignIn from './sign-in.component';
import { CurrentUser } from '../../App';
import BlueGreyButton from '../../core/blue-grey-button/blue-grey-button.component';

it('renders sign in form if user not signed in', () => {
  const signin = jest.fn();

  expect(shallow(<SignIn currentUser={null} signin={signin} />))
    .toMatchSnapshot();
});

it('redirects to home page if user is signed in', () => {
  const mockCurrentUser: CurrentUser = {
    id: 1,
    email: 'test@test.com',
    role: 'student',
  };

  const signin = jest.fn();

  expect(shallow(<SignIn currentUser={mockCurrentUser} signin={signin} />))
    .toMatchSnapshot();
});

it('updates state on input change', () => {
  const signin = jest.fn();
  const email = 'test@test.com';
  const password = '12345';

  const wrapper = shallow(<SignIn currentUser={null} signin={signin} />);

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

it.todo('calls sign in function on form submit');
