import React from 'react';

import { Button, Card, CardHeader, Col, Row } from 'reactstrap';

import Auth from '../../../utils/auth';

import Layout from '../layout/layout';

class Login extends React.Component {
  async componentDidMount() {
    // check whether user is being redirect from login and process if the case
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('openid.claimed_id') !== null) {
      await Auth.attemptAuth(window.location.search);
      this.props.history.replace('/login');
      this.setState({});
    }
  }

  renderLoading() {
    return (
      <Layout>
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-5">
                <div className="text-center mt-2 mb-3">Loading...</div>
                <div className="btn-wrapper text-center">
                  <i className="fas fa-circle-notch fa-spin fa-4x" />
                </div>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </Layout>
    );
  }

  renderLoginForm() {
    return (
      <Layout>
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-3">
                  <small>Sign in with</small>
                </div>
                <div className="btn-wrapper text-center">
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    href="/auth/steam"
                  >
                    <span className="btn-inner--icon">
                      <img
                        alt="..."
                        src={require('assets/img/icons/common/steam.svg')}
                      />
                    </span>
                    <span className="btn-inner--text">Steam</span>
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </Layout>
    );
  }

  saveToken(yes) {
    Auth.saveToken = yes;
    if (Auth.saveToken) Auth.storeToken();
    this.setState({});
  }

  renderRememberMe() {
    return (
      <Layout>
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-3">
                  <small>Remember Me?</small>
                </div>
                <div className="btn-wrapper text-center">
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    onClick={() => {
                      this.saveToken(false);
                    }}
                  >
                    <i className="fas fa-times" />
                    <span className="btn-inner--text">No thanks!</span>
                  </Button>
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    onClick={() => {
                      this.saveToken(true);
                    }}
                  >
                    <i className="fas fa-check" />
                    <span className="btn-inner--text">Yes please!</span>
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </Layout>
    );
  }

  renderLoginDirect() {
    return (
      <Layout>
        <Row className="justify-content-center">
          <Col>
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-3">
                  <small>Where to?</small>
                </div>
                <div className="btn-wrapper text-center">
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    href="/organization"
                  >
                    <i className="fas fa-user" />
                    <span className="btn-inner--text">Organization Portal</span>
                  </Button>
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    href="/admin"
                    disabled={!Auth.claim.systemAdmin}
                  >
                    <i className="fas fa-user-shield" />
                    <span className="btn-inner--text">SCBL Admin Portal</span>
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </Layout>
    );
  }

  render() {
    // not logged in,
    // show loading while validating login attempt if callback present
    // or when JWT is stored in localStorage
    const urlParams = new URLSearchParams(window.location.search);
    if (
      urlParams.get('openid.claimed_id') !== null ||
      (localStorage.getItem('JWT') !== null && Auth.isLoggedIn === false)
    ) {
      return this.renderLoading();
    }

    // not logged in, show login form
    if (!Auth.isLoggedIn) {
      return this.renderLoginForm();
    }

    // logged in, no remember me status, show remember me form
    if (Auth.isLoggedIn && Auth.saveToken === null) {
      return this.renderRememberMe();
    }

    // logged in, select location to go to
    if (Auth.isLoggedIn && Auth.saveToken !== null) {
      return this.renderLoginDirect();
    }
  }
}

export default Login;
