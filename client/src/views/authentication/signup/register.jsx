import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Form, FormGroup, Button, Col, Input, Row } from "reactstrap";

import "./register.css";

const sidebarBackground = {
  // backgroundImage: "url(" + img1 + ")",
  backgroundRepeat: "no-repeat",
};

const quoteList = [
  "Work your own way!",
  "Ready to expand your network?",
  "Let's get started!",
];

const selectedQuote = quoteList[Math.floor(Math.random() * quoteList.length)];

class Register extends React.Component {
  state = {
    email: "",
    password: "",
    isValid: true,
    errorMsg: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    //TODO: handle login
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {}

  render() {
    return (
      <div className="">
        <Helmet>
          <title>Log In - Equalution Client Portal</title>
        </Helmet>
        {/*--------------------------------------------------------------------------------*/}
        {/*Login Cards*/}
        {/*--------------------------------------------------------------------------------*/}
        <div
          className="auth-wrapper d-flex no-block justify-content-center align-items-center"
          style={sidebarBackground}
        >
          <div className="login-container">
            <div id="loginform">
              <div className="logo-container">
                <span className="db">
                  {/* <img className="img-logo" src={img1} alt="equalution log" /> */}
                </span>
              </div>
              <div className="welcome-quote">{selectedQuote}</div>
              <Row>
                <Col xs="12">
                  <Form
                    className="form-material mt-3 login-form"
                    onSubmit={this.handleSubmit}
                  >
                    <div className="input-container">
                      <FormGroup>
                        <Input
                          type="email"
                          placeholder="Email"
                          name="email"
                          onChange={this.handleInputChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Input
                          type="password"
                          placeholder="Password"
                          name="password"
                          onChange={this.handleInputChange}
                        />
                      </FormGroup>
                      <div className="error-message">
                        {" "}
                        {this.state.isValid ? "" : this.state.errorMsg}{" "}
                      </div>
                    </div>
                    <Button block className="global-pink-button log-in-button">
                      <span className="trade-gothic__container">LOG IN</span>
                    </Button>
                    <div className="center-text">
                      <a href="/authentication/sign-up">
                        <div className="sign-up-text trade-gothic__container">
                          SIGN UP
                        </div>
                      </a>
                      <Link to="/authentication/forgot-password">
                        <div className="forgot-password-text trade-gothic__container">
                          Forgot Password?
                        </div>
                      </Link>
                    </div>
                  </Form>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
