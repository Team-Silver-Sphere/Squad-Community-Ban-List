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

const mutation = gql`
  mutation CreateExportBanList($name: String!, $config: String!) {
    createExportBanList(name: $name, config: $config) {
      _id
      name
    }
  }
`;

class ExportBanListCreate extends React.Component {
  state = {
    name: '',
    threshold: 3
  };

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
              mutation={mutation}
              update={(cache, { data: { createExportBanList } }) => {
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
                  organizationStates[organization._id] = 1;
                });
                this.setState({
                  ...organizationStates,
                  name: '',
                  threshold: 3
                });
                if (typeof this.props.onCreate === 'function')
                  this.props.onCreate();
              }}
              onError={() => {}}
            >
              {(createExportBanList, { loading, error }) => {
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
                          <Col sm="12" md="6" className="mb-4" key={key}>
                            <h4>{organization.name}</h4>
                            {organization.battlemetricsBanLists.map(
                              (battlemetricsBanList, key) => (
                                <div className="ml-4" key={key}>
                                  <label className="form-control-label">
                                    {battlemetricsBanList.name}
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    type="number"
                                    value={
                                      battlemetricsBanList._id in this.state
                                        ? this.state[battlemetricsBanList._id]
                                        : 1
                                    }
                                    onChange={event => {
                                      if (event.target.value !== '1')
                                        this.setState({
                                          [battlemetricsBanList._id]:
                                            event.target.value
                                        });
                                      else {
                                        delete this.state[
                                          battlemetricsBanList._id
                                        ];
                                        this.setState(this.state);
                                      }
                                    }}
                                  />
                                </div>
                              )
                            )}
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
                                !parseInt(this.state[key])
                            )
                          }
                          onClick={() =>
                            createExportBanList({
                              variables: {
                                name: this.state.name,
                                config: JSON.stringify(this.state)
                              }
                            })
                          }
                        >
                          Create Export Ban List
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
