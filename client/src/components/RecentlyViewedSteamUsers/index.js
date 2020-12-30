import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { CardBody, Col, Row } from 'reactstrap';

import { SteamUser } from '../index';

const GET_RECENTLY_VIEWED_PLAYERS = gql`
  query {
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

export default function () {
  const { loading, error, data } = useQuery(GET_RECENTLY_VIEWED_PLAYERS);

  return (
    <CardBody>
      <Row>
        <Col xs="12" className="text-center">
          <h5>Recently Viewed Players</h5>
        </Col>
        {data && console.log(data.steamUsers)}
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
  );
}
