import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import { Card, CardBody, CardHeader, Table } from 'reactstrap';

const query = gql`
  query {
    organizations {
      _id
      name
      uniqueBannedSteamIDCount

      battlemetricsBanLists {
        _id
        name
        battlemetricsBanCount
      }
    }
  }
`;

export { query };

export default function() {
  return (
    <Card className=" shadow">
      <CardHeader className=" bg-transparent">
        <h3 className=" mb-0">Organizations</h3>
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
                  <th>Organization Name</th>
                  <th>Ban Lists</th>
                  <th>Bans</th>
                  <th>Unique Banned Steam IDs</th>
                </tr>
              </thead>
              <tbody>
                {data.organizations.map((organization, key) => (
                  <tr key={key}>
                    <th>{organization.name}</th>
                    <td>
                      {organization.battlemetricsBanLists
                        .map(banList => banList.name)
                        .join(', ')}
                    </td>
                    <td>
                      {organization.battlemetricsBanLists
                        .map(banList => banList.battlemetricsBanCount)
                        .reduce((a, b) => a + b, 0)}
                    </td>
                    <td>{organization.uniqueBannedSteamIDCount}</td>
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
