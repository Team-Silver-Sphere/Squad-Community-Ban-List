import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import { Card, CardBody, CardHeader, Table } from 'reactstrap';

import moment from 'moment';

const query = gql`
  query {
    banListQueue {
      _id
      name
      type

      importStatus
      lastImported

      organization {
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
        <h3 className=" mb-0">Ban List Queue</h3>
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
                    <th>Organization Name</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Import Status</th>
                    <th>Last Imported</th>
                  </tr>
                </thead>
                <tbody>
                  {data.banListQueue.map((banList, key) => (
                    <tr key={key}>
                      <th>{banList.organization.name}</th>
                      <td>{banList.name}</td>
                      <td>
                        {banList.type.replace('battlemetrics', 'BattleMetrics')}
                      </td>
                      <td>
                        {moment
                          .utc(banList.lastImported)
                          .format('DD/MM/YYYY HH:mm')}
                      </td>
                      <td>{banList.importStatus}</td>
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
