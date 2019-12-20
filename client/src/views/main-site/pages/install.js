import React from 'react';

import { Col, Row } from 'reactstrap';

import Layout from '../layout/layout';

import { ExportBanLists, ExportBanListCreate } from '../../../components';

export default function() {
  return (
    <Layout>
      <Row>
        <Col>
          <ExportBanLists />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <ExportBanListCreate />
        </Col>
      </Row>
    </Layout>
  );
}
