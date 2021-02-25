import React, { Component } from 'react';
import { Card, CardBody, Row } from 'reactstrap';
import api from '../../lib/api';
import Header from '../../components/header/header';
import banner from '../../assets/banner.jpg';
import forum from '../../assets/forum.png';
import videos from '../../assets/videos.png';
import tools from '../../assets/tools.png';
import './Welcome.css';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: {},
    };
  }

  componentDidMount() {}
  render() {
    return (
      <React.Fragment>
        <Header data={this.state} module="authenticated" />
        <Row>
          <img style={{ width: '100%', overflow: 'hidden' }} src={banner} alt="banner" />
          <div className="container">
            <div className="box">
              <img src={forum} />
              <h3>Forums</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mi augue, viverra sit amet ultricies
              </p>
            </div>
            <div className="box">
              <img src={videos} />
              <h3>Videos</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mi augue, viverra sit amet ultricies
              </p>
            </div>
            <div className="box">
              <img src={tools} />
              <h3>Get Premium</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mi augue, viverra sit amet ultricies
              </p>
            </div>
          </div>
        </Row>
      </React.Fragment>
    );
  }
}

export default Welcome;
