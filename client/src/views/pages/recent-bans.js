import React from 'react';
import { Button, Card, CardBody, Container, Table } from 'reactstrap';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';

import Layout from '../layout/layout.js';

import { BanDates, SteamUser } from '../../components';

const query = gql`
  query RecentBans($after: String) {
    bans(orderBy: "created", orderDirection: DESC, first: 20, after: $after) {
      edges {
        cursor
        node {
          id
          steamUser {
            id
            name
            avatar
          }
          banList {
            id
            name
            organisation {
              id
              name
            }
          }
          reason
          created
          expires
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;

export default function () {
  const { loading, error, data, fetchMore } = useQuery(query);
  return (
    <Layout>
      <section className="section section-lg pt-lg-0 mt--200">
        <Container>
          <Card className="shadow border-0">
            <CardBody className="pt-5 pb-2">
              <div className="icon icon-shape bg-gradient-primary rounded-circle text-white mb-4">
                <i className="fa fa-clock" />
              </div>
              <h6 className="text-primary text-uppercase">Recent Bans</h6>
              <p className="description mt-2">
                Explore players recently banned on one of our many partner organisations.
              </p>
            </CardBody>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th>Players</th>
                  <th>Reason</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={3} className="text-center">
                      <div className="text-center mt-2 mb-3">Loading...</div>
                      <div className="btn-wrapper text-center">
                        <i className="fas fa-circle-notch fa-spin fa-4x" />
                      </div>
                    </td>
                  </tr>
                )}
                {error && (
                  <tr>
                    <td colSpan={3} className="text-center">
                      <div className="text-center mt-2 mb-2">Error!</div>
                      <div className="btn-wrapper text-center">
                        <i className="fas fa-exclamation-triangle fa-4x" />
                      </div>
                      <div className="text-center mt-2 mb-2">Something went wrong. Sad times.</div>
                    </td>
                  </tr>
                )}
                {data && (
                  <>
                    {data.bans.edges.map((edge, key) => (
                      <tr key={key}>
                        <td>
                          <SteamUser steamUser={edge.node.steamUser} />
                        </td>
                        <td>
                          Banned on {edge.node.banList.organisation.name}'s {edge.node.banList.name}
                          {' ban list '}
                          <br />
                          {edge.node.reason === 'Unknown'
                            ? 'for an unknown reason.'
                            : 'for ' + edge.node.reason.toLowerCase() + '.'}
                        </td>
                        <td>
                          <BanDates created={edge.node.created} expires={edge.node.expires}/>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={3} className="text-center">
                        <Button
                          color="primary"
                          disabled={!data.bans.pageInfo.hasNextPage}
                          onClick={() => {
                            fetchMore({
                              query,
                              variables: { after: data.bans.pageInfo.endCursor }
                            });
                          }}
                        >
                          <i className="fa fa-angle-double-down mr-2" />
                          Load More
                        </Button>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table>
          </Card>
        </Container>
      </section>
    </Layout>
  );
}
