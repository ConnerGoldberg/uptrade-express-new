import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NavbarBrand, Collapse, Row, Nav, Button, Navbar, NavbarToggler, ButtonGroup } from 'reactstrap';
import { logOut } from '../../actions/auth/authActions';
import logo from '../../assets/OldLogo.jpg';
import './header.css';
const Header = ({ module, data, ...attributes }) => {
  // Redux Selectors
  const user = useSelector((state) => state.auth.user);
  // Redux Dispatch
  const dispatch = useDispatch();
  const doLogout = useCallback((user) => dispatch(logOut(user)), [dispatch]);

  return (
    <div>
      <header className="topbar">
        <Navbar className="navbarbg" expand="md">
          <NavbarBrand href="/">
            <img src={logo} alt="logo" />
          </NavbarBrand>
          {module === 'authenticated' ? (
            <Nav className="ml-auto signupNav" navbar>
              <Row>
                {' '}
                <p className="centered"> Welcome {user.email} </p>{' '}
                <Link
                  className="link"
                  to="/"
                  onClick={() => {
                    doLogout(user);
                  }}
                >
                  <Button outline color="secondary" size="md" className="signup-btn">
                    Logout
                  </Button>{' '}
                </Link>
              </Row>
            </Nav>
          ) : (
            <Nav className="ml-auto signupNav" navbar>
              <Row>
                <p className="centered"> Already have an account? </p>

                <a href="/login">
                  <Button outline color="info" size="lg" className="signup-btn">
                    Log In{' '}
                  </Button>
                </a>

                <a href="/signup">
                  <Button outline color="secondary" size="lg">
                    Sign Up
                  </Button>
                </a>
              </Row>
            </Nav>
          )}
        </Navbar>
      </header>
    </div>
  );
};
export default Header;
