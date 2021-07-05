import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { CurrentUser } from '../../App';

import styles from './top-navigation.module.scss';

interface Props {
  title?: string;
  currentUser?: CurrentUser | null;
  signout: Function;
}

const TopNavigation = ({ title, currentUser, signout }: Props) => {
  const onSignoutClicked = async () => await signout();

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
                onClick={onSignoutClicked}
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

export default TopNavigation;
