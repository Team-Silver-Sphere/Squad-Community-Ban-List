import React from 'react';

import { Row, Col } from 'reactstrap';

import Layout from '../layout/layout';

import { Steam64IDSearch, Results } from '../../../components';

export default function(props) {
  return (
    <Layout>
      <Row>
        <Col>
          <Steam64IDSearch
            onSearch={steamID => props.history.push(`/search/${steamID}`)}
          />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Results steamID={props.match.params.steamID} />
        </Col>
      </Row>
    </Layout>
  );
}
