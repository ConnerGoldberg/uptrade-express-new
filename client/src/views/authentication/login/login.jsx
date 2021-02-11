import React from 'react';
import bcryptjs from 'bcryptjs';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Button, Col, Input, Row, Card, CardBody } from 'reactstrap';
import Header from '../../../components/header/header';
import api from '../../../lib/api';

import './login.css';

const sidebarBackground = {
  backgroundRepeat: 'no-repeat',
};

const quoteList = ['Work your own way!', 'Ready to expand your network?', "Let's get started!"];

const selectedQuote = quoteList[Math.floor(Math.random() * quoteList.length)];

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isValid: true,
    errorMsg: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    api.login({ email, password });
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
          <title>Log In - Uptrade</title>
        </Helmet>
        <Header module="unauthenticated"></Header>
        {/*--------------------------------------------------------------------------------*/}
        {/*Login Cards*/}
        {/*--------------------------------------------------------------------------------*/}
        <div
          className="auth-wrapper d-flex no-block justify-content-center align-items-center"
          style={sidebarBackground}
        >
          <div className="login-container">
            <Card className="login-card">
              <CardBody>
                <div id="loginform">
                  <div className="logo-container">
                    <span className="db">{/* <img className="img-logo" src={img1} alt="uptrade log" /> */}</span>
                  </div>
                  <div className="welcome-quote">{selectedQuote}</div>
                  <Row>
                    <Col xs="12">
                      <Form className="form-material mt-3 login-form" onSubmit={this.handleSubmit}>
                        <div className="input-container">
                          <FormGroup>
                            <Input type="email" placeholder="Email" name="email" onChange={this.handleInputChange} />
                          </FormGroup>
                          <FormGroup>
                            <Input
                              type="password"
                              placeholder="Password"
                              name="password"
                              onChange={this.handleInputChange}
                            />
                          </FormGroup>
                          <div className="error-message"> {this.state.isValid ? '' : this.state.errorMsg} </div>
                        </div>
                        <Button block color="info">
                          <span className="trade-gothic__container">LOG IN</span>
                        </Button>
                        <div className="center-text">
                          <a href="/signup">
                            <div className="sign-up-text trade-gothic__container">SIGN UP</div>
                          </a>
                          <Link to="/forgot-password">
                            <div className="forgot-password-text trade-gothic__container">Forgot Password?</div>
                          </Link>
                        </div>
                      </Form>
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>{' '}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
