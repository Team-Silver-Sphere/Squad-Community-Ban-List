import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';

import RegularBanner from '../components/RegularBanner/index.js';
import SteamUser from '../components/SteamUser/index.js';
import SteamUserSearchBox from '../components/SteamUserSearchBox/index.js';

import { initializeApollo } from '../lib/apollo-client.js';

const GET_RECENTLY_VIEWED_STEAM_USERS = gql`
  query GET_RECENTLY_VIEWED_STEAM_USERS {
    steamUsers(orderBy: "lastViewed", orderDirection: DESC, first: 12) {
      edges {
        cursor
        node {
          id
          name
          avatar
          reputationPoints
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
  await apolloClient.query({ query: GET_RECENTLY_VIEWED_STEAM_USERS });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    }
  };
}

export default function Search() {
  const { loading, error, data } = useQuery(GET_RECENTLY_VIEWED_STEAM_USERS);

  return (
    <>
      <Head>
        <title>Search | Squad Community Ban List</title>
        <meta
          name="description"
          content="Search our database containing over 32,000 bans and 24,000 players."
        />
      </Head>
      <RegularBanner />
      <section className="section section-lg pt-lg-0 mt--200">
        <Container>
          <Card className="shadow border-0">
            <CardBody className="pt-5 pb-2 border-bottom">
              <div className="icon icon-shape bg-gradient-primary rounded-circle text-white mb-4">
                <i className="fa fa-search" />
              </div>
              <h6 className="text-primary text-uppercase">Search</h6>
              <p className="description mt-2">
                Search our database containing over 32,000 bans and 24,000 players.
              </p>
              <SteamUserSearchBox />
            </CardBody>
            <CardBody>
              <Row>
                <Col xs="12" className="text-center">
                  <h5>Recently Viewed Players</h5>
                </Col>
                {data &&
                  data.steamUsers.edges.map((edge, key) => (
                    <Col md="4" className="py-2" key={key}>
                      <SteamUser steamUser={edge.node} />
                    </Col>
                  ))}
              </Row>
              {loading && (
                <>
                  <div className="text-center mt-2 mb-3">Loading...</div>
                  <div className="btn-wrapper text-center">
                    <i className="fas fa-circle-notch fa-spin fa-4x" />
                  </div>
                </>
              )}
              {error && (
                <>
                  <div className="text-center mt-2 mb-2">Error!</div>
                  <div className="btn-wrapper text-center">
                    <i className="fas fa-exclamation-triangle fa-4x" />
                  </div>
                  <div className="text-center mt-2 mb-2">Something went wrong. Sad times.</div>
                </>
              )}
            </CardBody>
          </Card>
        </Container>
      </section>
    </>
  );
}
