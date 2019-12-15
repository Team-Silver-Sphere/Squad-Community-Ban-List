import React from 'react';
import { Link } from 'react-router-dom';
import {
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  Row,
  UncontrolledCollapse,
  UncontrolledDropdown
} from 'reactstrap';

import Auth from '../../../utils/auth';

import routes from '../routes';

class CustomNavbar extends React.Component {
  createLinks(routes) {
    return routes.map((route, key) => {
      if (route.display && route.display() === false) return null;
      return (
        <NavItem key={key}>
          <NavLink className="nav-link-icon" to={route.path} tag={Link}>
            <i className={route.icon} />
            <span className="nav-link-inner--text">{route.name}</span>
          </NavLink>
        </NavItem>
      );
    });
  }

  render() {
    return (
      <>
        <Navbar
          className="navbar-top navbar-horizontal navbar-dark"
          expand="md"
        >
          <Container className="px-4">
            <NavbarBrand to="/" tag={Link}>
              <img alt="..." src={require('assets/scbl-logo.png')} />
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar-collapse-main">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
              <div className="navbar-collapse-header d-md-none">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img alt="..." src={require('assets/scbl-logo.png')} />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button
                      className="navbar-toggler"
                      id="navbar-collapse-main"
                    >
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="ml-auto" navbar>
                {this.createLinks(routes)}
              </Nav>
            </UncontrolledCollapse>
            {Auth.isLoggedIn && (
              <Nav className="align-items-center">
                <UncontrolledDropdown nav>
                  <DropdownToggle nav>
                    <Media className="align-items-center">
                      <span className="avatar avatar-sm rounded-circle">
                        <img alt="..." src={Auth.claim.avatar} />
                      </span>
                    </Media>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem
                      href="#pablo"
                      onClick={() => {
                        Auth.logout();
                      }}
                    >
                      <i className="ni ni-user-run" />
                      <span>Logout</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            )}
          </Container>
        </Navbar>
      </>
    );
  }
}
export default CustomNavbar;
