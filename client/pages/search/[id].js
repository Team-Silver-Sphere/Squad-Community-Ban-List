import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Alert, Card, CardBody, Col, Container, Row, Table, UncontrolledTooltip } from 'reactstrap';

import BanDates from '../../components/BanDates/index.js';
import FormattedDate from '../../components/FormattedDate/index.js';
import RegularBanner from '../../components/RegularBanner/index.js';
import SteamUserSearchBox from '../../components/SteamUserSearchBox/index.js';

import { initializeApollo } from '../../lib/apollo-client.js';
import { NextSeo } from 'next-seo';

const GET_STEAM_USER = gql`
  query GET_STEAM_USER($id: String!) {
    steamUser(id: $id) {
      id
      name
      avatarFull
      reputationPoints
      riskRating
      reputationRank
      lastRefreshedInfo
      lastRefreshedReputationPoints
      lastRefreshedReputationRank
      activeBans: bans(orderBy: "created", orderDirection: DESC, expired: false) {
        edges {
          cursor
          node {
            id
            banList {
              id
              name
              organisation {
                id
                name
                discord
              }
            }
            reason
            created
            expires
          }
        }
      }
      expiredBans: bans(orderBy: "created", orderDirection: DESC, expired: true) {
        edges {
          cursor
          node {
            id
            banList {
              id
              name
              organisation {
                id
                name
                discord
              }
            }
            reason
            created
            expires
          }
        }
      }
    }
  }
`;

export async function getServerSideProps(context) {
  const { id } = context.query;

  const apolloClient = initializeApollo();
  await apolloClient.query({ query: GET_STEAM_USER, variables: { id } });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    }
  };
}

