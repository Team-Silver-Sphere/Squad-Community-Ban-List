import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

import { Button, FormGroup, FormFeedback, Input, Row, Col } from 'reactstrap';

import { query } from './organizations';

import { ErrorModal } from './index';

const mutation = gql`
  mutation CreateOrganization(
    $name: String!
    $contact: String!
    $appeal: String!
  ) {
    createOrganization(name: $name, contact: $contact, appeal: $appeal) {
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

class OrganizationCreate extends React.Component {
  state = { name: '', contact: '', appeal: '' };

  render() {
    return (
      <Mutation
        mutation={mutation}
        update={(cache, { data: { createOrganization } }) => {
          let { organizations } = cache.readQuery({ query });
          organizations = organizations.concat([createOrganization]);
          cache.writeQuery({ query, data: { organizations } });

          this.setState({ name: '', contact: '', appeal: '' });
          if (typeof this.props.onCreate === 'function') this.props.onCreate();
        }}
        onError={() => {}}
      >
        {(createOrganization, { loading, error }) => {
          if (loading)
            return (
              <>
                <div className="text-center mt-2 mb-3">Loading...</div>
                <div className="btn-wrapper text-center">
                  <i className="fas fa-circle-notch fa-spin fa-4x" />
                </div>
              </>
            );

          return (
            <>
              {error && <ErrorModal errors={error.graphQLErrors} />}
              <Row>
                <Col>
                  <label className="form-control-label">
                    Organization Name
                  </label>
                  <FormGroup>
                    <Input
                      className="form-control-alternative"
                      type="text"
                      value={this.state.name}
                      onChange={event =>
                        this.setState({ name: event.target.value })
                      }
                      invalid={this.state.name.length === 0}
                    />
                    <FormFeedback>
                      An organization's name cannot be blank.
                    </FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <label className="form-control-label">
                    Organization Contact
                  </label>
                  <FormGroup>
                    <Input
                      className="form-control-alternative"
                      type="textarea"
                      value={this.state.contact}
                      onChange={event =>
                        this.setState({ contact: event.target.value })
                      }
                      invalid={this.state.contact.length === 0}
                    />
                    <FormFeedback>
                      A contact for the organization must be provided.
                    </FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <label className="form-control-label">
                    Organization Appeal Process
                  </label>
                  <FormGroup>
                    <Input
                      className="form-control-alternative"
                      type="textarea"
                      value={this.state.appeal}
                      onChange={event =>
                        this.setState({ appeal: event.target.value })
                      }
                      invalid={this.state.appeal.length === 0}
                    />
                    <FormFeedback>
                      Information on how to appeal bans for the organization
                      must be provided.
                    </FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col className="text-center">
                  <Button
                    color="primary"
                    onClick={() => {
                      createOrganization({ variables: this.state });
                    }}
                    disabled={
                      this.state.name.length === 0 ||
                      this.state.contact.length === 0 ||
                      this.state.appeal.length === 0
                    }
                  >
                    Create Organization
                  </Button>
                </Col>
              </Row>
            </>
          );
        }}
      </Mutation>
    );
  }
}

export default OrganizationCreate;
