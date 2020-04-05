import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

import { Button, FormGroup, FormFeedback, Input, Row, Col } from 'reactstrap';

import { query } from './ban-lists';

import { ErrorModal, OrganizationSelect } from './index';

const addMutation = gql`
  mutation AddBanList(
    $name: String!
    $type: String!
    $source: String!
    $organization: String!
  ) {
    addBanList(
      name: $name
      type: $type
      source: $source
      organization: $organization
    ) {
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

const updateMutation = gql`
  mutation UpdateBanList(
    $_id: String!
    $name: String!
    $type: String!
    $source: String!
    $organization: String!
  ) {
    updateBanList(
      _id: $_id
      name: $name
      type: $type
      source: $source
      organization: $organization
    ) {
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

class BanListAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name || '',
      type: props.type || 'battlemetrics',
      source: props.source || '',
      organization: props.organization || null
    };
  }

  render() {
    return (
      <Mutation
        mutation={this.props.update ? updateMutation : addMutation}
        update={(cache, { data: { addBanList } }) => {
          if (!this.props.update) {
            let { banLists } = cache.readQuery({ query });
            banLists = banLists.concat([addBanList]);
            cache.writeQuery({ query, data: { banLists } });
            this.setState({ id: '', name: '', organization: null });
          }

          if (typeof this.props.onSubmit === 'function') this.props.onSubmit();
        }}
        onError={() => {}}
      >
        {(submitBanList, { loading, error }) => {
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
                  <label className="form-control-label">Ban List Name</label>
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
                      An ban list's name cannot be blank.
                    </FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <label className="form-control-label">Organization</label>
                  <FormGroup>
                    <OrganizationSelect
                      value={this.state.organization}
                      onChange={event =>
                        this.setState({
                          organization: event.target.value
                        })
                      }
                    />
                    <FormFeedback>
                      An organization must be selected.
                    </FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <label className="form-control-label">
                    Battlemetrics Ban List ID
                  </label>
                  <FormGroup>
                    <Input
                      className="form-control-alternative"
                      type="text"
                      value={this.state.source}
                      onChange={event =>
                        this.setState({ source: event.target.value })
                      }
                      invalid={this.state.source.length === 0}
                    />
                    <FormFeedback>
                      A BattleMetrics ban list ID cannot be blank.
                    </FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col className="text-center">
                  <Button
                    color="primary"
                    onClick={() => {
                      submitBanList({
                        variables: {
                          ...this.state,
                          _id: this.props._id
                        }
                      });
                    }}
                    disabled={
                      this.state.name.length === 0 ||
                      this.state.organization === null ||
                      this.state.source.length === 0
                    }
                  >
                    {this.props.update ? 'Edit' : 'Add'} Ban List
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

export default BanListAdd;
