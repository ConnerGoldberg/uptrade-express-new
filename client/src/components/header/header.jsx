import React from 'react';
import { Link } from 'react-router-dom';
import { NavbarBrand, Collapse, Row, Nav, Button, Navbar, NavbarToggler, ButtonGroup } from 'reactstrap';
import history from '../../history';
import logo from '../../assets/OldLogo.jpg';
import './header.css';
class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  handleLogout = () => {
    console.log('TODO: logging out');
  };

  render() {
    const { data, module } = this.props;

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
                  <p className="centered"> Welcome {data.user.fName} </p>{' '}
                  <Button outline color="secondary" size="lg">
                    Logout
                  </Button>{' '}
                </Row>
              </Nav>
            ) : (
              <Nav className="ml-auto signupNav" navbar>
                <Row>
                  <p className="centered"> Already have an account? </p>

                  <Link
                    className="link"
                    to="/login"
                    onClick={() => {
                      history.push('/login');
                    }}
                  >
                    <Button outline color="info" size="lg" className="signup-btn">
                      Log In{' '}
                    </Button>
                  </Link>

                  <Link
                    className="link"
                    to="/signup"
                    onClick={() => {
                      history.push('/signup');
                    }}
                  >
                    <Button outline color="secondary" size="lg">
                      Sign Up
                    </Button>
                  </Link>
                </Row>
              </Nav>
            )}
          </Navbar>
        </header>
      </div>
    );
  }
}
export default Header;
