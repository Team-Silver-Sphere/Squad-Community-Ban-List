import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import moment from 'moment';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table
} from 'reactstrap';

import {
  AdvancedModal,
  ExportBanListDelete,
  ExportBanListCreate
} from './index';

const query = gql`
  query {
    currentSteamUser {
      exportBanListsLimit
      exportBanLists {
        _id
        name
        lastFetched
      }
    }
  }
`;

export { query };

export default function() {
  return (
    <Query query={query} onError={() => {}}>
      {({ loading, error, data }) => {
        if (loading)
          return (
            <Card className=" shadow">
              <CardHeader className=" bg-transparent">
                <h3 className=" mb-0">Export Ban Lists</h3>
              </CardHeader>
              <CardBody>
                <div className="text-center mt-2 mb-3">Loading...</div>
                <div className="btn-wrapper text-center">
                  <i className="fas fa-circle-notch fa-spin fa-4x" />
                </div>
              </CardBody>
            </Card>
          );

        if (error)
          return (
            <Card className=" shadow">
              <CardHeader className=" bg-transparent">
                <h3 className=" mb-0">Export Ban Lists</h3>
              </CardHeader>
              <CardBody>
                <div className="text-center mt-2 mb-2">Error!</div>
                <div className="btn-wrapper text-center">
                  <i className="fas fa-exclamation-triangle fa-4x" />
                </div>
                <div className="text-center mt-2 mb-2">
                  Something went wrong. Sad times.
                </div>
              </CardBody>
            </Card>
          );

        return (
          <Card className=" shadow">
            <CardHeader className=" bg-transparent">
              <h3 className=" mb-0">
                Export Ban Lists ({data.currentSteamUser.exportBanLists.length}{' '}
                / {data.currentSteamUser.exportBanListsLimit})
              </h3>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th>Export Ban List Name</th>
                  <th>Last Fetched</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.currentSteamUser.exportBanLists.map(
                  (exportBanList, key) => (
                    <tr key={key}>
                      <th>{exportBanList.name}</th>
                      <td>
                        {moment
                          .utc(exportBanList.lastFetched)
                          .format('DD/MM/YYYY HH:mm')}
                      </td>
                      <td>
                        <AdvancedModal isOpen={false}>
                          {modal => (
                            <>
                              <Button
                                className="ml-4"
                                color="info"
                                size="sm"
                                onClick={modal.open}
                              >
                                Install Remote Ban List
                              </Button>

                              <Modal
                                className="modal-dialog-centered"
                                isOpen={modal.isOpen}
                                toggle={modal.close}
                              >
                                <ModalHeader toggle={modal.close}>
                                  Remote Ban List
                                </ModalHeader>
                                <ModalBody>
                                  <p>
                                    To use the export ban list within your Squad
                                    server the following URL can be added as a
                                    remote ban list on the server. For
                                    information on how to achieve this please
                                    refer to the{' '}
                                    <a href="https://squad.gamepedia.com/Server_Configuration#Remote_Ban_Lists_in_RemoteBanListHosts.cfg">
                                      Squad Wiki page
                                    </a>
                                    .
                                  </p>
                                  <code>
                                    {`${window.location.protocol}//${window.location.hostname}/export/${exportBanList._id}`}
                                  </code>
                                </ModalBody>
                              </Modal>
                            </>
                          )}
                        </AdvancedModal>
                        <ExportBanListDelete _id={exportBanList._id} />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
            <CardBody>
              <Row>
                <Col className="text-center">
                  <AdvancedModal isOpen={false}>
                    {modal => (
                      <>
                        <Button color="primary" onClick={modal.open}>
                          Create Export Ban List
                        </Button>

                        <Modal
                          className="modal-dialog-centered"
                          isOpen={modal.isOpen}
                          toggle={modal.close}
                        >
                          <ModalHeader toggle={modal.close}>
                            Create Export Ban List
                          </ModalHeader>
                          <ModalBody className="bg-secondary">
                            <ExportBanListCreate onCreate={modal.close} />
                          </ModalBody>
                        </Modal>
                      </>
                    )}
                  </AdvancedModal>
                </Col>
              </Row>
            </CardBody>
          </Card>
        );
      }}
    </Query>
  );
}
