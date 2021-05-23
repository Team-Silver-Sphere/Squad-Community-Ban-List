import { gql, useQuery } from '@apollo/client';
import { Button, Card, CardBody, Container, Table } from 'reactstrap';

import RegularBanner from '../components/RegularBanner/index.js';
import SteamUser from '../components/SteamUser/index.js';

import { initializeApollo } from '../lib/apollo-client.js';

const GET_MOST_HARMFUL_PLAYERS = gql`
  query GET_MOST_HARMFUL_PLAYERS($after: String) {
    steamUsers(orderBy: "reputationRank", orderDirection: ASC, first: 20, after: $after) {
      edges {
        cursor
        node {
          id
          name
          avatar
          reputationPoints
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
  await apolloClient.query({ query: GET_MOST_HARMFUL_PLAYERS });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    }
  };
}

export default function MostHarmfulPlayers() {
  const { loading, error, data, fetchMore } = useQuery(GET_MOST_HARMFUL_PLAYERS, { fetchPolicy: 'cache-only' });

  return (
    <>
      <RegularBanner />
      <section className="section section-lg pt-lg-0 mt--200">
        <Container>
          <Card className="shadow border-0">
            <CardBody className="pt-5 pb-2">
              <div className="icon icon-shape bg-gradient-primary rounded-circle text-white mb-4">
                <i className="fa fa-list" />
              </div>
              <h6 className="text-primary text-uppercase">Most Harmful Players</h6>
              <p className="description mt-2">
                Explore a list of the most harmful players in our database.
              </p>
            </CardBody>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th>Players</th>
                  <th>Reputation Points</th>
                  <th>Risk Ranking</th>
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
                    {data.steamUsers.edges.map((edge, key) => (
                      <tr key={key}>
                        <td>
                          <SteamUser steamUser={edge.node} />
                        </td>
                        <td>{edge.node.reputationPoints || 0}</td>
                        <td>{edge.node.reputationRank || 'Unranked'}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={3} className="text-center">
                        <Button
                          color="primary"
                          disabled={!data.steamUsers.pageInfo.hasNextPage}
                          onClick={() => {
                            fetchMore({
                              query: GET_MOST_HARMFUL_PLAYERS,
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
