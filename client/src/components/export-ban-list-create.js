import React, { useState } from 'react';

import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap';

import AdvancedModal from './advanced-modal.js';

export default function () {
  const [name, setName] = useState('');
  const [server, setServer] = useState('');
  const [defaultActiveWeight, setDefaultActiveWeight] = useState(3);
  const [defaultExpiredWeight, setDefaultExpiredWeight] = useState(1);

  return (
    <AdvancedModal isOpen={false}>
      {(modal) => (
        <>
          <Button color="info" onClick={modal.open}>
            Create Export Ban List
          </Button>

          <Modal className="modal-dialog-centered" isOpen={modal.isOpen} toggle={modal.close}>
            <ModalHeader toggle={modal.close}>Create Export Ban List</ModalHeader>
            <ModalBody>
              <Form>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label>Export Ban List Name</Label>
                      <Input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label>Server Name</Label>
                      <Input
                        type="text"
                        value={server}
                        onChange={(e) => {
                          setServer(e.target.value);
                        }}
                      />
                      <FormFeedback>You will not be able to see this</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Default Active Weight</Label>
                      <Input
                        type="number"
                        value={defaultActiveWeight}
                        onChange={(e) => {
                          setDefaultActiveWeight(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Default Active Weight</Label>
                      <Input
                        type="number"
                        value={defaultExpiredWeight}
                        onChange={(e) => {
                          setDefaultExpiredWeight(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="info" className="ml-auto">
                Submit
              </Button>
            </ModalFooter>
          </Modal>
        </>
      )}
    </AdvancedModal>
  );
}
