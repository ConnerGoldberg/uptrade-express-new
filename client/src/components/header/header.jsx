import React from "react";
import {
  NavbarBrand,
  Collapse,
  Row,
  Nav,
  Button,
  Navbar,
  NavbarToggler,
  ButtonGroup,
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
           { module === "authenticated" ?  (<Nav className="ml-auto signupNav" navbar>               
                  <Button outline color="secondary" size="lg">Sign Up</Button>                  
              </Nav>)
             : (<Nav className="ml-auto signupNav" navbar>
               <Row>
               <p className="centered"> Already have an account?  </p>   
                  <Button outline color="info" size="lg" className="signup-btn">Log In</Button>
                  <Button outline color="secondary" size="lg">Sign Up</Button>    
                         
                 </Row>  
                             
              </Nav>)
  }
          </Navbar>
        </header>
      </div>
    );
  }
}
export default Header;
