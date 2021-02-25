import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CryptoJS from 'crypto-js';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Button, Col, Input, Row, Card, CardBody } from 'reactstrap';
import Header from '../../../components/header/header';
import { logIn, logOut } from '../../../actions/auth/authActions';
import history from '../../../lib/history';
import './login.css';

const sidebarBackground = {
  backgroundRepeat: 'no-repeat',
};

const quoteList = ['Work your own way!', 'Ready to expand your network?', "Let's get started!"];

const selectedQuote = quoteList[Math.floor(Math.random() * quoteList.length)];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const doLogin = useCallback((credentials) => dispatch(logIn(credentials)), [dispatch]);
  const doLogout = useCallback(() => dispatch(logOut), [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const hash = CryptoJS.HmacSHA1(password, email + process.env.salt).toString();
    const auth = await doLogin({ email, password: hash });
    console.log('auth', auth);
    if (auth.type !== 'AUTHENTICATE') {
      doLogout();
      setIsValid(false);
      setErrorMsg('Invalid username or password');
    } else {
      history.push('/contractors/home'); // We've logged in, go to step 2
    }
  };

  return (
    <div className="">
      <Helmet>
        <title>Log In - Uptrade</title>
      </Helmet>
      <Header module="unauthenticated"></Header>
      {/*--------------------------------------------------------------------------------*/}
      {/*Login Cards*/}
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
                        <div className="error-message"> {isValid ? '' : errorMsg} </div>
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
};

export default Login;
