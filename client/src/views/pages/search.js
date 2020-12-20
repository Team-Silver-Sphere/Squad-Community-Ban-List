import React from 'react';
import {
  Card,
  CardBody,
  Col,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Table
} from 'reactstrap';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';

import Layout from '../layout/layout.js';

import AdvancedModal from '../../components/advanced-modal.js';
import DisplayRiskRating from '../../components/display-risk-rating.js';
import SteamUserSearchBox from '../../components/steam-user-search-box.js';

import steamAvatar from '../../assets/img/misc/avatar.svg';
import FormattedDate from '../../utils/formatted-date.js';

const query = gql`
  query Search($id: String!) {
    steamUser(id: $id) {
      id
      name
      avatarFull
      reputationPoints
      reputationRank
      lastRefreshedInfo
      lastRefreshedReputationPoints
      lastRefreshedReputationRank
      activeBans: bans(orderBy: "created", orderDirection: DESC, expired: false) {
        edges {
          cursor
          node {
            id
            banList {
              id
              name
              organisation {
                id
                name
                discord
              }
            }
            reason
            created
            expires
          }
        }
      }
      expiredBans: bans(orderBy: "created", orderDirection: DESC, expired: true) {
        edges {
          cursor
          node {
            id
            banList {
              id
              name
              organisation {
                id
                name
                discord
              }
            }
            reason
            created
            expires
          }
        }
      }
    }
  }
`;

