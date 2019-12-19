import React from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  Input,
  Button,
  FormGroup,
  FormFeedback
} from 'reactstrap';

class Steam64IDSearch extends React.Component {
  state = {
    steamID: ''
  };

  render() {
    return (
      <Card>
        <CardHeader className="bg-transparent">
          <h3 className=" mb-0">Search</h3>
        </CardHeader>
        <CardBody className="bg-secondary">
          <Row>
            <Col>
              <label className="form-control-label">Steam64ID</label>
              <FormGroup>
                <Input
                  className="form-control-alternative"
                  type="text"
                  value={this.state.steamID}
                  onChange={event =>
                    this.setState({ steamID: event.target.value })
                  }
                  invalid={this.state.steamID.length !== 17}
                />
                <FormFeedback>A Steam64ID is 17 characters long.</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-center mt-2">
            <Col className="text-center">
              <Button
                color="primary"
                disabled={this.state.steamID.length !== 17}
                onClick={() => {
                  if (typeof this.props.onSearch === 'function')
                    this.props.onSearch(this.state.steamID);
                }}
              >
                Search
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default Steam64IDSearch;
