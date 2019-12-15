import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import { Card, CardBody, CardHeader, Table } from 'reactstrap';

const query = gql`
  query {
    battlemetricsBanLists {
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

export default function() {
  return (
    <Card className=" shadow">
      <CardHeader className=" bg-transparent">
        <h3 className=" mb-0">Battlemetrics Ban Lists</h3>
      </CardHeader>

      <Query query={query} onError={() => {}}>
        {({ loading, error, data }) => {
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
                <div className="text-center mt-2 mb-2">
                  Something went wrong. Sad times.
                </div>
              </CardBody>
            );

          return (
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th>ID</th>
                  <th>Organization Name</th>
                  <th>Name</th>
                  <th>Bans</th>
                  <th>Unique Banned Steam IDs</th>
                </tr>
              </thead>
              <tbody>
                {data.battlemetricsBanLists.map((battlemetricsBanList, key) => (
                  <tr key={key}>
                    <th>{battlemetricsBanList.id}</th>
                    <td>{battlemetricsBanList.organization.name}</td>
                    <td>{battlemetricsBanList.name}</td>
                    <td>{battlemetricsBanList.battlemetricsBanCount}</td>
                    <td>{battlemetricsBanList.uniqueBannedSteamIDCount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          );
        }}
      </Query>
    </Card>
  );
}
