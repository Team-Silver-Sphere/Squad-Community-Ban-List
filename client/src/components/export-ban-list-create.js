import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation, Query } from 'react-apollo';
import { set } from 'lodash/fp';

import { Row, Col, Input, Button, FormGroup, FormFeedback } from 'reactstrap';

import { ErrorModal } from './index.js';

import { query as updateQuery } from './export-ban-lists';

const query = gql`
  query {
    organizations {
      _id
      name

      battlemetricsBanLists {
        _id
        name
      }
    }
  }
`;

const createMutation = gql`
  mutation CreateExportBanList($name: String!, $config: String!) {
    createExportBanList(name: $name, config: $config) {
      _id
      name
      config
    }
  }
`;

const updateMutation = gql`
  mutation UpdateExportBanList(
    $_id: String!
    $name: String!
    $config: String!
  ) {
    updateExportBanList(_id: $_id, name: $name, config: $config) {
      _id
      name
      config
    }
  }
`;

class ExportBanListCreate extends React.Component {
  constructor(props) {
    super(props);

    const config = props.config ? JSON.parse(props.config) : {};

    this.state = {
      name: props.name || '',
      ...config
    };
  }

  render() {
    return (
      <Query query={query} onError={() => {}}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <>
                <div className="text-center mt-2 mb-3">Loading...</div>
                <div className="btn-wrapper text-center">
                  <i className="fas fa-circle-notch fa-spin fa-4x" />
                </div>
              </>
            );

          if (error)
            return (
              <>
                <div className="text-center mt-2 mb-2">Error!</div>
                <div className="btn-wrapper text-center">
                  <i className="fas fa-exclamation-triangle fa-4x" />
                </div>
                <div className="text-center mt-2 mb-2">
                  Something went wrong. Sad times.
                </div>
              </>
            );

          return (
            <Mutation
              mutation={this.props.update ? updateMutation : createMutation}
              update={(cache, { data: { createExportBanList } }) => {
                if (!this.props.update) {
                  let oldData = cache.readQuery({ query: updateQuery });
                  let newData = set(
                    'currentSteamUser.exportBanLists',
                    oldData.currentSteamUser.exportBanLists.concat([
                      createExportBanList
                    ]),
                    oldData
                  );
                  cache.writeQuery({ query: updateQuery, data: newData });

                  const organizationStates = {};
                  data.organizations.forEach(organization => {
                    organizationStates[`${organization._id}-active`] = 3;
                    organizationStates[`${organization._id}-expired`] = 1;
                  });

                  this.setState({
                    ...organizationStates,
                    name: '',
                    threshold: 9
                  });
                }

                if (typeof this.props.onSubmit === 'function')
                  this.props.onSubmit();
              }}
              onError={() => {}}
            >
              {(submitExportBanList, { loading, error }) => {
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
                    <h6 className="heading-small text-muted mb-4">General</h6>
                    <Row>
                      <Col>
                        <label className="form-control-label">Name</label>
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
                            An export ban list's name cannot be blank.
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <label className="form-control-label">Threshold</label>
                        <Input
                          className="form-control-alternative"
                          type="number"
                          value={this.state.threshold}
                          onChange={event =>
                            this.setState({ threshold: event.target.value })
                          }
                        />
                      </Col>
                    </Row>
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                      Organization Weights
                    </h6>
                    <Row>
                      {data.organizations.map((organization, key) => {
                        if (organization.battlemetricsBanLists.length === 0)
                          return null;
                        return (
                          <Col sm="12" className="mb-4" key={key}>
                            <h4>{organization.name}</h4>
                            <Row className="pl-4">
                              {organization.battlemetricsBanLists.map(
                                (battlemetricsBanList, key) => (
                                  <Col sm="12" md="6" key={key}>
                                    <label className="form-control-label">
                                      {battlemetricsBanList.name} (Active)
                                    </label>
                                    <Input
                                      className="form-control-alternative"
                                      type="number"
                                      value={
                                        `${battlemetricsBanList._id}-active` in
                                        this.state
                                          ? this.state[
                                              `${battlemetricsBanList._id}-active`
                                            ]
                                          : 3
                                      }
                                      onChange={event => {
                                        if (event.target.value !== '3')
                                          this.setState({
                                            [`${battlemetricsBanList._id}-active`]: event
                                              .target.value
                                          });
                                        else {
                                          delete this.state[
                                            `${battlemetricsBanList._id}-active`
                                          ];
                                          this.setState(this.state);
                                        }
                                      }}
                                    />
                                  </Col>
                                )
                              )}
                              {organization.battlemetricsBanLists.map(
                                (battlemetricsBanList, key) => (
                                  <Col sm="12" md="6" key={key}>
                                    <label className="form-control-label">
                                      {battlemetricsBanList.name} (Expired)
                                    </label>
                                    <Input
                                      className="form-control-alternative"
                                      type="number"
                                      value={
                                        `${battlemetricsBanList._id}-expired` in
                                        this.state
                                          ? this.state[
                                              `${battlemetricsBanList._id}-expired`
                                            ]
                                          : 1
                                      }
                                      onChange={event => {
                                        if (event.target.value !== '1')
                                          this.setState({
                                            [`${battlemetricsBanList._id}-expired`]: event
                                              .target.value
                                          });
                                        else {
                                          delete this.state[
                                            `${battlemetricsBanList._id}-expired`
                                          ];
                                          this.setState(this.state);
                                        }
                                      }}
                                    />
                                  </Col>
                                )
                              )}
                            </Row>
                          </Col>
                        );
                      })}
                    </Row>
                    <Row>
                      <Col className="text-center">
                        <Button
                          color="primary"
                          disabled={
                            this.state.name.length === 0 ||
                            Object.keys(this.state).some(
                              key =>
                                key !== 'name' &&
                                this.state[key] !== '0' &&
                                this.state[key] !== 0 &&
                                !parseInt(this.state[key])
                            )
                          }
                          onClick={() => {
                            let config = {};

                            Object.keys(this.state).forEach(key => {
                              if (key === 'name') return;
                              if (
                                this.state[key] === '0' ||
                                this.state[key] === 0
                              )
                                config[key] = 0;
                              config[key] = parseInt(this.state[key]);
                            });

                            submitExportBanList({
                              variables: {
                                _id: this.props._id,
                                name: this.state.name,
                                config: JSON.stringify(config)
                              }
                            });
                          }}
                        >
                          {this.props.update ? 'Update' : 'Create'} Export Ban
                          List
                        </Button>
                      </Col>
                    </Row>
                  </>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default ExportBanListCreate;
