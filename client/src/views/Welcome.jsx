import React, { Component } from "react";
import { Card, CardBody, Row } from "reactstrap";

class Welcome extends Component {
  render() {
    return (
      <Row>
        <Card
          style={{
            display: "flex",
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <CardBody>
            <div className="banner-modal" style={{ maxWidth: 500 }}>
              <div style={{ margin: 10 }}>
                <h4>Hey Uptrade User! </h4>

                <p> Title Here. </p>
                <p> Summary Here</p>
                <p>Conclusion Here!</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </Row>
    );
  }
}

export default Welcome;
