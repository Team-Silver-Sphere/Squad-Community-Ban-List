import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Row,
  Col
} from 'reactstrap';

import { query } from './battlemetrics-ban-lists';

import { ErrorModal, OrganizationSelect } from './index';

const mutation = gql`
  mutation AddBattlemetricsBanList($id: String!, $name: String!, $organization: String!) {
    addBattlemetricsBanList(id: $id, name: $name, organization: $organization){
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
  state = {
    id: '',
    name: '',
    organization: null
  };

  render() {
    return (
      <Card className="shadow">
        <CardHeader className=" bg-transparent">
          <h3 className=" mb-0">Add Battlemetrics Ban List</h3>
        </CardHeader>
        <CardBody className="bg-secondary">
          <Mutation
            mutation={mutation}
            update={(cache, { data: { addBattlemetricsBanList } }) => {
              let { battlemetricsBanLists } = cache.readQuery({ query });
              battlemetricsBanLists = battlemetricsBanLists.concat([addBattlemetricsBanList]);
              cache.writeQuery({ query, data: { battlemetricsBanLists } });
            }}
            onError={() => {}}
          >
            {(addBattlemetricsBanList, { loading, error }) => {
              if (loading)
                return (
                  <CardBody>
                    <div className="text-center mt-2 mb-3">Loading...</div>
                    <div className="btn-wrapper text-center">
                      <i className="fas fa-circle-notch fa-spin fa-4x" />
                    </div>
                  </CardBody>
                );

              return (
                <>
                  {error && <ErrorModal errors={error.graphQLErrors} />}
                  <Form
                    onSubmit={() => {
                      addBattlemetricsBanList({ variables: this.state });
                    }}
                  >
                    <Row>
                      <Col>
                        <label className="form-control-label">
                          Ban List ID
                        </label>
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
                          <FormFeedback>
                            A ban list ID cannot be blank.
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <label className="form-control-label">
                          Ban List Name
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
                            An ban list's name cannot be blank.
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <label className="form-control-label">
                          Organization
                        </label>
                        <FormGroup>
                          <OrganizationSelect
                            value={this.state.organization}
                            onChange={(event) => this.setState({ organization: event.target.value })}
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
                          disabled={
                            this.state.id.length === 0 ||
                            this.state.name.length === 0 ||
                            this.state.organization === null
                          }
                        >
                          Add Ban List
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </>
              );
            }}
          </Mutation>
        </CardBody>
      </Card>
    );
  }
}

export default BattlemetricsBanListAdd;
