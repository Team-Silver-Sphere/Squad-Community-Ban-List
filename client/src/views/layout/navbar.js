import React from 'react';
import { Link } from 'react-router-dom';

import Headroom from 'headroom.js';

import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from 'reactstrap';

import { DISCORD_INVITE } from 'scbl-lib/config';

import Auth from '../../utils/auth.js';

import logo from '../../assets/img/brand/scbl-logo.svg';
import logoDark from '../../assets/img/brand/scbl-logo-dark.svg';

class DemoNavbar extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById('navbar-main'));
    headroom.init();
  }
  state = {
    collapseClasses: '',
    collapseOpen: false
  };

  onExiting = () => {
    this.setState({
      collapseClasses: 'collapsing-out'
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: ''
    });
  };

  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <img alt="SCBL Logo" src={logo} />
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar"
                navbar
                className={this.state.collapseClasses}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img alt="..." src={logoDark} />
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
                        <Media className="d-flex align-items-center" tag={Link} to="/search">
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
                        <Media className="d-flex align-items-center" tag={Link} to="/recent-bans">
                          <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                            <i className="fa fa-clock" />
                          </div>
                          <Media body className="ml-3">
                            <h6 className="heading text-primary mb-md-1">Recent Bans</h6>
                            <p className="description d-none d-md-inline-block mb-0">
                              View players recently banned on one of our many partner organisations.
                            </p>
                          </Media>
                        </Media>
                        <Media
                          className="d-flex align-items-center"
                          tag={Link}
                          to="/most-harmful-players"
                        >
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
                        <Media
                          className="d-flex align-items-center"
                          tag={Link}
                          to="/most-harmful-players-this-month"
                        >
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
                        <Media className="d-flex align-items-center" tag={Link} to="/insights">
                          <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                            <i className="fa fa-chart-bar" />
                          </div>
                          <Media body className="ml-3">
                            <h5 className="heading text-primary mb-md-1">Insights</h5>
                            <p className="description d-none d-md-inline-block mb-0">
                              Get insights on how healthy the Squad community is by exploring trends
                              in our data.
                            </p>
                          </Media>
                        </Media>
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
                        <Media
                          className="d-flex align-items-center"
                          tag={Link}
                          to="/export-ban-lists"
                        >
                          <div className="icon icon-shape bg-gradient-info rounded-circle text-white">
                            <i className="fa fa-angle-double-down" />
                          </div>
                          <Media body className="ml-3">
                            <h6 className="heading text-info mb-md-1">Export Ban Lists</h6>
                            <p className="description d-none d-md-inline-block mb-0">
                              Protect your Squad server with our configurable export ban lists that
                              preemptively ban the most harmful players from your server before they
                              have the chance to cause any harm.
                            </p>
                          </Media>
                        </Media>
                        <Media
                          className="d-flex align-items-center"
                          tag={Link}
                          to="/community-monitor"
                        >
                          <div className="icon icon-shape bg-gradient-info rounded-circle text-white">
                            <i className="fa fa-desktop" />
                          </div>
                          <Media body className="ml-3">
                            <h6 className="heading text-info mb-md-1">Community Monitor</h6>
                            <p className="description d-none d-md-inline-block mb-0">
                              Monitor the integrity of your community using the data we collect.
                            </p>
                          </Media>
                        </Media>
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
                        <Media
                          className="d-flex align-items-center"
                          tag={Link}
                          to="/become-a-partner-organisation"
                        >
                          <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                            <i className="fa fa-angle-double-up" />
                          </div>
                          <Media body className="ml-3">
                            <h6 className="heading text-success mb-md-1">
                              Become a Partner Organisation
                            </h6>
                            <p className="description d-none d-md-inline-block mb-0">
                              Join the fight against harmful players by contributing ban information
                              to the Squad Community Ban List!
                            </p>
                          </Media>
                        </Media>
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
                        <Media className="d-flex align-items-center" tag={Link} to="/faq">
                          <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                            <i className="fa fa-question-circle" />
                          </div>
                          <Media body className="ml-3">
                            <h6 className="heading text-warning mb-md-1">FAQ</h6>
                          </Media>
                        </Media>
                        <Media
                          className="d-flex align-items-center"
                          tag={Link}
                          to="/partner-organisation-list"
                        >
                          <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                            <i className="fa fa-clipboard-list" />
                          </div>
                          <Media body className="ml-3">
                            <h6 className="heading text-warning mb-md-1">
                              Partner Organisation List
                            </h6>
                          </Media>
                        </Media>
                        <Media
                          className="d-flex align-items-center"
                          tag={Link}
                          to="/banned"
                        >
                          <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                            <i className="fa fa-life-ring" />
                          </div>
                          <Media body className="ml-3">
                            <h6 className="heading text-warning mb-md-1">I'm banned, what now?</h6>
                            <p className="description d-none d-md-inline-block mb-0">
                              Get information on how to get unlisted from or unbanned by the Squad Community Ban List.
                            </p>
                          </Media>
                        </Media>
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

                  {Auth.isLoggedIn ? (
                    <UncontrolledDropdown nav>
                      <DropdownToggle nav>
                        <Media className="align-items-center">
                          <span className="avatar avatar-sm rounded-circle mr-2">
                            <img alt="..." src={Auth.claim.avatar} />
                          </span>
                          {Auth.claim.name}
                        </Media>
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-md">
                        <DropdownItem
                          onClick={() => {
                            Auth.logout();
                            this.setState({});
                          }}
                        >
                          <i className="fas fa-sign-out-alt mr-2" />
                          Logout
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  ) : (
                    <Button color="steam" tag={Link} to="/login">
                      <i className="fab fa-steam mr-2" />
                      Login
                    </Button>
                  )}
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default DemoNavbar;
