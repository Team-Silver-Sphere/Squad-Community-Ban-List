import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import moment from 'moment';

import { discordLink } from 'core/config/web-server';

import {
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';
import AdvancedModal from './advanced-modal';
import { Link } from 'react-router-dom';

const query = gql`
  query PlayerBans($steamID: String!) {
    organizations {
      _id
      name
      appeal
      official

      banLists {
        _id
        name

        activePlayerBans: playerBans(steamID: $steamID, expired: false) {
          _id
          created
          expires
          reason
        }

        expiredPlayerBans: playerBans(steamID: $steamID, expired: true) {
          _id
          created
          expires
          reason
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
                    <Col sm="12" md="6" className="mb-2" key={key}>
                      <h2>
                        <i className="fa fa-arrow-right mr-2" />
                        {organization.name}
                      </h2>
                      {organization.banLists.map((banList, key) => {
                        if (banList.activePlayerBans.length === 0) return null;

                        return (
                          <div className="ml-5" key={key}>
                            <h3>{banList.name}</h3>
                            {banList.activePlayerBans.map((ban, key) => (
                              <div key={key}>
                                <h4 className="ml-3">Ban #{key + 1}</h4>
                                <h5 className="ml-4">
                                  Created:{' '}
                                  {moment(ban.created).format(
                                    'hh:mm DD/MM/YYYY'
                                  )}
                                </h5>
                                <h5 className="ml-4">
                                  Expires:{' '}
                                  {ban.expires === null
                                    ? 'Permanent Ban'
                                    : moment(ban.expires).format(
                                        'hh:mm DD/MM/YYYY'
                                      )}
                                </h5>
                                {organization.official ? (
                                  <h5 className="ml-4">
                                    Reason: See{' '}
                                    <a href={ban.reason[0]}>
                                      OWI Hosting Discord
                                    </a>
                                  </h5>
                                ) : (
                                  <h5 className="ml-4">
                                    Classified Reason:{' '}
                                    {ban.reason.length > 0
                                      ? ban.reason.join(', ')
                                      : 'Unknown'}
                                  </h5>
                                )}
                                <AdvancedModal isOpen={false}>
                                  {modal => (
                                    <>
                                      <h5 className="ml-4">
                                        Appeal:{' '}
                                        <span
                                          style={{
                                            color: '#5e72e4',
                                            textDecoration: 'none',
                                            backgroundColor: 'transparent',
                                            cursor: 'pointer'
                                          }}
                                          onClick={modal.open}
                                        >
                                          View Details
                                        </span>
                                      </h5>

                                      <Modal
                                        className="modal-dialog-centered"
                                        isOpen={modal.isOpen}
                                        toggle={modal.close}
                                      >
                                        <ModalHeader toggle={modal.close}>
                                          Appeal Process
                                        </ModalHeader>
                                        <ModalBody>
                                          {organization.official ? (
                                            <p className="font-italic">
                                              The Squad Community Ban List has
                                              issued this ban as the result of
                                              strong evidence being provided of
                                              a more serious rule break
                                              occurring. This ban has a fixed
                                              length and can only be appealed
                                              under exception circumstances via
                                              our{' '}
                                              <a href={discordLink}>Discord</a>.
                                              Please see our{' '}
                                              <Link to="/faq">FAQ</Link> for
                                              more details.
                                            </p>
                                          ) : (
                                            <>
                                              <p className="font-italic">
                                                "{organization.name}" is
                                                responsible for the issuing of
                                                bans on this ban list. The Squad
                                                Community Ban List organization
                                                has no say over the issuing of
                                                bans on this ban list and
                                                therefore does not handle
                                                appeals. All appeals for bans on
                                                this ban list should be made
                                                with "{organization.name}".
                                                Appeals can be made by:
                                              </p>
                                              <p>{organization.appeal}</p>
                                            </>
                                          )}
                                        </ModalBody>
                                      </Modal>
                                    </>
                                  )}
                                </AdvancedModal>
                              </div>
                            ))}
                          </div>
                        );
                      })}
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
                    <Col sm="12" md="6" className="mb-2" key={key}>
                      <h2>
                        <i className="fa fa-arrow-right mr-2" />
                        {organization.name}
                      </h2>
                      {organization.banLists.map((banList, key) => {
                        if (banList.expiredPlayerBans.length === 0) return null;

                        return (
                          <div className="ml-5" key={key}>
                            <h3>{banList.name}</h3>
                            {banList.expiredPlayerBans.map((ban, key) => (
                              <div key={key}>
                                <h4 className="ml-3">Ban #{key + 1}</h4>
                                <h5 className="ml-4">
                                  Created:{' '}
                                  {moment(ban.created).format(
                                    'hh:mm DD/MM/YYYY'
                                  )}
                                </h5>
                                <h5 className="ml-4">
                                  Expired On:{' '}
                                  {ban.expires === null
                                    ? 'Permanent Ban'
                                    : moment(ban.expires).format(
                                        'hh:mm DD/MM/YYYY'
                                      )}
                                </h5>
                                {organization.official ? (
                                  <h5 className="ml-4">
                                    Reason: See{' '}
                                    <a href={ban.reason[0]}>
                                      OWI Hosting Discord
                                    </a>
                                  </h5>
                                ) : (
                                  <h5 className="ml-4">
                                    Reason:{' '}
                                    {ban.reason.length > 0
                                      ? ban.reason.join(', ')
                                      : 'Unknown'}
                                  </h5>
                                )}
                              </div>
                            ))}
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
                        banList.activePlayerBans.length !== 0 ||
                        banList.expiredPlayerBans.length !== 0
                    )
                  )
                    return null;

                  return (
                    <Col sm="12" md="6" className="mb-2" key={key}>
                      <h2>
                        <i className="fa fa-arrow-right mr-2" />
                        {organization.name}
                      </h2>
                      {organization.banLists.map((banList, key) => (
                        <div className="ml-5" key={key}>
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
