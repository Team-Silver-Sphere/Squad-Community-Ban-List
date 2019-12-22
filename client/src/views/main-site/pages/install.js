import React from 'react';

import { Col, Row } from 'reactstrap';

import Layout from '../layout/layout';

import { ExportBanLists } from '../../../components';

export default function() {
  return (
    <Layout>
      <Row>
        <Col>
          <ExportBanLists />
        </Col>
      </Row>
    </Layout>
  );
}
