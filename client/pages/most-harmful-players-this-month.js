import { gql, useQuery } from '@apollo/client';
import { Button, Card, CardBody, Container, Table } from 'reactstrap';

import RegularBanner from '../components/RegularBanner/index.js';
import SteamUser from '../components/SteamUser/index.js';

import { initializeApollo } from '../lib/apollo-client.js';
import { NextSeo } from 'next-seo';

const GET_MOST_HARMFUL_PLAYERS_THIS_MONTH = gql`
  query GET_MOST_HARMFUL_PLAYERS_THIS_MONTH($after: String) {
    steamUsers(
      orderBy: "reputationPointsMonthChange"
      orderDirection: DESC
      first: 20
      after: $after
    ) {
      edges {
        cursor
        node {
          id
          name
          avatar
          reputationPoints
          reputationPointsMonthChange
          riskRating
          reputationRank
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

export async function getServerSideProps() {
  const apolloClient = initializeApollo();
  await apolloClient.query({ query: GET_MOST_HARMFUL_PLAYERS_THIS_MONTH });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    }
  };
}

export default function MostHarmfulPlayersThisMonth() {
  const { loading, error, data, fetchMore } = useQuery(GET_MOST_HARMFUL_PLAYERS_THIS_MONTH, {
    fetchPolicy: 'cache-only'
  });

  return (
    <>
      <NextSeo
        title="Most Harmful Players This Month | Squad Community Ban List"
        description="Explore a list of the most harmful players in our database from this month."
      />
      <RegularBanner />
      <section className="section section-lg pt-lg-0 mt--200">
        <Container>
          <Card className="shadow border-0">
            <CardBody className="pt-5 pb-2">
              <div className="icon icon-shape bg-gradient-primary rounded-circle text-white mb-4">
                <i className="fa fa-list" />
              </div>
              <h6 className="text-primary text-uppercase">Most Harmful Players For This Month</h6>
              <p className="description mt-2">
                Explore a list of the most harmful players in our database from this month.
              </p>
            </CardBody>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th>Players</th>
                  <th>Reputation Points This Month</th>
                  <th>Reputation Points</th>
                  <th>Risk Ranking</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={4} className="text-center">
                      <div className="text-center mt-2 mb-3">Loading...</div>
                      <div className="btn-wrapper text-center">
                        <i className="fas fa-circle-notch fa-spin fa-4x" />
                      </div>
                    </td>
                  </tr>
                )}
                {error && (
                  <tr>
                    <td colSpan={4} className="text-center">
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
                    {data.steamUsers.edges.map((edge, key) => (
                      <tr key={key}>
                        <td>
                          <SteamUser steamUser={edge.node} />
                        </td>
                        <td>{edge.node.reputationPointsMonthChange}</td>
                        <td>{edge.node.reputationPoints}</td>
                        <td>{edge.node.reputationRank || 'Unranked'}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={4} className="text-center">
                        <Button
                          color="primary"
                          disabled={!data.steamUsers.pageInfo.hasNextPage}
                          onClick={() => {
                            fetchMore({
                              query: GET_MOST_HARMFUL_PLAYERS_THIS_MONTH,
                              variables: { after: data.steamUsers.pageInfo.endCursor }
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
    </>
  );
}
