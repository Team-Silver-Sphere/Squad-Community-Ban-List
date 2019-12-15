import React from 'react';

import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';

import Layout from '../layout/layout';

import {
  BattlemetricsBanCount,
  OrganizationCount,
  UniqueBannedSteamIDCount
} from '../../../components';

export default function() {
  return (
    <Layout>
      <Row className="justify-content-center">
        <Col md="4">
          <Card className="card-stats mb-4 mb-xl-0">
            <CardBody>
              <Row>
                <div className="col">
                  <span className="h2 font-weight-bold mb-0">
                    <OrganizationCount />
                  </span>
                  <CardTitle
                    tag="h5"
                    className="text-uppercase text-muted mb-0"
                  >
                    Organizations
                  </CardTitle>
                </div>
                <Col className="col-auto">
                  <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                    <i className="fas fa-users" />
                  </div>
                </Col>
              </Row>
              <p className="mb-0 text-muted text-sm">
                helping to protect the Squad community.
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card className="card-stats mb-4 mb-xl-0">
            <CardBody>
              <Row>
                <div className="col">
                  <span className="h2 font-weight-bold mb-0">
                    <BattlemetricsBanCount />
                  </span>
                  <CardTitle
                    tag="h5"
                    className="text-uppercase text-muted mb-0"
                  >
                    Bans
                  </CardTitle>
                </div>
                <Col className="col-auto">
                  <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                    <i className="fas fa-gavel" />
                  </div>
                </Col>
              </Row>
              <p className="mb-0 text-muted text-sm">
                recorded within the SCBL system.
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card className="card-stats mb-4 mb-xl-0">
            <CardBody>
              <Row>
                <div className="col">
                  <span className="h2 font-weight-bold mb-0">
                    <UniqueBannedSteamIDCount />
                  </span>
                  <CardTitle
                    tag="h5"
                    className="text-uppercase text-muted mb-0"
                  >
                    Banned Player's
                  </CardTitle>
                </div>
                <Col className="col-auto">
                  <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                    <i className="fas fa-user-times" />
                  </div>
                </Col>
              </Row>
              <p className="mb-0 text-muted text-sm">
                info stored in the SCBL system.
              </p>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col>
          <Card className="shadow">
            <CardHeader className=" bg-transparent">
              <h3 className=" mb-0">About</h3>
            </CardHeader>
            <CardBody>
              Some about section that I currently cannot be bothered to write.
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
