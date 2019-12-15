import React from 'react';

import { Col, Row } from 'reactstrap';

import Layout from '../layout/layout';

import { Organizations } from '../../../components';

export default function() {
  return (
    <Layout>
      <Row className="justify-content-center">
        <Col>
          <Organizations />
        </Col>
      </Row>
    </Layout>
  );
}
