import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table
} from 'reactstrap';

import Layout from '../layout/layout.js';

import { AdvancedModal, DeleteExportBanList } from '../../components';

const GET_EXPORT_BAN_LISTS = gql`
  query GetExportBanLists {
    loggedInSteamUser {
      id
      exportBanLists {
        id
        name
        threshold
        type
        defaultActivePoints
        defaultExpiredPoints
        battlemetricsID
        battlemetricsInvite
      }
    }
  }
`;

export default function () {
  const { loading, error, data } = useQuery(GET_EXPORT_BAN_LISTS);

  return (
    <Layout>
      <section className="section section-lg pt-lg-0 mt--200">
        <Container>
          <Card className="shadow border-0">
            <CardBody className="pt-5 pb-2 border-bottom">
              <div className="icon icon-shape bg-gradient-info rounded-circle text-white mb-4">
                <i className="fa fa-angle-double-down" />
              </div>
              <h6 className="text-info text-uppercase">Export Ban Lists</h6>
              <p className="description mt-2">
                Configure and generate ban lists from out database that preemptively ban harmful
                players before they have a chance to harm your community.
              </p>
            </CardBody>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th>Name</th>
                  <th>Threshold</th>
                  <th>Default Active Points</th>
                  <th>Default Expired Points</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={5} className="text-center">
                      <div className="text-center mt-2 mb-3">Loading...</div>
                      <div className="btn-wrapper text-center">
                        <i className="fas fa-circle-notch fa-spin fa-4x" />
                      </div>
                    </td>
                  </tr>
                )}
                {error && (
                  <tr>
                    <td colSpan={5} className="text-center">
                      <div className="text-center mt-2 mb-2">Error!</div>
                      <div className="btn-wrapper text-center">
                        <i className="fas fa-exclamation-triangle fa-4x" />
                      </div>
                      <div className="text-center mt-2 mb-2">Something went wrong. Sad times.</div>
                    </td>
                  </tr>
                )}
                {data && data.loggedInSteamUser && (
                  <>
                    {data.loggedInSteamUser.exportBanLists.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center">
                          <strong>Create an export ban list to get started!</strong>
                        </td>
                      </tr>
                    )}
                    {data.loggedInSteamUser.exportBanLists.map((exportBanList, key) => (
                      <tr key={key}>
                        <th>{exportBanList.name}</th>
                        <td>{exportBanList.threshold}</td>
                        <td>{exportBanList.defaultActivePoints}</td>
                        <td>{exportBanList.defaultExpiredPoints}</td>
                        <td>
                          <AdvancedModal isOpen={false}>
                            {(modal) => (
                              <>
                                <Button color="success" size="sm" onClick={modal.open}>
                                  Install
                                </Button>
                                <Modal
                                  className="modal-dialog-centered"
                                  isOpen={modal.isOpen}
                                  toggle={modal.close}
                                >
                                  <ModalHeader toggle={modal.close}>
                                    Install Export Ban List
                                  </ModalHeader>
                                  <ModalBody>
                                    {exportBanList.type === 'battlemetrics' && (
                                      <>
                                        <h6>Battlemetrics</h6>
                                        <p>
                                          To use this export ban list within Battlemetrics, please
                                          accept our{' '}
                                          <a href={exportBanList.battlemetricsInvite}>
                                            Battlemetrics ban list share invite
                                          </a>
                                          .
                                        </p>
                                      </>
                                    )}
                                    <h6>Remote Ban List</h6>
                                    <p>
                                      To use this export ban list within your Squad server the
                                      following URL can be added as a remote ban list on your
                                      server:
                                    </p>
                                    <code>
                                      {`${window.location.protocol}//${window.location.hostname}/export/${exportBanList.id}`}
                                    </code>
                                    <p className="mt-2">
                                      For information on how to achieve this, please refer to the{' '}
                                      <a href="https://squad.gamepedia.com/Server_Configuration#Remote_Ban_Lists_in_RemoteBanListHosts.cfg">
                                        Squad Wiki
                                      </a>
                                      .
                                    </p>
                                  </ModalBody>
                                </Modal>
                              </>
                            )}
                          </AdvancedModal>
                          <Button
                            size="sm"
                            color="info"
                            tag={Link}
                            to={`/export-ban-lists/${exportBanList.id}`}
                          >
                            Edit
                          </Button>
                          <DeleteExportBanList exportBanListID={exportBanList.id} />
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </Table>
            <CardBody>
              <Row>
                <Col className="text-center">
                  <Button color="info" tag={Link} to="/export-ban-lists/new">
                    Create Export Ban List
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </section>
    </Layout>
  );
}
