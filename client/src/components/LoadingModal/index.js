import React from 'react';

import { Modal, ModalBody } from 'reactstrap';

export default function () {
  return (
    <Modal
      className="modal-dialog-centered modal-secondary"
      contentClassName="bg-gradient-secondary"
      isOpen={true}
    >
      <ModalBody>
        <div className="py-3 text-center">
          <i className="fas fa-circle-notch fa-spin fa-4x" />
          <h4 className="heading mt-4">Loading</h4>
          <p>Please hang in there...</p>
        </div>
      </ModalBody>
    </Modal>
  );
}
