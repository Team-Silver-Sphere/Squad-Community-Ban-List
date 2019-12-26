import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  Row,
  Col
} from 'reactstrap';

import { AdvancedModal, OrganizationCreate } from './index';

const query = gql`
  query {
    organizations {
      _id
      name
      contact
      appeal

      uniqueBannedSteamIDCount

      battlemetricsBanLists {
        _id
        name
        battlemetricsBanCount
      }
    }
  }
`;

export { query };

export default function() {
  return (
    <Card className=" shadow">
      <CardHeader className=" bg-transparent">
        <h3 className=" mb-0">Organizations</h3>
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
                    <th>Ban Lists</th>
                    <th>Bans</th>
                    <th>Unique Banned Steam IDs</th>
                    <th>More Info</th>
                  </tr>
                </thead>
                <tbody>
                  {data.organizations.map((organization, key) => (
                    <tr key={key}>
                      <th>{organization.name}</th>
                      <td>
                        {organization.battlemetricsBanLists
                          .map(banList => banList.name)
                          .join(', ')}
                      </td>
                      <td>
                        {organization.battlemetricsBanLists
                          .map(banList => banList.battlemetricsBanCount)
                          .reduce((a, b) => a + b, 0)}
                      </td>
                      <td>{organization.uniqueBannedSteamIDCount}</td>
                      <td>
                        <AdvancedModal isOpen={false}>
                          {modal => (
                            <>
                              <Button
                                color="info"
                                size="sm"
                                onClick={modal.open}
                              >
                                View Contact Info
                              </Button>

                              <Modal
                                className="modal-dialog-centered"
                                isOpen={modal.isOpen}
                                toggle={modal.close}
                              >
                                <ModalHeader toggle={modal.close}>
                                  Contact
                                </ModalHeader>
                                <ModalBody>
                                  <p>{organization.contact}</p>
                                </ModalBody>
                              </Modal>
                            </>
                          )}
                        </AdvancedModal>
                        <AdvancedModal isOpen={false}>
                          {modal => (
                            <>
                              <Button
                                color="info"
                                size="sm"
                                onClick={modal.open}
                              >
                                Appeal
                              </Button>

                              <Modal
                                className="modal-dialog-centered"
                                isOpen={modal.isOpen}
                                toggle={modal.close}
                              >
                                <ModalHeader toggle={modal.close}>
                                  Appeal Process
                                </ModalHeader>
                                <ModalBody>
                                  <p>{organization.appeal}</p>
                                </ModalBody>
                              </Modal>
                            </>
                          )}
                        </AdvancedModal>
                        <AdvancedModal isOpen={false}>
                          {modal => (
                            <>
                              <Button
                                color="warning"
                                size="sm"
                                onClick={modal.open}
                              >
                                Edit Organisation
                              </Button>

                              <Modal
                                className="modal-dialog-centered"
                                isOpen={modal.isOpen}
                                toggle={modal.close}
                              >
                                <ModalHeader toggle={modal.close}>
                                  Edit Organisation
                                </ModalHeader>
                                <ModalBody className="bg-secondary">
                                  <OrganizationCreate
                                    _id={organization._id}
                                    name={organization.name}
                                    contact={organization.contact}
                                    appeal={organization.appeal}
                                    update={true}
                                    onSubmit={modal.close}
                                    key={organization._id}
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
                            Create Organisation
                          </Button>

                          <Modal
                            className="modal-dialog-centered"
                            isOpen={modal.isOpen}
                            toggle={modal.close}
                          >
                            <ModalHeader toggle={modal.close}>
                              Create Organisation
                            </ModalHeader>
                            <ModalBody className="bg-secondary">
                              <OrganizationCreate onCreate={modal.close} />
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
