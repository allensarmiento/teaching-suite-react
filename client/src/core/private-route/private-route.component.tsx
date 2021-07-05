import { ReactNode } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { CurrentUser } from '../../App';

interface Props {
  children?: ReactNode;
  currentUser: CurrentUser | null;
  path: string;
  component?: any;
};

const PrivateRoute = ({ children, currentUser, ...rest }: Props) => {
  return (
    <Route {...rest} render={() => {
      return currentUser
        ? children
        : <Redirect to="/sign-in" />
    }} />
  );
};

export default PrivateRoute;