export default function (props) {
  const search = props.match.params.search;
  const isValidSteam64ID = search && search.match(/^[0-9]{17}$/);

  const { loading, error, data } = isValidSteam64ID
    ? useQuery(query, { variables: { id: search } })
    : { loading: null, error: null, data: null };

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  return (
    <Layout>
      <section className="section section-lg pt-lg-0 mt--200">
        <Container>
          <Card className="shadow border-0">
            <CardBody className="pt-5 pb-2 border-bottom">
              <div className="icon icon-shape bg-gradient-primary rounded-circle text-white mb-4">
                <i className="fa fa-search" />
              </div>
              <h6 className="text-primary text-uppercase">Search</h6>
              <p className="description mt-2">
                Browse over 12,000 banned players and explore their reputation.
              </p>
              <SteamUserSearchBox search={props.match.params.search} />
            </CardBody>
            {loading && (
              <CardBody>
                <div className="text-center mt-2 mb-3">Loading...</div>
                <div className="btn-wrapper text-center">
                  <i className="fas fa-circle-notch fa-spin fa-4x" />
                </div>
              </CardBody>
            )}
            {error && (
              <CardBody>
                <div className="text-center mt-2 mb-2">Error!</div>
                <div className="btn-wrapper text-center">
                  <i className="fas fa-exclamation-triangle fa-4x" />
                </div>
                <div className="text-center mt-2 mb-2">Something went wrong. Sad times.</div>
              </CardBody>
            )}
            {data && data.steamUser === null && (
              <CardBody>
                <div className="text-center mt-2 mb-2">Unknown Steam User</div>
                <div className="btn-wrapper text-center">
                  <i className="fas fa-question fa-4x" />
                </div>
                <div className="text-center mt-2 mb-2">
                  We do not have this Steam user on record.
                </div>
              </CardBody>
            )}
            {data && data.steamUser && (
              <>
                <CardBody className="text-center border-bottom">
                  <h4>Steam Profile</h4>
                  <img
                    alt={`${data.steamUser.name || data.steamUser.id}'s avatar`}
                    src={data.steamUser.avatarFull || steamAvatar}
                    width="184px"
                    className="rounded-circle mb-4"
                  />
                  <h5>
                    <a href={`https://steamcommunity.com/id/${data.steamUser.id}`}>
                      {data.steamUser.name || data.steamUser.id}
                    </a>
                  </h5>
                  <small>
                    <strong>Last Refreshed: </strong>{' '}
                    {data.steamUser.lastRefreshedInfo ? (
                      <FormattedDate date={data.steamUser.lastRefreshedInfo} />
                    ) : (
                      'Queued for refresh.'
                    )}
                  </small>
                </CardBody>
                <CardBody className="text-center border-bottom">
                  <h4>Reputation</h4>
                  <Row>
                    <Col>
                      <h5>Risk Rating</h5>
                      <h2>
                        <DisplayRiskRating points={data.steamUser.reputationPoints} />
                      </h2>
                      <small>
                        <strong>Last Refreshed: </strong>{' '}
                        {data.steamUser.lastRefreshedReputationPoints ? (
                          <FormattedDate date={data.steamUser.lastRefreshedReputationPoints} />
                        ) : (
                          'Queued for refresh.'
                        )}
                      </small>
                    </Col>
                    <Col>
                      <h5>Risk Ranking</h5>
                      <h2>
                        {data.steamUser.reputationRank && (
                          <>
                            <small>#</small>
                            {data.steamUser.reputationRank}
                          </>
                        )}
                        {!data.steamUser.reputationRank && <>Unranked</>}
                      </h2>
                      <small>
                        <strong>Last Refreshed: </strong>{' '}
                        {data.steamUser.lastRefreshedReputationRank ? (
                          <FormattedDate date={data.steamUser.lastRefreshedReputationRank} />
                        ) : (
                          'Queued for refresh.'
                        )}
                      </small>
                    </Col>
                  </Row>
                </CardBody>
                <CardBody>
                  <h4 className="text-center">
                    Active Bans ({data.steamUser.activeBans.edges.length})
                  </h4>
                </CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th>Organisation</th>
                      <th>Ban List</th>
                      <th>Reason</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.steamUser.activeBans.edges.map((edge, key) => (
                      <tr key={key}>
                        <td>
                          <AdvancedModal isOpen={false}>
                            {(modal) => (
                              <>
                                <a
                                  href="/test"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    modal.open();
                                  }}
                                >
                                  {edge.node.banList.organisation.name}
                                </a>
                                <Modal
                                  className="modal-dialog-centered"
                                  isOpen={modal.isOpen}
                                  toggle={modal.close}
                                >
                                  <ModalHeader toggle={modal.close}>Organisation Info</ModalHeader>
                                  <ModalBody className="text-center">
                                    <h3>{edge.node.banList.organisation.name}</h3>
                                    <a href={edge.node.banList.organisation.discord}>Discord</a>
                                    <h6 className="mt-4">Appeal Information</h6>
                                    <p>
                                      The Squad Community Ban List does <strong>not</strong> handle
                                      ban appeals on behalf of partner organisations. To get a ban
                                      removed from {edge.node.banList.organisation.name}'s server(s)
                                      you will need to contact them via their Discord, linked above.
                                    </p>
                                  </ModalBody>
                                </Modal>
                              </>
                            )}
                          </AdvancedModal>
                        </td>
                        <td>{edge.node.banList.name}</td>
                        <td>{edge.node.reason}</td>
                        <td>
                          <i className="fa fa-clock" title="Banned on" />{' '}
                          <FormattedDate date={edge.node.created} /> <br />
                          <i className="fa fa-hourglass-start" title="Banned until" />{' '}
                          {edge.node.expires ? (
                            <FormattedDate date={edge.node.expires} />
                          ) : (
                            'Permanent Ban'
                          )}
                        </td>
                      </tr>
                    ))}
                    {data.steamUser.activeBans.edges.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center">
                          <strong>No active bans on record.</strong>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <CardBody>
                  <h4 className="text-center">
                    Expired Bans ({data.steamUser.expiredBans.edges.length})
                  </h4>
                </CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th>Organisation</th>
                      <th>Ban List</th>
                      <th>Reason</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.steamUser.expiredBans.edges.map((edge, key) => (
                      <tr key={key}>
                        <td>
                          <AdvancedModal isOpen={false}>
                            {(modal) => (
                              <>
                                <a
                                  href="/test"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    modal.open();
                                  }}
                                >
                                  {edge.node.banList.organisation.name}
                                </a>
                                <Modal
                                  className="modal-dialog-centered"
                                  isOpen={modal.isOpen}
                                  toggle={modal.close}
                                >
                                  <ModalHeader toggle={modal.close}>Organisation Info</ModalHeader>
                                  <ModalBody className="text-center">
                                    <h3>{edge.node.banList.organisation.name}</h3>
                                    <a href={edge.node.banList.organisation.discord}>Discord</a>
                                    <h6 className="mt-4">Appeal Information</h6>
                                    <p>
                                      The Squad Community Ban List does <strong>not</strong> handle
                                      ban appeals on behalf of partner organisations. To get a ban
                                      removed from {edge.node.banList.organisation.name}'s server(s)
                                      you will need to go through their appeals process. They have
                                      provided the following information explaining how to do this:
                                    </p>
                                    <p className="font-italic">
                                      {edge.node.banList.organisation.appealProcess}
                                    </p>
                                  </ModalBody>
                                </Modal>
                              </>
                            )}
                          </AdvancedModal>
                        </td>
                        <td>{edge.node.banList.name}</td>
                        <td>{edge.node.reason}</td>
                        <td>
                          <i className="fa fa-clock" title="Banned on" />{' '}
                          <FormattedDate date={edge.node.created} /> <br />
                          <i className="fa fa-hourglass-start" title="Banned until" />{' '}
                          {edge.node.expires ? (
                            <FormattedDate date={edge.node.expires} />
                          ) : (
                            'Permanent Ban'
                          )}
                        </td>
                      </tr>
                    ))}
                    {data.steamUser.expiredBans.edges.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center">
                          <strong>No expired bans on record.</strong>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </>
            )}
          </Card>
        </Container>
      </section>
    </Layout>
  );
}
