import axios from 'axios';
import { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import styles from './top-navigation.module.scss';

interface User {
  id: string;
  email: string;
}

type PathParamsType = {};

type Props = RouteComponentProps<PathParamsType> & {
  title?: string;
  username?: string;
}

const TopNavigation = ({ title, username, history }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:4000/api/auth/currentuser',
        { withCredentials: true },
      );

      setCurrentUser(data.currentUser);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onSignOut = async () => {
    try {
      await axios.get(
        'http://localhost:4000/api/auth/signout',
        { withCredentials: true },
      );
      history.push('/sign-in');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Navbar className={styles.navbar} bg="dark" variant="dark" expand="sm">
      <Navbar.Brand href="#" className={styles.brand}>
        {title}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="nav-collapse-menu" />
      <Navbar.Collapse id="nav-collapse-menu">
        <Nav className={styles.nav}>
          <Nav.Link
            href="/"
            className={styles.link}
          >
            Home
          </Nav.Link>
          {currentUser ? (
            <NavDropdown
              id="basic-nav-dropdown"
              title={currentUser.email}
            >
              <NavDropdown.Item
                href="#"
                className={styles.item}
                disabled
              >
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item
                as="button"
                className={styles.item}
                onClick={onSignOut}
              >
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link
              href="/sign-in"
              className={styles.link}
            >
              Sign In
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(TopNavigation);
