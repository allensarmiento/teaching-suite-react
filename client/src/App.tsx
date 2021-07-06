import axios from 'axios';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, Switch, withRouter } from 'react-router-dom';

import './App.css';

import TopNavigation from './components/top-navigation/top-navigation.component';

import PrivateRoute from './core/private-route/private-route.component';

import Classroom from './pages/classroom/classroom.component';
import Homepage from './pages/homepage/homepage.component';
import Review from './pages/review/review.component';
import SignIn from './pages/sign-in/sign-in.component';

type PathParamsType = {
  id: string;
};

interface Props extends RouteComponentProps<PathParamsType> {}

export interface CurrentUser {
  id: number;
  email: string;
  role: string;
}

interface State {
  loading: boolean;
  currentUser: CurrentUser | null;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loading: true,
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
    await this.fetchCurrentUser(() => {
      this.setState({ loading: false });
    });
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
    const { currentUser, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>
    }

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
            //@ts-ignore
            render={(props) => (
              <Classroom currentUser={currentUser} {...props} />
            )}
          />
          <PrivateRoute
            currentUser={currentUser}
            path="/review/:id"
            component={Review}
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
