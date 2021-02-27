import React, { useEffect, useCallback, useState } from 'react';
import { Card, CardBody, Row, Col, Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import history from '../../lib/history';
import './footer.css';

const footer = () => {
  return (
    <React.Fragment>
      <div className="footer">
        <div className="container">
          <Row>
            <Col className="col-lg-4 col-12">
              <div className="accordion" id="accordionCompany">
                <div className="card">
                  <div className="card-body">
                    <Row>
                      <a href="/signup">Products</a>
                    </Row>
                  </div>
                </div>
              </div>
            </Col>
            <Col className="col-lg-4 col-12">
              <div className="accordion" id="accordionPrivacy">
                <div className="card">
                  <div className="card-body">
                    <Row>
                      {' '}
                      <a href="#">Privacy Policy</a>
                    </Row>
                    <Row>
                      <a href="#">Terms of Use</a>
                    </Row>
                    <Row>
                      <a href="#">Terms &amp; Conditions</a>
                    </Row>
                  </div>
                </div>
              </div>
            </Col>
            <Col className="col-lg-4 col-12">
              <div className="accordion" id="accordionSocial">
                <div className="card">
                  <div className="card-body">
                    <Row>
                      <a href="https://www.instagram.com/">Instagram</a>
                    </Row>
                    <Row>
                      <a href="https://www.facebook.com/">Facebook</a>
                    </Row>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export default footer;
