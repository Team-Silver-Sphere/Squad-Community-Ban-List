import React from 'react';

import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

import Layout from '../layout/layout';

export default function() {
  return (
    <Layout>
      <Row className="justify-content-center">
        <Col>
          <Card className=" shadow">
            <CardHeader className=" bg-transparent">
              <h3 className=" mb-0">Server Owners</h3>
            </CardHeader>
            <CardBody>
              Some FAQ section that I currently cannot be bothered to write.
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col>
          <Card className=" shadow">
            <CardHeader className=" bg-transparent">
              <h3 className=" mb-0">Players</h3>
            </CardHeader>
            <CardBody>
              Some FAQ section that I currently cannot be bothered to write.
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col>
          <Card className=" shadow">
            <CardHeader className=" bg-transparent">
              <h3 className=" mb-0">Partner Organizations</h3>
            </CardHeader>
            <CardBody>
              Some FAQ section that I currently cannot be bothered to write.
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
