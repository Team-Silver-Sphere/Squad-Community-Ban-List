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

import { AdvancedModal, BattlemetricsBanListAdd } from './index';

const query = gql`
  query {
    battlemetricsBanLists {
      _id
      id
      name
      lastImported

      battlemetricsBanCount
      uniqueBannedSteamIDCount

      organization {
        _id
        name
      }
    }
  }
`;

export { query };

export default function() {
  return (
    <Card className=" shadow">
      <CardHeader className=" bg-transparent">
        <h3 className=" mb-0">Battlemetrics Ban Lists</h3>
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
                    <th>ID</th>
                    <th>Organization Name</th>
                    <th>Name</th>
                    <th>Last Imported</th>
                    <th>Bans</th>
                    <th>Unique Steam IDs</th>
                  </tr>
                </thead>
                <tbody>
                  {data.battlemetricsBanLists.map(
                    (battlemetricsBanList, key) => (
                      <tr key={key}>
                        <th>{battlemetricsBanList.id}</th>
                        <td>{battlemetricsBanList.organization.name}</td>
                        <td>{battlemetricsBanList.name}</td>
                        <td>
                          {moment
                            .utc(battlemetricsBanList.lastImported)
                            .format('DD/MM/YYYY HH:mm')}
                        </td>
                        <td>{battlemetricsBanList.battlemetricsBanCount}</td>
                        <td>{battlemetricsBanList.uniqueBannedSteamIDCount}</td>
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
                            Add BattleMetrics Ban List
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
                              <BattlemetricsBanListAdd onCreate={modal.close} />
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
