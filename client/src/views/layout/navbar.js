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
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from 'reactstrap';

import { DISCORD_INVITE } from 'scbl-lib/config';

import Auth from '../../utils/auth.js';

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
                <img alt="SCBL Logo" src={require('../../assets/img/brand/scbl-logo.png')} />
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
                        <img alt="..." src={require('../../assets/img/brand/scbl-logo-dark.png')} />
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
                              Browse over 12,000 banned players and explore their reputation.
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
                              Explore players recently banned on one of our many partner
                              organisations.
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
                              View players ranked from the most harmful to the least harmful.
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
                              Find out how health the Squad community is by exploring trends in our
                              data.
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
                              Configure and generate ban lists from out database that preemptively
                              ban harmful players before they have a chance to harm your community.
                            </p>
                          </Media>
                        </Media>
                        <Media
                          className="d-flex align-items-center"
                          tag={Link}
                          to="/discord-alerts"
                        >
                          <div className="icon icon-shape bg-discord rounded-circle text-white">
                            <i className="fab fa-discord" />
                          </div>
                          <Media body className="ml-3">
                            <h6 className="heading text-discord mb-md-1">Discord Alerts</h6>
                            <p className="description d-none d-md-inline-block mb-0">
                              Be alerted when bans are imported into our system or when new bans are
                              added or removed from your export ban list.
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
                          href="https://github.com/Squad-Community-Ban-List/Squad-Community-Ban-List"
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
                      href="https://github.com/Squad-Community-Ban-List/Squad-Community-Ban-List"
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
                  <NavItem>
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
                        <DropdownMenu className="dropdown-menu-md" left>
                          <DropdownItem>
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
                  </NavItem>
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
