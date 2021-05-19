import { Col, Container, Row } from 'reactstrap';

import SteamUserSearchBox from '../SteamUserSearchBox';

export default function HomeBanner() {
  return (
    <div className="position-relative">
      <section className="section section-lg section-shaped pb-250">
        <div
          className="shape"
          style={{
            backgroundImage:
              'linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(/img/backgrounds/background-1.jpg)',
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
                <SteamUserSearchBox frontpageVersion={true} className="mt-5" />
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
  );
}
