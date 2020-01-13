import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

import { Button, FormGroup, FormFeedback, Input, Row, Col } from 'reactstrap';

import { query } from './organizations';

import { ErrorModal } from './index';

const createMutation = gql`
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

      banLists {
        _id
        name
        banCount
      }
    }
  }
`;

const updateMutation = gql`
  mutation UpdateOrganization(
    $_id: String!
    $name: String!
    $contact: String!
    $appeal: String!
  ) {
    updateOrganization(
      _id: $_id
      name: $name
      contact: $contact
      appeal: $appeal
    ) {
      _id
      name
      contact
      appeal
      uniqueBannedSteamIDCount

      banLists {
        _id
        name
        banCount
      }
    }
  }
`;

class OrganizationCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name || '',
      contact: props.contact || '',
      appeal: props.appeal || ''
    };
  }

  render() {
    return (
      <Mutation
        mutation={this.props.update ? updateMutation : createMutation}
        update={(cache, { data: { createOrganization } }) => {
          if (!this.props.update) {
            let { organizations } = cache.readQuery({ query });
            organizations = organizations.concat([createOrganization]);
            cache.writeQuery({ query, data: { organizations } });
            this.setState({ name: '', contact: '', appeal: '' });
          }

          if (typeof this.props.onSubmit === 'function') this.props.onSubmit();
        }}
        onError={() => {}}
      >
        {(submitOrganization, { loading, error }) => {
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
                      submitOrganization({
                        variables: {
                          ...this.state,
                          _id: this.props._id
                        }
                      });
                    }}
                    disabled={
                      this.state.name.length === 0 ||
                      this.state.contact.length === 0 ||
                      this.state.appeal.length === 0
                    }
                  >
                    {this.props.update ? 'Edit' : 'Create'} Organization
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
