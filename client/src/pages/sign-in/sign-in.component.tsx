import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import styles from './sign-in.module.scss';

import { CurrentUser } from '../../App';

interface Props {
  currentUser: CurrentUser | null;
  signin: Function;
};

interface State {
  email: string;
  password: string;
}

class SignIn extends Component<Props, Partial<State>> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const { email, password } = this.state;

    await this.props.signin(email, password);
  }

  render() {
    const { email, password } = this.state;

    if (this.props.currentUser) {
      return <Redirect to="/" />;
    }

    return (
      <div className={styles.signin}>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            required
          />
          <label>Email</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            required
          />
          <label>Password</label>
          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  }
}

export default SignIn;
