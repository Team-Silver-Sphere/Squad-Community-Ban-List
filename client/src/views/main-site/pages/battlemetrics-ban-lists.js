import React from 'react';

import { Col, Row } from 'reactstrap';

import Layout from '../layout/layout';

import { BattlemetricsBanLists } from '../../../components';

export default function() {
  return (
    <Layout>
      <Row className="justify-content-center">
        <Col>
          <BattlemetricsBanLists />
        </Col>
      </Row>
    </Layout>
  );
}
