import React from 'react';

import QueryExportBanList from './query-export-ban-list';
import MutateExportBanList from './mutate-export-ban-list';

export default function (props) {
  return props.exportBanListID ? (
    <QueryExportBanList exportBanListID={props.exportBanListID} />
  ) : (
    <MutateExportBanList />
  );
}
