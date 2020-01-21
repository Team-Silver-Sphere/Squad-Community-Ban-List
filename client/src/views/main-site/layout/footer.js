import React from 'react';
import { Col, Container, Nav, NavItem, NavLink, Row } from 'reactstrap';

class Footer extends React.Component {
  render() {
    return (
      <>
        <footer className="py-5">
          <Container>
            <Row className="align-items-center justify-content-xl-between">
              <Col xl="6">
                <div className="copyright text-center text-xl-left text-muted">
                  © 2020{' '}
                  <a
                    className="font-weight-bold ml-1"
                    href="https://github.com/Squad-Community-Ban-List"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    SCBL Team
                  </a>
                </div>
              </Col>
              <Col xl="6">
                <Nav className="nav-footer justify-content-center justify-content-xl-end">
                  <NavItem>
                    <NavLink
                      href="https://github.com/Squad-Community-Ban-List/Squad-Community-Ban-List/blob/master/api-documentation.md"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-info-circle" /> API Docs
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://github.com/Squad-Community-Ban-List"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github" /> SCBL GitHub Team
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://github.com/Squad-Community-Ban-List/Squad-Community-Ban-List"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github" /> SCBL on GitHub
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}
export default Footer;
