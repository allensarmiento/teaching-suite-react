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
  if (!currentUser) {
    return <Redirect to="/sign-in" />;
  }

  return (
    <Route {...rest}>
      {children}
    </Route>
  );
};

export default PrivateRoute;
