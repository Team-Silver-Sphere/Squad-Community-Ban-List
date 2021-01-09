import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { CardBody } from 'reactstrap';

import MutateExportBanList from './mutate-export-ban-list';

const GET_EXPORT_BAN_LIST = gql`
  query GetExportBanList($id: Int!) {
    loggedInSteamUser {
      exportBanList(id: $id) {
        id
        name
        server
        type
        threshold
        defaultActivePoints
        defaultExpiredPoints
        maxBanAge
        discordWebhook
      }
    }
  }
`;

export default function (props) {
  const { loading, error, data } = useQuery(GET_EXPORT_BAN_LIST, {
    variables: { id: props.exportBanListID }
  });

  if (loading)
    return (
      <CardBody>
        <div className="text-center mt-2 mb-3">Loading...</div>
        <div className="btn-wrapper text-center">
          <i className="fas fa-circle-notch fa-spin fa-4x" />
        </div>
      </CardBody>
    );

  if (error)
    return (
      <CardBody>
        <div className="text-center mt-2 mb-2">Error!</div>
        <div className="btn-wrapper text-center">
          <i className="fas fa-exclamation-triangle fa-4x" />
        </div>
        <div className="text-center mt-2 mb-2">Something went wrong. Sad times.</div>
      </CardBody>
    );

  if (!data.loggedInSteamUser.exportBanList)
    return (
      <CardBody>
        <div className="text-center mt-2 mb-2">Unknown Export Ban List</div>
        <div className="btn-wrapper text-center">
          <i className="fas fa-question fa-4x" />
        </div>
        <div className="text-center mt-2 mb-2">We do not have this Steam user on record.</div>
      </CardBody>
    );

  return <MutateExportBanList exportBanList={data.loggedInSteamUser.exportBanList} />;
}
