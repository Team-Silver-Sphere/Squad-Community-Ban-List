import React from 'react';
import { Button, Card, CardBody, Container, Table, UncontrolledTooltip } from 'reactstrap';

import { gql, useQuery } from '@apollo/client';

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
                View players recently banned on one of our many partner organisations.
              </p>
            </CardBody>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th>Players</th>
                  <th>
                    Reason
                    <span id="tooltip-reason-recent-bans" data-placement="right">
                      <i className="ml-2 fa fa-question-circle" />
                    </span>
                    <UncontrolledTooltip
                      boundariesElement="viewport"
                      data-placement="right"
                      delay={0}
                      target="tooltip-reason-recent-bans"
                    >
                      The ban reasons shown on the Squad Community Ban List are based on
                      keywords found in the reason and notes listed on partner organisations' ban
                      lists. We cannot guarantee that the reasons displayed reflect the true reason for
                      the ban. Please see our FAQ for more information.
                    </UncontrolledTooltip>
                  </th>
                  <th>
                    Time{' '}
                    <span id="tooltip-time-recent-bans" data-placement="right">
                      <i className="ml-2 fa fa-question-circle" />
                    </span>
                    <UncontrolledTooltip
                      boundariesElement="viewport"
                      data-placement="right"
                      delay={0}
                      target="tooltip-time-recent-bans"
                    >
                      The ban times shown on the Squad Community Ban List are based on the dates
                      listed on partner organisations' ban lists. In the case of remote ban lists,
                      where ban creation dates are not documented, the time shown is the time when we
                      first imported the ban.
                    </UncontrolledTooltip>
                  </th>
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
                          <span id="tooltip-reason-recent-bans" data-placement="right">
                            <i className="ml-2 fa fa-question-circle" />
                          </span>
                          <UncontrolledTooltip
                            boundariesElement="viewport"
                            data-placement="right"
                            delay={0}
                            target="tooltip-reason-recent-bans"
                          >
                            The ban reasons shown on the Squad Community Ban List are based on
                            keywords found in the reason and notes supplied by contributing servers.
                            We cannot guarantee that the reasons displayed reflect the true reason
                            for the ban. Please see our FAQ for more information.
                          </UncontrolledTooltip>
                        </td>
                        <td>
                          <BanDates created={edge.node.created} expires={edge.node.expires} />
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
