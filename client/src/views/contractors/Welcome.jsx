import React, { useEffect, useCallback, useState } from 'react';
import { Card, CardBody, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import history from '../../lib/history';
import Header from '../../components/header/header';
import banner from '../../assets/banner.jpg';
import forum from '../../assets/forum.png';
import videos from '../../assets/videos.png';
import tools from '../../assets/tools.png';
import './Welcome.css';

const Welcome = () => {
  const user = useSelector((state) => state.auth?.user);
  useEffect(() => {
    console.log('user', user);
    if (user && !user.verified) {
      history.push('/upgrade');
    }
  }, []);
  return (
    <React.Fragment>
      <Header module="authenticated" />
      <Row>
        <img style={{ width: '100%', overflow: 'hidden' }} src={banner} alt="banner" />
        <div className="container">
          <div className="box">
            <a href="/signup">
              <img src={forum} />
              <h3>Forums</h3>
            </a>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mi augue, viverra sit amet ultricies</p>
          </div>
          <div className="box">
            <a href="https://www.youtube.com">
              <img src={videos} />
              <h3>Videos</h3>
            </a>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mi augue, viverra sit amet ultricies</p>
          </div>
          <div className="box">
            <a href="/signup">
              <img src={tools} />
              <h3>Get Premium</h3>
            </a>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mi augue, viverra sit amet ultricies</p>
          </div>
        </div>
      </Row>
    </React.Fragment>
  );
};

export default Welcome;
