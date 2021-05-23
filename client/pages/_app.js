import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import {
  Button,
  Col,
  Container,
  DropdownMenu,
  DropdownToggle,
  Media,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Row,
  UncontrolledCollapse,
  UncontrolledDropdown,
  UncontrolledTooltip
} from 'reactstrap';

import { DISCORD_INVITE } from 'scbl-lib/config';

import { useApollo } from '../lib/apollo-client.js';

import '@fortawesome/fontawesome-free/css/all.min.css';
import '../scss/core.scss';

export default function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  const [collapseClasses, setCollapseClasses] = useState();

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <Head>
          <title>Squad Community Ban List</title>
          <meta name="theme-color" content="#ffc40b" />
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet"/>
        </Head>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <Link href="/" passHref>
                <NavbarBrand className="mr-lg-5">
                  <img alt="SCBL Logo" src="/img/brand/scbl-logo.png" />
                </NavbarBrand>
              </Link>
              <button className="navbar-toggler" id="navbar">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar"
                navbar
                className={collapseClasses}
                onExiting={() => {
                  setCollapseClasses('collapsing-out');
                }}
                onExited={() => {
                  setCollapseClasses('');
                }}
              >
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link href="/">
                        <img alt="..." src="/img/brand/scbl-logo-dark.png" />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="fa fa-search" />
                      <span className="nav-link-inner--text ml-2">Explore</span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-xl">
                      <div className="dropdown-menu-inner">
                        <Link href="/search" passHref>
                          <Media className="d-flex align-items-center">
                            <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                              <i className="fa fa-search" />
                            </div>
                            <Media body className="ml-3">
                              <h6 className="heading text-primary mb-md-1">Search</h6>
                              <p className="description d-none d-md-inline-block mb-0">
                                Search our database containing over 32,000 bans and 24,000 players.
                              </p>
                            </Media>
                          </Media>
                        </Link>

                        <Link href="/recent-bans" passHref>
                          <Media className="d-flex align-items-center">
                            <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                              <i className="fa fa-clock" />
                            </div>
                            <Media body className="ml-3">
                              <h6 className="heading text-primary mb-md-1">Recent Bans</h6>
                              <p className="description d-none d-md-inline-block mb-0">
                                View players recently banned on one of our many partner
                                organisations.
                              </p>
                            </Media>
                          </Media>
                        </Link>

                        <Link href="/most-harmful-players" passHref>
                          <Media className="d-flex align-items-center">
                            <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                              <i className="fa fa-list" />
                            </div>
                            <Media body className="ml-3">
                              <h6 className="heading text-primary mb-md-1">Most Harmful Players</h6>
                              <p className="description d-none d-md-inline-block mb-0">
                                Explore a list of the most harmful players in our database.
                              </p>
                            </Media>
                          </Media>
                        </Link>

                        <Link href="/most-harmful-players-this-month" passHref>
                          <Media className="d-flex align-items-center">
                            <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                              <i className="fa fa-list" />
                            </div>
                            <Media body className="ml-3">
                              <h6 className="heading text-primary mb-md-1">
                                Most Harmful Players This Month
                              </h6>
                              <p className="description d-none d-md-inline-block mb-0">
                                Explore a list of the most harmful players in our database from this
                                month.
                              </p>
                            </Media>
                          </Media>
                        </Link>
                      </div>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="fa fa-angle-double-down" />
                      <span className="nav-link-inner--text ml-2">Benefit</span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-xl">
                      <div className="dropdown-menu-inner">
                        <Link href="/export-ban-lists" passHref>
                          <Media className="d-flex align-items-center">
                            <div className="icon icon-shape bg-gradient-info rounded-circle text-white">
                              <i className="fa fa-angle-double-down" />
                            </div>
                            <Media body className="ml-3">
                              <h6 className="heading text-info mb-md-1">Export Ban Lists</h6>
                              <p className="description d-none d-md-inline-block mb-0">
                                Protect your Squad server with our configurable export ban lists
                                that preemptively ban the most harmful players from your server
                                before they have the chance to cause any harm.
                              </p>
                            </Media>
                          </Media>
                        </Link>
                      </div>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="fa fa-angle-double-up" />
                      <span className="nav-link-inner--text ml-2">Contribute</span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-xl">
                      <div className="dropdown-menu-inner">
                        <Link href="/become-a-partner-organisation" passHref>
                          <Media to="/become-a-partner-organisation">
                            <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                              <i className="fa fa-angle-double-up" />
                            </div>
                            <Media body className="ml-3">
                              <h6 className="heading text-success mb-md-1">
                                Become a Partner Organisation
                              </h6>
                              <p className="description d-none d-md-inline-block mb-0">
                                Join the fight against harmful players by contributing ban
                                information to the Squad Community Ban List!
                              </p>
                            </Media>
                          </Media>
                        </Link>

                        <Media
                          className="d-flex align-items-center"
                          href="https://github.com/Thomas-Smyth/Squad-Community-Ban-List"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="icon icon-shape bg-github rounded-circle text-white">
                            <i className="fab fa-github" />
                          </div>
                          <Media body className="ml-3">
                            <h6 className="heading text-github mb-md-1">GitHub</h6>
                            <p className="description d-none d-md-inline-block mb-0">
                              The Squad Community Ban List is an open source project anyone can
                              contribute to. Find out more on our GitHub!
                            </p>
                          </Media>
                        </Media>
                      </div>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="fa fa-question-circle" />
                      <span className="nav-link-inner--text ml-2">Help</span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-xl">
                      <div className="dropdown-menu-inner">
                        <Link href="/faq" passHref>
                          <Media className="d-flex align-items-center">
                            <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                              <i className="fa fa-question-circle" />
                            </div>
                            <Media body className="ml-3">
                              <h6 className="heading text-warning mb-md-1">FAQ</h6>
                            </Media>
                          </Media>
                        </Link>

                        <Link href="/partner-organisation-list" passHref>
                          <Media className="d-flex align-items-center">
                            <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                              <i className="fa fa-clipboard-list" />
                            </div>
                            <Media body className="ml-3">
                              <h6 className="heading text-warning mb-md-1">
                                Partner Organisation List
                              </h6>
                            </Media>
                          </Media>
                        </Link>

                        <Link href="/banned" passHref>
                          <Media className="d-flex align-items-center">
                            <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                              <i className="fa fa-life-ring" />
                            </div>
                            <Media body className="ml-3">
                              <h6 className="heading text-warning mb-md-1">
                                I'm banned, what now?
                              </h6>
                              <p className="description d-none d-md-inline-block mb-0">
                                Get information on how to get unlisted from or unbanned by the Squad
                                Community Ban List.
                              </p>
                            </Media>
                          </Media>
                        </Link>
                      </div>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
                <Nav className="navbar-nav-hover align-items-lg-center ml-lg-auto" navbar>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href={DISCORD_INVITE}
                      id="tooltip-discord"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-discord" />
                      <span className="nav-link-inner--text d-lg-none ml-2">Discord</span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip-discord">
                      Join our Discord!
                    </UncontrolledTooltip>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="https://github.com/Thomas-Smyth/Squad-Community-Ban-List"
                      id="tooltip-github"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github" />
                      <span className="nav-link-inner--text d-lg-none ml-2">Github</span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip-github">
                      Check us out on GitHub!
                    </UncontrolledTooltip>
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
        <Component {...pageProps} />
        <footer className="footer has-cards">
          <Container>
            <Row className="row-grid align-items-center my-md">
              <Col lg="6">
                <h4 className="text-primary font-weight-light mb-2">
                  Thanks for joining us in the fight against harmful players!
                </h4>
                <h6 className="mb-0 font-weight-light">
                  You can contact and keep in touch with us via Discord and GitHub.
                </h6>
              </Col>
              <Col className="text-lg-center btn-wrapper" lg="6">
                <Button
                  className="btn-icon-only rounded-circle ml-1"
                  color="discord"
                  href={DISCORD_INVITE}
                  id="tooltip-footer-discord"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="btn-inner--icon">
                    <i className="fab fa-discord" />
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip-footer-discord">
                  Join our Discord!
                </UncontrolledTooltip>
                <Button
                  className="btn-icon-only rounded-circle ml-1"
                  color="github"
                  href="https://github.com/Thomas-Smyth/Squad-Community-Ban-List"
                  id="tooltip-footer-github"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="btn-inner--icon">
                    <i className="fab fa-github" />
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip-footer-github">
                  Check us out on GitHub!
                </UncontrolledTooltip>
              </Col>
            </Row>
            <hr />
            <Row className="align-items-center justify-content-md-between">
              <Col md="6">
                <div className="copyright">Copyright © {new Date().getFullYear()}</div>
              </Col>
              <Col md="6">
                <Nav className="nav-footer justify-content-end">
                  <NavItem>
                    <NavLink
                      href="https://github.com/Thomas-Smyth/Squad-Community-Ban-List"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      SCBL on GitHub
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://github.com/Thomas-Smyth/Squad-Community-Ban-List/blob/master/LICENSE"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      MIT License
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </ApolloProvider>
    </>
  );
}
