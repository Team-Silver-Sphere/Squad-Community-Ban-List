import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Button, Card, CardHeader, Container, Row, Col } from 'reactstrap';

import Layout from '../layout/layout.js';

import Auth from '../../utils/auth.js';

export default function () {
  const history = useHistory();

  const urlParams = new URLSearchParams(window.location.search);

  // Is fully logged in
  if (Auth.isLoggedIn && Auth.saveToken !== null) return <Redirect to="/" />;

  // Is logged in, but not selected remember me option
  if (Auth.isLoggedIn && Auth.saveToken === null)
    return (
      <Layout>
        <section className="section section-lg pt-lg-0 mt--100">
          <Container>
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="shadow border-0">
                  <CardHeader className="bg-transparent pb-5">
                    <div className="text-muted text-center mt-2 mb-3">
                      <small>Remember Me?</small>
                    </div>
                    <div className="btn-wrapper text-center">
                      <Button
                        color="default"
                        onClick={() => {
                          Auth.saveToken = false;
                          history.push('/');
                        }}
                      >
                        <i className="fas fa-times mr-2" />
                        No thanks!
                      </Button>
                      <Button
                        color="default"
                        onClick={() => {
                          Auth.saveToken = true;
                          Auth.storeToken();
                          console.log(Auth);
                          history.push('/');
                        }}
                      >
                        <i className="fas fa-check mr-2" />
                        Yes please!
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
    );

  // Not logged in, but has auth option
  if (Auth.isLoggedIn === false && urlParams.get('openid.claimed_id') !== null) {
    useEffect(() => {
      Auth.attemptAuth(window.location.search).then(() => {
        history.replace('/login');
      });
    });

    return (
      <Layout>
        <section className="section section-lg pt-lg-0 mt--100">
          <Container>
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="shadow border-0">
                  <CardHeader className="bg-transparent pb-5">
                    <div className="text-center mt-2 mb-3">Loading...</div>
                    <div className="btn-wrapper text-center">
                      <i className="fas fa-circle-notch fa-spin fa-4x" />
                    </div>
                  </CardHeader>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
    );
  }

  window.location.href = '/auth/steam';
  return null;
}
