import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import { Card, CardBody, CardHeader, Table } from 'reactstrap';

const query = gql`
  query {
    exportBanQueue {
      _id
      steamID

      battlemetricsStatus

      exportBanList {
        _id
        name
      }
    }
  }
`;

export { query };

export default function() {
  return (
    <Card className=" shadow">
      <CardHeader className=" bg-transparent">
        <h3 className=" mb-0">Export Ban Queue</h3>
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
            <>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th>Export Ban List Name</th>
                    <th>Steam ID</th>
                    <th>Battlemetrics Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.exportBanQueue.map((exportBan, key) => (
                    <tr key={key}>
                      <td>{exportBan.exportBanList.name}</td>
                      <td>{exportBan.steamID}</td>
                      <td>{exportBan.battlemetricsStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          );
        }}
      </Query>
    </Card>
  );
}
