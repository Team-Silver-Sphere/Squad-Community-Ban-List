import React from 'react';

import { Col, Row } from 'reactstrap';

import Layout from '../layout/layout';

import {
  BanListQueue,
  ExportBanListQueue,
  ExportBanQueue
} from '../../../components';

export default function() {
  return (
    <Layout>
      <Row className="justify-content-center">
        <Col>
          <BanListQueue />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col>
          <ExportBanListQueue />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col>
          <ExportBanQueue />
        </Col>
      </Row>
    </Layout>
  );
}
