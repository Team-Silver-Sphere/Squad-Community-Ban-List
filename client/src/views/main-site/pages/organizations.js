import React from 'react';

import { Col, Row } from 'reactstrap';

import Layout from '../layout/layout';

import { Organizations, OrganizationCreate } from '../../../components';

export default function() {
  return (
    <Layout>
      <Row className="justify-content-center">
        <Col>
          <Organizations />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col>
          <OrganizationCreate />
        </Col>
      </Row>
    </Layout>
  );
}
