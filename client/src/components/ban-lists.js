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

import { AdvancedModal, BanListAdd } from './index';

const query = gql`
  query {
    banLists {
      _id
      name
      type
      source

      lastImported

      organization {
        _id
        name
      }

      banCount
      uniqueBannedSteamIDCount
    }
  }
`;

export { query };

export default function() {
  return (
    <Card className=" shadow">
      <CardHeader className=" bg-transparent">
        <h3 className=" mb-0"> Ban Lists</h3>
      </CardHeader>

      <Query query={query} onError={() => {}}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <CardBody>
                <div className="text-center mt-2 mb-3">Loading...</div>
                <div className="btn-wrapper text-center">
                  <i className="fas fa-circle-notch fa-spin fa-4x" />
                </div>
              </CardBody>
            );

          if (error)
            return (
              <CardBody>
                <div className="text-center mt-2 mb-2">Error!</div>
                <div className="btn-wrapper text-center">
                  <i className="fas fa-exclamation-triangle fa-4x" />
                </div>
                <div className="text-center mt-2 mb-2">
                  Something went wrong. Sad times.
                </div>
              </CardBody>
            );

          return (
            <>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th>Organization Name</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Last Imported</th>
                    <th>Bans</th>
                    <th>Unique Steam IDs</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.banLists.map((banList, key) => (
                    <tr key={key}>
                      <th>{banList.organization.name}</th>
                      <td>{banList.name}</td>
                      <td>
                        {banList.type
                          .replace('battlemetrics', 'BattleMetrics')
                          .replace('tt', 'TT')}
                      </td>
                      <td>
                        {moment
                          .utc(banList.lastImported)
                          .format('DD/MM/YYYY HH:mm')}
                      </td>
                      <td>{banList.banCount}</td>
                      <td>{banList.uniqueBannedSteamIDCount}</td>
                      <td>
                        <AdvancedModal isOpen={false}>
                          {modal => (
                            <>
                              <Button
                                color="warning"
                                size="sm"
                                onClick={modal.open}
                              >
                                Edit
                              </Button>

                              <Modal
                                className="modal-dialog-centered"
                                isOpen={modal.isOpen}
                                toggle={modal.close}
                              >
                                <ModalHeader toggle={modal.close}>
                                  Edit BattleMetrics Ban List
                                </ModalHeader>
                                <ModalBody className="bg-secondary">
                                  <BanListAdd
                                    _id={banList._id}
                                    name={banList.name}
                                    type={banList.type}
                                    source={banList.source}
                                    organization={banList.organization._id}
                                    update={true}
                                    onSubmit={modal.close}
                                    key={banList._id}
                                  />
                                </ModalBody>
                              </Modal>
                            </>
                          )}
                        </AdvancedModal>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <CardBody>
                <Row>
                  <Col className="text-center">
                    <AdvancedModal isOpen={false}>
                      {modal => (
                        <>
                          <Button color="primary" onClick={modal.open}>
                            Add Ban List
                          </Button>

                          <Modal
                            className="modal-dialog-centered"
                            isOpen={modal.isOpen}
                            toggle={modal.close}
                          >
                            <ModalHeader toggle={modal.close}>
                              Add BattleMetrics Ban List
                            </ModalHeader>
                            <ModalBody className="bg-secondary">
                              <BanListAdd onSubmit={modal.close} />
                            </ModalBody>
                          </Modal>
                        </>
                      )}
                    </AdvancedModal>
                  </Col>
                </Row>
              </CardBody>
            </>
          );
        }}
      </Query>
    </Card>
  );
}
