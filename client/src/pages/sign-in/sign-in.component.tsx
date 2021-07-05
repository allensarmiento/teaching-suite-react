import axios from 'axios';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import styles from './sign-in.module.scss';

type PathParamsType = {};

type Props = RouteComponentProps<PathParamsType> & {};

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

    try {
      const { data: user } = await axios.post(
        'http://localhost:4000/api/auth/signin',
        { email, password },
        { withCredentials: true },
      );

      if (user) {
        this.props.history.push('/');
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { email, password } = this.state;

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

export default withRouter(SignIn);
