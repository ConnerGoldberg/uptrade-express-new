import React, { useEffect, useCallback, useState } from 'react';
import { Card, CardBody, Row, Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import history from '../../../lib/history';
import Header from '../../../components/header/header';
import banner from '../../../assets/banner.jpg';
import forum from '../../../assets/forum.png';
import family from '../../../assets/family.png';
import tools from '../../../assets/tools.png';
import './Checkout.css';

const Checkout = () => {
  const user = useSelector((state) => state.auth?.user);
  useEffect(() => {
    console.log('user', user);
  }, []);
  return (
    <React.Fragment>
      <Header module="authenticated" />
      <Row>
        <img style={{ width: '100%', overflow: 'hidden' }} src={banner} alt="banner" />
        <div className="container">
          <h1>Checkout</h1>
          <div className="box">
            <Card>
              <CardBody>
                <a href="/checkout?id=1">
                  <img src={forum} />
                  <h3>Community</h3>
                </a>
                <p>$20/month per user</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque explicabo delectus possimus ducimus
                  autem. Sapiente facilis animi, quas laboriosam officia officiis. Esse temporibus sequi iste inventore
                  aut voluptate aspernatur accusamus!
                </p>
                <Button
                  color="info"
                  onClick={() => {
                    history.push('/checkout?id=1');
                  }}
                >
                  Checkout
                </Button>
              </CardBody>
            </Card>
          </div>
          <div className="box">
            <Card>
              <CardBody>
                <a href="/checkout?id=2">
                  <img src={family} />
                  <h3>Family</h3>
                </a>
                <p>$50/month per user</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque explicabo delectus possimus ducimus
                  autem. Sapiente facilis animi, quas laboriosam officia officiis. Esse temporibus sequi iste inventore
                  aut voluptate aspernatur accusamus!
                </p>
                <Button
                  color="info"
                  onClick={() => {
                    history.push('/checkout?id=2');
                  }}
                >
                  Checkout
                </Button>
              </CardBody>
            </Card>
          </div>
          <div className="box">
            <Card>
              <CardBody>
                <a href="/checkout?id=3">
                  <img src={tools} />
                  <h3>Premium Enterprise</h3>
                </a>
                <p>$100/ month per user</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque explicabo delectus possimus ducimus
                  autem. Sapiente facilis animi, quas laboriosam officia officiis. Esse temporibus sequi iste inventore
                  aut voluptate aspernatur accusamus!
                </p>
                <Button
                  color="info"
                  onClick={() => {
                    history.push('/checkout?id=3');
                  }}
                >
                  Checkout
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </Row>
      <div className="emptyDiv" />
    </React.Fragment>
  );
};

export default Checkout;
