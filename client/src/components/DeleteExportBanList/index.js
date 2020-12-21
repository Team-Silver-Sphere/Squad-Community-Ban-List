import React from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';

import { Button } from 'reactstrap';

const DELETE_EXPORT_BAN_LIST = gql`
  mutation DeleteExportBanList($id: Int!) {
    deleteExportBanList(id: $id) {
      id
    }
  }
`;

function removeFromCache(cache, { data: { deleteExportBanList } }) {
  cache.modify({
    fields: {
      loggedInSteamUser(loggedInSteamUser) {
        cache.modify({
          id: loggedInSteamUser.__ref,
          fields: {
            exportBanLists(exportBanLists = [], { readField }) {
              return exportBanLists.filter(
                (exportBanList) => deleteExportBanList.id !== readField('id', exportBanList)
              );
            }
          }
        });

        return loggedInSteamUser;
      }
    }
  });
}

export default function (props) {
  const [deleteExportBanList] = useMutation(DELETE_EXPORT_BAN_LIST, { update: removeFromCache });

  return (
    <Button
      color="danger"
      size="sm"
      onClick={() => {
        deleteExportBanList({ variables: { id: props.exportBanListID } });
      }}
    >
      Delete
    </Button>
  );
}
