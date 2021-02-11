import React, { Component } from 'react';
import './customers.css';
import api from '../../lib/api.js';
import Header from '../header/header';

class Customers extends React.Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      users: [],
    };
  }

  componentDidMount() {
    api
      .getCustomers()
      .then((res) => {
        this.setState({ customers: res && res.data });
      })
      .catch((err) => {
        console.log('err', err);
        this.setState({ customers: [] });
      });

    api
      .getUsers()
      .then((res) => {
        this.setState({ users: res && res.data });
      })
      .catch((err) => {
        console.log('err', err);
        this.setState({ users: [] });
      });
  }

  render() {
    return (
      <div>
        <Header module="unauthenticated"></Header>
      </div>
    );
  }
}

export default Customers;
