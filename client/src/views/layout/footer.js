import React from 'react';

import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from 'reactstrap';
import { DISCORD_INVITE } from 'scbl-lib/config.js';

export default function () {
  return (
    <>
      <footer className="footer has-cards">
        <Container>
          <Row className="row-grid align-items-center my-md">
            <Col lg="6">
              <h4 className="text-primary font-weight-light mb-2">
                Thanks for joining us in the fight against harmful players!
              </h4>
              <h6 className="mb-0 font-weight-light">
                You can contact and keep in touch with us via Discord or GitHub.
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
              <div className="copyright">
                Copyright © {new Date().getFullYear()}{' '}
                <a href="https://thomas-smyth.uk" target="_blank" rel="noopener noreferrer">
                  Thomas Smyth
                </a>
              </div>
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
    </>
  );
}
