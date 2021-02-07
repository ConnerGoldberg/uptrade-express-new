import React from "react";
import {
  NavbarBrand,
  Collapse,
  Nav,
  Button,
  Navbar,
  NavbarToggler,
} from "reactstrap";
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
    console.log("TODO: logging out");
  };

  render() {
    const { data, module } = this.props;

    return (
      <div>
        <header className="topbar">
          <Navbar className="navbarbg" expand="md">
            <NavbarBrand href="/"><img src={logo} alt="logo"/></NavbarBrand>       
           { module === "signup" ?  (<Nav className="ml-auto signupNav" navbar>               
                  <Button outline color="secondary" size="lg">Sign Up</Button>                  
              </Nav>)
             : (<Nav className="ml-auto signupNav" navbar>               
                  <Button outline color="secondary" size="lg">Log In</Button>                  
              </Nav>)
  }
          </Navbar>
        </header>
      </div>
    );
  }
}
export default Header;
