import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from './top-navigation.module.scss';

interface Props {
  title?: string;
  username?: string;
}

const TopNavigation = ({ title, username }: Props) => {
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
          <NavDropdown
            id="basic-nav-dropdown"
            title={username}
          >
            <NavDropdown.Item
              href="#"
              className={styles.item}
              disabled
            >
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item href="#" className={styles.item}>
              Sign Out
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopNavigation;
