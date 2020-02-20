import React from 'react';
import { Link } from 'react-router-dom';

import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';

import Layout from '../layout/layout';

import {
  BanCount,
  OrganizationCount,
  UniqueBannedSteamIDCount,
  ExportBanCount
} from '../../../components';

export default function() {
  return (
    <Layout>
      <Row className="justify-content-center">
        <Col md="3">
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
        <Col md="3">
          <Card className="card-stats mb-4 mb-xl-0">
            <CardBody>
              <Row>
                <div className="col">
                  <span className="h2 font-weight-bold mb-0">
                    <BanCount />
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
        <Col md="3">
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
        <Col md="3">
          <Card className="card-stats mb-4 mb-xl-0">
            <CardBody>
              <Row>
                <div className="col">
                  <span className="h2 font-weight-bold mb-0">
                    <ExportBanCount />
                  </span>
                  <CardTitle
                    tag="h5"
                    className="text-uppercase text-muted mb-0"
                  >
                    Bans Exported
                  </CardTitle>
                </div>
                <Col className="col-auto">
                  <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                    <i className="fas fa-download" />
                  </div>
                </Col>
              </Row>
              <p className="mb-0 text-muted text-sm">
                to servers by the SCBL system.
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
                The aim of the Squad Community Ban List ("SCBL"), is to protect the
                Squad community's integrity through collaboration and information
                sharing. This is achieved by compiling ban information from some
                of the largest and most reputable server organisations within the
                Squad community, that we have partnered with, and sharing this
                compiled information via BattleMetrics ban lists or remote ban
                lists to allow all server organisations to secure their servers
                from known malicious players.
              </p>
              <span className="font-weight-bold">How it Works:</span>
              <p>
                <ol>
                  <li>
                    Information on bans issued by our partner organisations is
                    retrieved frequently from BattleMetrics by our automated ban
                    importer via the BattleMetrics API and is saved into our database.
                    Our database can be searched via our{' '}
                    <Link to="/search">Search page</Link> to allow server organisations
                    to lookup a player's reputation and for players to easily find
                    out where they are banned and how they can appeal these bans with
                    our partner organisations.
                  </li>
                  <li>
                    Server organisations are able to{' '}
                    <Link to="/install">create and configure export ban lists</Link>{' '}
                    be specifying high customizable criteria that dictates which
                    malicious players should be included within their export ban list.
                  </li>
                  <li>
                    Our ban generator rapidly updates export ban lists with new
                    information that has been imported into the database to ensure
                    that malicious players are removed and bared from playing on
                    other server organisation's server as quickly as possible to
                    limit the harm they cause to the server's community and the
                    wider Squad community.
                  </li>
                </ol>
              </p>
              <span className="font-weight-bold">
                For more information, please see our <Link to="/faq">FAQ</Link>.
              </span>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
