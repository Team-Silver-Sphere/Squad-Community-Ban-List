import React from 'react';

import { Col, Row } from 'reactstrap';

import Layout from '../layout/layout';

import { BattlemetricsBanLists, BattlemetricsBanListAdd } from '../../../components';

export default function() {
  return (
    <Layout>
      <Row className="justify-content-center">
        <Col>
          <BattlemetricsBanLists />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col>
          <BattlemetricsBanListAdd />
        </Col>
      </Row>
    </Layout>
  );
}
