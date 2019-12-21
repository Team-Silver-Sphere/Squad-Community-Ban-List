import React from 'react';
import { Link } from 'react-router-dom';

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
              <p>
                The aim of the Squad Community Ban List, "SCBL" for short, is to
                protect the Squad community's integrity through collaboration
                and information sharing. This is achieved by pulling information
                from some of the largest and most reputable server organisations
                within the Squad community, that we have partnered with, and
                sharing this information via configurable remote ban lists to
                allow all server organisations to secure their servers from
                known malicious players.
              </p>
              <span className="font-weight-bold">How it Works:</span>
              <p>
                <ol>
                  <li>
                    Our ban importer constantly fetches bans from our partner
                    organisation's BattleMetrics ban lists via the BattleMetrics
                    API to ensure our local database contains the most
                    up-to-date information on known malicious players.
                  </li>
                  <li>
                    Our database can be searched via our{' '}
                    <Link to="/search">Search page</Link> to allow our users to
                    lookup a player's reputation and for players to easily find
                    out where they are banned and how they can appeal any bans
                    they have.
                  </li>
                  <li>
                    Server organisations can{' '}
                    <Link to="/install">create custom remote ban lists</Link> to
                    ensure players meeting their criteria are kept banned form
                    their server.
                  </li>
                  <li>
                    Our ban exporter rapidly updates the remote ban lists as
                    soon as new bans are added or removed from our database so
                    that malicious players are banned from your server as early
                    as possible to limit the hard these players might cause to
                    your server's community and the wider Squad community.
                  </li>
                </ol>
              </p>
              <bold>
                For more information, please see our <Link to="/faq">FAQ</Link>.
              </bold>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
