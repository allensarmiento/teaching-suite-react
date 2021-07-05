import axios from 'axios';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, Switch, withRouter } from 'react-router-dom';

import './App.css';

import PrivateRoute from './core/private-route/private-route.component';
import TopNavigation from './components/top-navigation/top-navigation.component';

import Classroom from './pages/classroom/classroom.component';
import Homepage from './pages/homepage/homepage.component';
import SignIn from './pages/sign-in/sign-in.component';

type PathParamsType = {};

type Props = RouteComponentProps<PathParamsType> & {}

export interface CurrentUser {
  email: string;
}

interface State {
  currentUser: CurrentUser | null;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      currentUser: null,
    };
  }

  fetchCurrentUser = async (callback?: (() => void)) => {
    try {
      const { data } = await axios.get(
        'http://localhost:4000/api/auth/currentuser',
        { withCredentials: true },
      );
      this.setState({ currentUser: data.currentUser }, callback);
    } catch (err) {
      console.log(err);
    }
  }

  async componentDidMount() {
    await this.fetchCurrentUser();
  }

  signin = async (email: string, password: string) => {
    let loggedInUser = null;

    try {
      const { data: user } = await axios.post(
        'http://localhost:4000/api/auth/signin',
        { email, password },
        { withCredentials: true },
      );

      loggedInUser = user;
    } catch (err) {
      console.log(err);
    }

    if (loggedInUser) {
      this.fetchCurrentUser(() => {
        this.props.history.push('/');
      });
    }
  }

  signout = async () => {
    try {
      await axios.get(
        'http://localhost:4000/api/auth/signout',
        { withCredentials: true },
      );
    } catch (err) {
      console.log(err);
    }

    this.setState({ currentUser: null }, () => {
      this.props.history.push('/sign-in');
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="App">
        <TopNavigation
          title="Teaching Suite"
          currentUser={currentUser}
          signout={this.signout}
        />
        <Switch>
          <PrivateRoute
            currentUser={currentUser}
            path="/classroom/:id"
            component={Classroom}
          />
          <Route path="/sign-in">
            <SignIn
              currentUser={currentUser}
              signin={this.signin}
            />
          </Route>
          <PrivateRoute currentUser={currentUser} path="/">
            <Homepage currentUser={currentUser} />
          </PrivateRoute>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
