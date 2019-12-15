import React from 'react';
import { Link } from 'react-router-dom';
import {
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  Row,
  UncontrolledCollapse
} from 'reactstrap';

import routes from '../routes';

class CustomNavbar extends React.Component {
  createLinks(routes) {
    return routes.map((route, key) => (
      <NavItem key={key}>
        <NavLink className="nav-link-icon" to={route.path} tag={Link}>
          <i className={route.icon} />
          <span className="nav-link-inner--text">{route.name}</span>
        </NavLink>
      </NavItem>
    ));
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
          </Container>
        </Navbar>
      </>
    );
  }
}
export default CustomNavbar;