export default function Search() {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_STEAM_USER, { variables: { id } });

  return (
    <>
      <NextSeo
        title="Search | Squad Community Ban List"
        description="Search our database containing over 32,000 bans and 24,000 players."
      />
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
              <SteamUserSearchBox search={id} />
            </CardBody>
            {loading && (
              <CardBody>
                <div className="text-center mt-2 mb-3">Loading...</div>
                <div className="btn-wrapper text-center">
                  <i className="fas fa-circle-notch fa-spin fa-4x" />
                </div>
              </CardBody>
            )}
            {error && (
              <CardBody>
                <div className="text-center mt-2 mb-2">Error!</div>
                <div className="btn-wrapper text-center">
                  <i className="fas fa-exclamation-triangle fa-4x" />
                </div>
                <div className="text-center mt-2 mb-2">Something went wrong. Sad times.</div>
              </CardBody>
            )}
            {data && data.steamUser === null && (
              <CardBody>
                <div className="text-center mt-2 mb-2">Unknown Steam User</div>
                <div className="btn-wrapper text-center">
                  <i className="fas fa-question fa-4x" />
                </div>
                <div className="text-center mt-2 mb-2">
                  We do not have this Steam user on record.
                </div>
              </CardBody>
            )}
            {data && data.steamUser && (
              <>
                <CardBody className="text-center border-bottom">
                  <h4>Steam Profile</h4>
                  <img
                    alt={`${data.steamUser.name || data.steamUser.id}'s avatar`}
                    src={data.steamUser.avatarFull || '/img/misc/avatar.jpg'}
                    width="184px"
                    className="rounded-circle mb-4"
                  />
                  <h5>
                    <a href={`https://steamcommunity.com/profiles/${data.steamUser.id}`}>
                      {data.steamUser.name || data.steamUser.id}
                    </a>
                  </h5>
                  <small>
                    <strong>Last Refreshed: </strong>{' '}
                    {data.steamUser.lastRefreshedInfo ? (
                      <FormattedDate date={data.steamUser.lastRefreshedInfo} />
                    ) : (
                      'Queued for refresh.'
                    )}
                  </small>
                </CardBody>
                <CardBody className="text-center border-bottom">
                  <h4>Reputation</h4>
                  <Row>
                    <Col md="6">
                      <h5>Reputation Points</h5>
                      <h2>{data.steamUser.reputationPoints}</h2>
                      <small>
                        <strong>Last Refreshed: </strong>{' '}
                        {data.steamUser.lastRefreshedReputationPoints ? (
                          <FormattedDate date={data.steamUser.lastRefreshedReputationPoints} />
                        ) : (
                          'Queued for refresh.'
                        )}
                      </small>
                    </Col>
                    <Col md="6">
                      <h5>Risk Ranking</h5>
                      <h2>
                        {data.steamUser.reputationRank && (
                          <>
                            <small>#</small>
                            {data.steamUser.reputationRank}
                          </>
                        )}
                        {!data.steamUser.reputationRank && <>Unranked</>}
                      </h2>
                      <small>
                        <strong>Last Refreshed: </strong>{' '}
                        {data.steamUser.lastRefreshedReputationRank ? (
                          <FormattedDate date={data.steamUser.lastRefreshedReputationRank} />
                        ) : (
                          'Queued for refresh.'
                        )}
                      </small>
                    </Col>
                  </Row>
                </CardBody>
                <CardBody>
                  <h4 className="text-center">
                    Active Bans ({data.steamUser.activeBans.edges.length})
                  </h4>
                </CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th>Organisation</th>
                      <th>Ban List</th>
                      <th>
                        Reason{' '}
                        <span id="tooltip-reason-active" data-placement="right">
                          <i className="ml-2 fa fa-question-circle" />
                        </span>
                        <UncontrolledTooltip
                          boundariesElement="viewport"
                          data-placement="right"
                          delay={0}
                          target="tooltip-reason-active"
                        >
                          The ban reasons shown on the Squad Community Ban List are based on
                          keywords found in the reason and notes listed on partner organisations'
                          ban lists. We cannot guarantee that the reasons displayed reflect the true
                          reason for the ban. Please see our FAQ for more information.
                        </UncontrolledTooltip>
                      </th>
                      <th>
                        Time{' '}
                        <span id="tooltip-time-active" data-placement="right">
                          <i className="ml-2 fa fa-question-circle" />
                        </span>
                        <UncontrolledTooltip
                          boundariesElement="viewport"
                          data-placement="right"
                          delay={0}
                          target="tooltip-time-active"
                        >
                          The ban times shown on the Squad Community Ban List are based on the dates
                          listed on partner organisations' ban lists. In the case of remote ban
                          lists, where ban creation dates are not documented, the time shown is the
                          time when we first imported the ban.
                        </UncontrolledTooltip>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.steamUser.activeBans.edges.map((edge, key) => (
                      <tr key={key}>
                        <td>
                          <a
                            href={edge.node.banList.organisation.discord}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {edge.node.banList.organisation.name}
                          </a>
                        </td>
                        <td>{edge.node.banList.name}</td>
                        <td style={{ whiteSpace: 'pre-wrap' }}>
                          {edge.node.reason.replace(/, /g, '\n')}
                        </td>
                        <td>
                          <BanDates created={edge.node.created} expires={edge.node.expires} />
                        </td>
                      </tr>
                    ))}
                    {data.steamUser.activeBans.edges.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center">
                          <strong>No active bans on record.</strong>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <CardBody>
                  <h4 className="text-center">
                    Expired Bans ({data.steamUser.expiredBans.edges.length})
                  </h4>
                </CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th>Organisation</th>
                      <th>Ban List</th>
                      <th>
                        Reason
                        <span id="tooltip-reason-expired" data-placement="right">
                          <i className="ml-2 fa fa-question-circle" />
                        </span>
                        <UncontrolledTooltip
                          boundariesElement="viewport"
                          data-placement="right"
                          delay={0}
                          target="tooltip-reason-expired"
                        >
                          The ban reasons shown on the Squad Community Ban List are based on
                          keywords found in the reason and notes supplied by contributing servers.
                          We cannot guarantee that the reasons displayed reflect the true reason for
                          the ban. Please see our FAQ for more information.
                        </UncontrolledTooltip>
                      </th>
                      <th>
                        Time{' '}
                        <span id="tooltip-time-expired" data-placement="right">
                          <i className="ml-2 fa fa-question-circle" />
                        </span>
                        <UncontrolledTooltip
                          boundariesElement="viewport"
                          data-placement="right"
                          delay={0}
                          target="tooltip-time-expired"
                        >
                          The ban times shown on the Squad Community Ban List are based on the dates
                          listed on partner organisations' ban lists. In the case of remote ban
                          lists, where ban creation dates are not documented, the time shown is the
                          time when we first imported the ban.
                        </UncontrolledTooltip>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.steamUser.expiredBans.edges.map((edge, key) => (
                      <tr key={key}>
                        <td>
                          <a
                            href={edge.node.banList.organisation.discord}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {edge.node.banList.organisation.name}
                          </a>
                        </td>
                        <td>{edge.node.banList.name}</td>
                        <td style={{ whiteSpace: 'pre-wrap' }}>
                          {edge.node.reason.replace(/, /g, '\n')}
                        </td>
                        <td>
                          <BanDates created={edge.node.created} expires={edge.node.expires} />
                        </td>
                      </tr>
                    ))}
                    {data.steamUser.expiredBans.edges.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center">
                          <strong>No expired bans on record.</strong>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <CardBody>
                  <Alert color="danger">
                    <i className="fas fa-exclamation-circle mr-2" />
                    <strong>Disclaimer</strong>
                    <br />
                    The ban information contained on this page has been imported from the ban lists
                    of our partner organisations. The Squad Community Ban List has{' '}
                    <strong>not</strong> modified any of this information, other than where
                    explicitly stated, or made any judgement of the validity of the bans. For more
                    information on how to get unlisted from/unbanned by the Squad Community Ban
                    List, please see our{' '}
                    <Link href={`/banned/${data.steamUser.id}`}>
                      "I'm banned, what now?" information page
                    </Link>
                    .
                  </Alert>
                </CardBody>
              </>
            )}
          </Card>
        </Container>
      </section>
    </>
  );
}
