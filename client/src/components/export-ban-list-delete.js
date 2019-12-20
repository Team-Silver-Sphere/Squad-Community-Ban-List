import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { set } from 'lodash/fp';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { query } from './export-ban-lists';

import { AdvancedModal, ErrorModal } from './index';

const mutation = gql`
  mutation DeleteExportBanList($_id: String!) {
    deleteExportBanList(_id: $_id) {
      _id
    }
  }
`;

export default function(props) {
  return (
    <Mutation
      mutation={mutation}
      update={(cache, { data: { deleteExportBanList } }) => {
        let oldData = cache.readQuery({ query });
        let newData = set(
          'currentSteamUser.exportBanLists',
          oldData.currentSteamUser.exportBanLists.filter(
            exportBanList => exportBanList._id !== deleteExportBanList._id
          ),
          oldData
        );
        cache.writeQuery({ query, data: newData });
      }}
      onError={() => {}}
    >
      {(deleteExportBanList, { loading, error }) => {
        if (loading)
          return (
            <Button color="primary" size="sm">
              Loading...
            </Button>
          );

        return (
          <>
            {error && <ErrorModal errors={error.graphQLErrors} />}
            <AdvancedModal
              onOpen={props.onOpen}
              onClose={props.onClose}
              isOpen={false}
            >
              {modal => (
                <>
                  <Button color="primary" size="sm" onClick={modal.open}>
                    Delete Export Ban List
                  </Button>
                  <Modal
                    className="modal-dialog-centered modal-danger"
                    contentClassName="bg-gradient-danger"
                    isOpen={modal.isOpen}
                    toggle={modal.close}
                  >
                    <ModalHeader>
                      <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={modal.close}
                      >
                        <span aria-hidden={true}>×</span>
                      </button>
                    </ModalHeader>
                    <ModalBody>
                      <div className="py-3 text-center">
                        <i className="fas fa-exclamation-triangle fa-4x" />
                        <h4 className="heading mt-4">
                          Are you sure about that?!
                        </h4>
                        <p>
                          Once you delete an export ban list it cannot be
                          recovered.
                        </p>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        className="btn-white"
                        color="default"
                        type="button"
                        onClick={() =>
                          deleteExportBanList({ variables: { _id: props._id } })
                        }
                      >
                        I'm sure!
                      </Button>
                      <Button
                        className="text-white ml-auto"
                        color="link"
                        data-dismiss="modal"
                        type="button"
                        onClick={modal.close}
                      >
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                </>
              )}
            </AdvancedModal>
          </>
        );
      }}
    </Mutation>
  );
}
