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

      banLists {
        _id
        name

        activePlayerBans: playerBans(steamID: $steamID, expired: false) {
          _id
        }

        expiredPlayerBans: playerBans(steamID: $steamID, expired: true) {
          _id
        }
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

          return (
            <CardBody>
              <h6 className="heading-small text-muted mb-2">Banned on...</h6>
              <Row>
                {data.organizations.map((organization, key) => {
                  if (
                    organization.banLists.every(
                      banList => banList.activePlayerBans.length === 0
                    )
                  )
                    return null;
                  return (
                    <Col sm="12" md="6" key={key}>
                      <h2>{organization.name}</h2>
                      {organization.banLists.map((banList, key) => {
                        if (banList.activePlayerBans.length === 0) return null;
                        return (
                          <div className="ml-4" key={key}>
                            <h3>{banList.name}</h3>
                            <h4 className="ml-3">
                              Active Bans: {banList.activePlayerBans.length}
                            </h4>
                          </div>
                        );
                      })}
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
              <h6 className="heading-small text-muted mb-2">
                Previously banned on...
              </h6>
              <Row>
                {data.organizations.map((organization, key) => {
                  if (
                    organization.banLists.every(
                      banList => banList.expiredPlayerBans.length === 0
                    )
                  )
                    return null;
                  return (
                    <Col sm="12" md="6" key={key}>
                      <h2>{organization.name}</h2>
                      {organization.banLists.map((banList, key) => {
                        if (banList.expiredPlayerBans.length === 0) return null;
                        return (
                          <div className="ml-4" key={key}>
                            <h3>{banList.name}</h3>
                            <h4 className="ml-4">
                              Expired Bans: {banList.expiredPlayerBans.length}
                            </h4>
                          </div>
                        );
                      })}
                    </Col>
                  );
                })}
              </Row>
              <hr className="my-4" />
              <h6 className="heading-small text-muted mb-2">
                Not banned on...
              </h6>
              <Row>
                {data.organizations.map((organization, key) => {
                  if (
                    organization.banLists.some(
                      banList =>
                        banList.activePlayerBans !== 0 ||
                        banList.expiredPlayerBans !== 0
                    )
                  )
                    return null;

                  return (
                    <Col sm="12" md="6" key={key}>
                      <h2>{organization.name}</h2>
                      {organization.banList.map((banList, key) => (
                        <div className="ml-4" key={key}>
                          <h3>{banList.name}</h3>
                        </div>
                      ))}
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
