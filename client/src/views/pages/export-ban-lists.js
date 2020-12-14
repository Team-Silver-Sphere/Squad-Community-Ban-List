import React from 'react';
import { Card, CardBody, Col, Container, Row, Table } from 'reactstrap';

import ExportBanListCreate from '../../components/export-ban-list-create.js';
import Layout from '../layout/layout.js';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';

const query = gql`
  query ExportBanLists {
    loggedInSteamUser {
      id
      exportBanLists {
        id
        name
        server
        defaultActiveWeight
        defaultExpiredWeight
      }
    }
  }
`;

export default function () {
  const { loading, error, data } = useQuery(query);

  return (
    <Layout>
      <section className="section section-lg pt-lg-0 mt--200">
        <Container>
          <Card className="shadow border-0">
            <CardBody className="pt-5 pb-2 border-bottom">
              <div className="icon icon-shape bg-gradient-info rounded-circle text-white mb-4">
                <i className="fa fa-angle-double-down" />
              </div>
              <h6 className="text-info text-uppercase">Export Ban Lists</h6>
              <p className="description mt-2">
                Configure and generate ban lists from out database that preemptively ban harmful
                players before they have a chance to harm your community.
              </p>
            </CardBody>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th>Name</th>
                  <th>Server</th>
                  <th>Default Active Weight</th>
                  <th>Default Expired Weight</th>
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
                    {data.loggedInSteamUser && (
                      <>
                        {data.loggedInSteamUser.exportBanLists.length === 0 && (
                          <tr>
                            <td colSpan={4} className="text-center">
                              <strong>Create an export ban list to get started!</strong>
                            </td>
                          </tr>
                        )}
                        {data.loggedInSteamUser.exportBanLists.map((exportBanList, key) => (
                          <tr key={key}>
                            <th>{exportBanList.name}</th>
                            <td>{exportBanList.server}</td>
                            <td>{exportBanList.defaultActiveWeight}</td>
                            <td>{exportBanList.defaultExpiredWeight}</td>
                          </tr>
                        ))}
                      </>
                    )}
                    {!data.loggedInSteamUser && (
                      <tr>
                        <td colSpan={4} className="text-center">
                          <strong>Login to view your export ban lists!</strong>
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </Table>
            <CardBody>
              <Row>
                <Col className="text-center">
                  <ExportBanListCreate />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </section>
    </Layout>
  );
}
