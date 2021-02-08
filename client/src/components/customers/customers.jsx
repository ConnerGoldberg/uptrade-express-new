import React, { Component } from "react";
import "./customers.css";
import api from "../../api/api.js";

class Customers extends React.Component {
  constructor() {
    super();
    this.state = {
      customers: [],
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

   
  }

  render() {
    return (
      <div>
        {/* <h2>Customers</h2>
        <ul>
          {this.state.customers.map((customer) => (
            <li key={customer.id}>
              {customer.firstName} {customer.lastName}
            </li>
          ))}
        </ul> */}
      </div>
    );
  }
}

export default Customers;
