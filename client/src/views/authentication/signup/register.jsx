import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CryptoJS from 'crypto-js';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  Form,
  FormGroup,
  Button,
  Col,
  Input,
  Row,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import Header from '../../../components/header/header';
import api from '../../../lib/api';
import history from '../../../lib/history';
import './register.css';

const sidebarBackground = {
  // backgroundImage: "url(" + img1 + ")",
  backgroundRepeat: 'no-repeat',
};

const quoteList = ['Work your own way!', 'Ready to expand your network?', "Let's get started!"];

const selectedQuote = quoteList[Math.floor(Math.random() * quoteList.length)];

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [profileType, setProfileType] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isValid, setIsValid] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    console.log('navigate to home', isAuthenticated);
    if (isAuthenticated) {
      history.push('/contractors/home');
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    this.props.history.push('/login');
    let data = this.state;
    // const wordArr =
    data.password = CryptoJS.HmacSHA1(data.password, data.email + process.env.salt).toString();
    data.confirmpassword = data.password;
    api
      .register(data)
      .then((res) => {})
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="">
      <Helmet>
        <title>Sign Up - Uptrade</title>
      </Helmet>
      <Header module="unauthenticated"></Header>
      {/*--------------------------------------------------------------------------------*/}
      {/*Registration Cards*/}
      {/*--------------------------------------------------------------------------------*/}
      <div className="auth-wrapper d-flex no-block justify-content-center align-items-center" style={sidebarBackground}>
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
                    <Form className="form-material mt-3 login-form" onSubmit={handleSubmit}>
                      <div className="input-container">
                        <FormGroup>
                          <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setUsername(e.target.value);
                            }}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmpassword"
                            onChange={(e) => {
                              setConfirmPassword(e.target.value);
                            }}
                          />
                        </FormGroup>
                        <div className="error-message"> {isValid ? '' : errorMsg} </div>
                        <FormGroup>
                          <Input
                            type="select"
                            name="profileType"
                            id="profileType"
                            onChange={(e) => {
                              setProfileType(e.target.value);
                            }}
                          >
                            <option>Profile Type...</option>
                            <option>Contractor</option>
                            <option>Client</option>
                          </Input>
                        </FormGroup>
                      </div>
                      <Button block color="info">
                        <span className="trade-gothic__container">REGISTER</span>
                      </Button>
                      <div className="center-text">
                        <div className="text-center">
                          Already have an account?{' '}
                          <a href="/login">
                            <div className="sign-in-text trade-gothic__container">SIGN IN</div>
                          </a>
                        </div>

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
};

export default Register;
