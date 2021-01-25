import React from 'react';

import { Badge, Button, Card, CardBody, Container, Row, Col } from 'reactstrap';

import Layout from '../layout/layout.js';

import SteamUserSearchBox from '../../components/steam-user-search-box.js';

import background0 from '../../assets/img/backgrounds/background-0.jpg';
import background1 from '../../assets/img/backgrounds/background-1.jpg';
import background2 from '../../assets/img/backgrounds/background-2.jpg';
import background3 from '../../assets/img/backgrounds/background-3.jpg';

import homeImgExp from '../../assets/img/misc/home-1.png';
import homeImgBen from '../../assets/img/misc/home-2.png';
import homeImgCont from '../../assets/img/misc/home-3.png';

export default function () {
  return (
    <Layout homePage={true}>
      <div className="position-relative">
        <section className="section section-lg section-shaped pb-250">
          <div
            className="shape"
            style={{
              backgroundImage:
                'linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(' +
                background1 +
                ')',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: '50% 0%'
            }}
          />
          <Container className="py-lg-md d-flex">
            <div className="col px-0">
              <Row>
                <Col lg="6">
                  <h1 className="display-3 text-white">
                    <span>Join the fight against</span>
                    harmful players.
                  </h1>
                  <p className="lead text-white">
                    The Squad Community Ban List aims to protect the Squad community's integrity
                    through collaboration and information sharing.
                  </p>
                  <SteamUserSearchBox className="mt-5" frontpageVersion={true} />
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560,0 2560,100 0,100" />
            </svg>
          </div>
        </section>
      </div>
      <section className="section section-lg pt-lg-0 mt--200">
        <Container>
          <Row className="justify-content-center">
            <Col lg="12">
              <Row className="row-grid">
                <Col lg="4">
                  <Card className="card-lift--hover shadow border-0">
                    <CardBody className="py-5">
                      <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                        <i className="fa fa-search" />
                      </div>
                      <h6 className="text-primary text-uppercase">Explore</h6>
                      <p className="description mt-3">
                        Explore our database containing over 32,000 bans and 24,000 banned players
                        from various popular Squad servers.
                      </p>
                      <div>
                        <Badge color="primary" pill className="mr-1">
                          Search
                        </Badge>
                        <Badge color="primary" pill className="mr-1">
                          Recent Bans
                        </Badge>
                        <Badge color="primary" pill className="mr-1">
                          Insights
                        </Badge>
                      </div>
                      <Button className="mt-4" color="primary" href="#explore">
                        Learn more
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4">
                  <Card className="card-lift--hover shadow border-0">
                    <CardBody className="py-5">
                      <div className="icon icon-shape icon-shape-info rounded-circle mb-4">
                        <i className="fa fa-angle-double-down" />
                      </div>
                      <h6 className="text-info text-uppercase">Benefit</h6>
                      <p className="description mt-3">
                        Benefit from our database by using it to protect your Squad server from
                        harmful players.
                      </p>
                      <div>
                        <Badge color="info" pill className="mr-1">
                          Export Ban Lists
                        </Badge>
                        <Badge color="info" pill className="mr-1">
                          Community Monitor
                        </Badge>
                      </div>
                      <Button className="mt-4" color="info" href="#benefit">
                        Learn more
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4">
                  <Card className="card-lift--hover shadow border-0">
                    <CardBody className="py-5">
                      <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                        <i className="fa fa-angle-double-up" />
                      </div>
                      <h6 className="text-success text-uppercase">Contribute</h6>
                      <p className="description mt-3">
                        Contribute ban information from your Squad server to help us in the fight
                        against harmful players.
                      </p>
                      <div>
                        <Badge color="success" pill className="mr-1">
                          Partner Organisations
                        </Badge>
                        <Badge color="success" pill className="mr-1">
                          GitHub
                        </Badge>
                      </div>
                      <Button className="mt-4" color="success" href="#contribute">
                        Learn more
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section" id="explore">
        <Container>
          <Row className="row-grid align-items-center">
            <Col className="order-md-2" md="6">
              <img alt="..." className="img-fluid" src={homeImgExp} />
            </Col>
            <Col className="order-md-1" md="6">
              <div className="pr-md-5">
                <div className="icon icon-lg icon-shape icon-shape-primary shadow rounded-circle mb-5">
                  <i className="fa fa-search" />
                </div>
                <h3>Explore</h3>
                <p>
                  Our database contains information on over 32,000 bans and 24,000 banned players
                  from various popular Squad servers. We regularly update the database to allow you
                  to proactively defend your server from harmful players.
                </p>
                <ul className="list-unstyled mt-5">
                  <li className="py-2">
                    <div className="d-flex align-items-center">
                      <div>
                        <Badge className="badge-circle mr-3" color="primary">
                          <i className="fa fa-search" />
                        </Badge>
                      </div>
                      <div>
                        <h6 className="mb-0">Search for the reputation of a player.</h6>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="d-flex align-items-center">
                      <div>
                        <Badge className="badge-circle mr-3" color="primary">
                          <i className="fa fa-clock" />
                        </Badge>
                      </div>
                      <div>
                        <h6 className="mb-0">View a list of recent bans bans.</h6>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="d-flex align-items-center">
                      <div>
                        <Badge className="badge-circle mr-3" color="primary">
                          <i className="fa fa-list" />
                        </Badge>
                      </div>
                      <div>
                        <h6 className="mb-0">Explore a list of the most harmful players.</h6>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="d-flex align-items-center">
                      <div>
                        <Badge className="badge-circle mr-3" color="primary">
                          <i className="fa fa-chart-bar" />
                        </Badge>
                      </div>
                      <div>
                        <h6 className="mb-0">Get insights on how healthy the community is.</h6>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section section-lg section-shaped">
        <div
          className="shape"
          style={{
            backgroundImage:
              'linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(' + background0 + ')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%'
          }}
        />
        <Container>
          <Row className="justify-content-end row-grid">
            <Col lg="6">
              <Card className="shadow shadow-lg--hover my-5">
                <CardBody>
                  <blockquote className="blockquote font-italic mb-0">
                    "The Squad Community Ban List provides us with a valuable source of intel that
                    allows us to make more informed decisions when banning players from our server."
                  </blockquote>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="separator separator-bottom separator-skew zindex-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon className="fill-white" points="2560,0 2560,100 0,100" />
          </svg>
        </div>
      </section>
      <section className="section" id="benefit">
        <Container>
          <Row className="row-grid align-items-center">
            <Col md="6">
              <img alt="..." className="img-fluid" src={homeImgBen} />
            </Col>
            <Col md="6">
              <div className="pr-md-5">
                <div className="icon icon-lg icon-shape icon-shape-info shadow rounded-circle mb-5">
                  <i className="fa fa-angle-double-down" />
                </div>
                <h3>Benefit</h3>
                <p>
                  We provide access to the data within our database in various formats to assist
                  server owners and community leaders in proactively defending their servers and
                  communities from harmful players.
                </p>
                <ul className="list-unstyled mt-5">
                  <li className="py-2">
                    <div className="d-flex align-items-center">
                      <div>
                        <Badge className="badge-circle mr-3" color="info">
                          <i className="fa fa-angle-double-down" />
                        </Badge>
                      </div>
                      <div>
                        <h6 className="mb-0">Protect your server with our export ban lists.</h6>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="d-flex align-items-center">
                      <div>
                        <Badge className="badge-circle mr-3" color="info">
                          <i className="fas fa-desktop" />
                        </Badge>
                      </div>
                      <div>
                        <h6 className="mb-0">Monitor the integrity of your community.</h6>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="d-flex align-items-center">
                      <div>
                        <Badge className="badge-circle mr-3" color="discord">
                          <i className="fab fa-discord" />
                        </Badge>
                      </div>
                      <div>
                        <h6 className="mb-0">
                          Get Discord alerts with information relevant to you.
                        </h6>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section section-lg section-shaped">
        <div
          className="shape"
          style={{
            backgroundImage:
              'linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(' + background2 + ')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: '50% 40%'
          }}
        />
        <Container>
          <Row className="row-grid">
            <Col lg="6">
              <Card className="shadow shadow-lg--hover my-5">
                <CardBody>
                  <blockquote className="blockquote font-italic mb-0">
                    "Using the Squad Community Ban List allows our admins to spend more time
                    enjoying the game and less time dealing with players trying to harm our server."
                  </blockquote>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="separator separator-bottom separator-skew zindex-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon className="fill-white" points="0,0 0,100 2560,100" />
          </svg>
        </div>
      </section>
      <section className="section" id="contribute">
        <Container>
          <Row className="row-grid align-items-center">
            <Col md="6">
              <div className="pr-md-5">
                <div className="icon icon-lg icon-shape icon-shape-success shadow rounded-circle mb-5">
                  <i className="fa fa-angle-double-up" />
                </div>
                <h3>Contribute</h3>
                <p>
                  Our success depends on the collaboration and information sharing between various
                  popular Squad servers. Join us in the fight against harmful players!
                </p>
                <ul className="list-unstyled mt-5">
                  <li className="py-2">
                    <div className="d-flex align-items-center">
                      <div>
                        <Badge className="badge-circle mr-3" color="success">
                          <i className="fa fa-angle-double-up" />
                        </Badge>
                      </div>
                      <div>
                        <h6 className="mb-0">Contribute information as a partner organisation.</h6>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="d-flex align-items-center">
                      <div>
                        <Badge className="badge-circle mr-3" color="github">
                          <i className="fab fa-github" />
                        </Badge>
                      </div>
                      <div>
                        <h6 className="mb-0">Contribute to development via GitHub.</h6>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </Col>
            <Col md="6">
              <img alt="..." className="img-fluid" src={homeImgCont} />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section section-lg section-shaped">
        <div
          className="shape"
          style={{
            backgroundImage:
              'linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(' + background3 + ')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: '50% 90%'
          }}
        />
        <Container>
          <Row className="justify-content-end row-grid">
            <Col lg="6">
              <Card className="shadow shadow-lg--hover my-5">
                <CardBody>
                  <blockquote className="blockquote font-italic mb-0">
                    "Contributing to the Squad Community Ban List is easy and we're happy to know
                    that our contributions are helping to protect the wider Squad community."
                  </blockquote>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="separator separator-bottom separator-skew zindex-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon className="fill-white" points="2560,0 2560,100 0,100" />
          </svg>
        </div>
      </section>
      <section className="section">
        <Container>
          <Row className="text-center justify-content-center">
            <Col xs="12">
              <h2 className="display-3">Our Principles</h2>
              <p className="lead">
                The Squad Community Ban List aims to protect the Squad community's integrity through
                collaboration and information sharing, however, whilst doing this we follow the
                following principles.
              </p>
            </Col>
          </Row>
          <Row className="row-grid mt-5">
            <Col lg="4">
              <div className="icon icon-lg icon-shape icon-shape-primary shadow rounded-circle">
                <i className="fa fa-hands-helping" />
              </div>
              <h5 className="mt-3">Collaboration</h5>
              <p className="mt-3">
                We bring communities and individuals together to work towards the same goal, to
                protect the Squad community.
              </p>
            </Col>
            <Col lg="4">
              <div className="icon icon-lg icon-shape icon-shape-primary shadow rounded-circle">
                <i className="fa fa-balance-scale" />
              </div>
              <h5 className="mt-3">Unbiased</h5>
              <p className="mt-3">
                We do not decide who's good or bad. Instead, we provide information to allow others
                to make their own informed decisions.
              </p>
            </Col>
            <Col lg="4">
              <div className="icon icon-lg icon-shape icon-shape-primary shadow rounded-circle">
                <i className="fa fa-door-open" />
              </div>
              <h5 className="mt-3">Transparent</h5>
              <p className="mt-3">
                We are transparent about our decision making processes and are open to others about
                how are systems work.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg="8">
              <h2 className="display-3">Our Team</h2>
              <p className="lead">
                We have a small team of individuals who keep our systems running and help
                orchestrate collaboration between partner organisations.
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="4" className="mb-5">
              <div className="px-4">
                <div className="pt-4 text-center">
                  <h5 className="title">
                    <span className="d-block mb-1">Tommy</span>
                    <small className="h6">Project Lead & Developer</small>
                  </h5>
                </div>
              </div>
            </Col>
            <Col md="4" className="mb-5">
              <div className="px-4">
                <div className="pt-4 text-center">
                  <h5 className="title">
                    <span className="d-block mb-1">LeventHAN</span>
                    <small className="h6">Developer</small>
                  </h5>
                </div>
              </div>
            </Col>
            <Col md="4" className="mb-5">
              <div className="px-4">
                <div className="pt-4 text-center">
                  <h5 className="title">
                    <span className="d-block mb-1">got2bhockey</span>
                    <small className="h6">Developer</small>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Card className="bg-gradient-info shadow-lg border-0">
              <div className="p-5">
                <Row className="align-items-center">
                  <Col lg="8">
                    <h4 className="text-white">Also by Us... SquadJS</h4>
                    <p className="text-white mt-3">
                      SquadJS is a scripting framework, designed for Squad servers, that aims to
                      handle all communication and data collection to and from the servers. It can be
                      used to automate processes to make your team's lives easier.
                    </p>
                  </Col>
                  <Col className="ml-lg-auto text-center" lg="3">
                    <img
                      alt="SquadJS Logo"
                      src="https://github.com/Thomas-Smyth/SquadJS/raw/master/core/assets/squadjs-logo-white.png"
                      className="mb-3"
                      width="200px"
                    />
                    <Button
                      block
                      className="btn-white"
                      color="github"
                      href="https://github.com/Thomas-Smyth/SquadJS"
                      size="lg"
                    >
                      <i className="fab fa-github mr-2" />
                      View on GitHub
                    </Button>
                  </Col>
                </Row>
              </div>
            </Card>
          </Row>
        </Container>
      </section>
    </Layout>
  );
}
