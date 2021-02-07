import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Card, CardBody, Button } from "reactstrap";

import "../rc.css";

class SubmitSuccess extends PureComponent {
  static propTypes = {
    buttonPath: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.any,
  };

  handleClick = (e) => {
    e.preventDefault();
    const { history, buttonPath } = this.props;
    history.push(buttonPath);
    window.location.reload();
  };

  render() {
    const { title, children } = this.props;
    return (
      <Card>
        <CardBody>
          <div className="submit-success__container">
            <h3>{title}</h3>
            <div className="success-message">{children}</div>
            <Button className="global-pink-button" onClick={this.handleClick}>
              Back to home page
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default withRouter(SubmitSuccess);
