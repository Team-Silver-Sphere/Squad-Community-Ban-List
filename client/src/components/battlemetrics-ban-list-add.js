import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

import { Button, FormGroup, FormFeedback, Input, Row, Col } from 'reactstrap';

import { query } from './battlemetrics-ban-lists';

import { ErrorModal, OrganizationSelect } from './index';

const addMutation = gql`
  mutation AddBattlemetricsBanList(
    $id: String!
    $name: String!
    $organization: String!
  ) {
    addBattlemetricsBanList(id: $id, name: $name, organization: $organization) {
      _id
      id
      name

      battlemetricsBanCount
      uniqueBannedSteamIDCount

      organization {
        _id
        name
      }
    }
  }
`;

const updateMutation = gql`
  mutation UpdateBattlemetricsBanList(
    $_id: String!
    $id: String!
    $name: String!
    $organization: String!
  ) {
    updateBattlemetricsBanList(
      _id: $_id
      id: $id
      name: $name
      organization: $organization
    ) {
      _id
      id
      name

      battlemetricsBanCount
      uniqueBannedSteamIDCount

      organization {
        _id
        name
      }
    }
  }
`;

class BattlemetricsBanListAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id || '',
      name: props.name || '',
      organization: props.organization || null
    };
  }

  render() {
    return (
      <Mutation
        mutation={this.props.update ? updateMutation : addMutation}
        update={(cache, { data: { addBattlemetricsBanList } }) => {
          if (!this.props.update) {
            let { battlemetricsBanLists } = cache.readQuery({ query });
            battlemetricsBanLists = battlemetricsBanLists.concat([
              addBattlemetricsBanList
            ]);
            cache.writeQuery({ query, data: { battlemetricsBanLists } });
            this.setState({ id: '', name: '', organization: null });
          }

          if (typeof this.props.onSubmit === 'function') this.props.onSubmit();
        }}
        onError={() => {}}
      >
        {(submitBattlemetricsBanList, { loading, error }) => {
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
                  <label className="form-control-label">Ban List ID</label>
                  <FormGroup>
                    <Input
                      className="form-control-alternative"
                      type="text"
                      value={this.state.id}
                      onChange={event =>
                        this.setState({ id: event.target.value })
                      }
                      invalid={this.state.id.length === 0}
                    />
                    <FormFeedback>A ban list ID cannot be blank.</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
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
              <Row className="justify-content-center">
                <Col className="text-center">
                  <Button
                    color="primary"
                    onClick={() => {
                      submitBattlemetricsBanList({
                        variables: {
                          ...this.state,
                          _id: this.props._id
                        }
                      });
                    }}
                    disabled={
                      this.state.id.length === 0 ||
                      this.state.name.length === 0 ||
                      this.state.organization === null
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

export default BattlemetricsBanListAdd;
