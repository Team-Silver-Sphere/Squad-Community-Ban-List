import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import AdvancedModal from './advanced-modal.js';

export default function (props) {
  return (
    <AdvancedModal isOpen={false}>
      {(modal) => (
        <>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              modal.open();
            }}
          >
            {props.organisation.name}
          </a>
          <Modal className="modal-dialog-centered" isOpen={modal.isOpen} toggle={modal.close}>
            <ModalHeader toggle={modal.close}>Organisation Info</ModalHeader>
            <ModalBody className="text-center">
              <h3>{props.organisation.name}</h3>
              <a href={props.organisation.discord}>Discord</a>
              <h6 className="mt-4">Appeal Information</h6>
              <p>
                The Squad Community Ban List does <strong>not</strong> handle ban appeals on behalf
                of partner organisations. To get a ban removed from {props.organisation.name}'s
                server(s) you will need to go through their appeals process. They have provided the
                following information explaining how to do this:
              </p>
              <p className="font-italic">{props.organisation.appealProcess}</p>
            </ModalBody>
          </Modal>
        </>
      )}
    </AdvancedModal>
  );
}
