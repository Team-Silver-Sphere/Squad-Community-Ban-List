import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import {
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';
import AdvancedModal from './advanced-modal';

const query = gql`
  query PlayerBans($steamID: String!) {
    organizations {
      _id
      name
      appeal

      playerBans(steamID: $steamID) {
        uid
        reason
      }
    }
  }
`;

export { query };

export default function(props) {
  if (!props.steamID) return null;
  return (
    <Card className=" shadow">
      <CardHeader className=" bg-transparent">
        <h3 className=" mb-0">Results for {props.steamID}</h3>
      </CardHeader>

      <Query query={query} variables={props} onError={() => {}}>
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

          console.log(data);

          return (
            <CardBody>
              <h6 className="heading-small text-muted mb-4">Banned on...</h6>
              <Row>
                {data.organizations.map((organization, key) => {
                  if (organization.playerBans.length === 0) return null;
                  return (
                    <Col sm="12" md="6" key={key}>
                      <h4 className="text-danger">
                        <i className="fa fa-times mr-2" />
                        {organization.name}
                      </h4>
                      <AdvancedModal isOpen={false}>
                        {modal => (
                          <>
                            <Button
                              className="ml-4"
                              color="warning"
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
                                <p className="font-italic">
                                  The Squad Community Ban List organization is
                                  not responsible for the issuing of bans on
                                  partnered organization's servers and therefore
                                  does not handle appeals. All appeals should be
                                  made with the relevant organization, in this
                                  case "{organization.name}". Appeals can be
                                  made with "{organization.name}" by:
                                </p>
                                <p>{organization.appeal}</p>
                              </ModalBody>
                            </Modal>
                          </>
                        )}
                      </AdvancedModal>
                    </Col>
                  );
                })}
              </Row>
              <hr className="my-4" />
              <h6 className="heading-small text-muted mb-4">
                Not banned on...
              </h6>
              <Row>
                {data.organizations.map((organization, key) => {
                  if (organization.playerBans.length !== 0) return null;
                  return (
                    <Col sm="12" md="6" key={key}>
                      <h4 className="text-success">
                        <i className="fa fa-check mr-2" />
                        {organization.name}
                      </h4>
                    </Col>
                  );
                })}
              </Row>
            </CardBody>
          );
        }}
      </Query>
    </Card>
  );
}
