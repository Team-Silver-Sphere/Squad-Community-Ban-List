import React from 'react';

import { Col, Row } from 'reactstrap';

import Layout from '../layout/layout';

import { BanLists } from '../../../components';

export default function() {
  return (
    <Layout>
      <Row className="justify-content-center">
        <Col>
          <BanLists />
        </Col>
      </Row>
    </Layout>
  );
}
