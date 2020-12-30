import React from 'react';
import { Card, CardBody, Container } from 'reactstrap';

import Layout from '../layout/layout.js';

export default function () {
  return (
    <Layout>
      <section className="section section-lg pt-lg-0 mt--200">
        <Container>
          <Card className="shadow border-0">
            <CardBody className="pt-5 pb-2 border-bottom">
              <div className="icon icon-shape bg-gradient-info rounded-circle text-white mb-4">
                <i className="fas fa-desktop" />
              </div>
              <h6 className="text-info text-uppercase">Community Monitor</h6>
              <p className="description mt-2">
                Monitor the integrity of your community using the data we collect.
              </p>
            </CardBody>
            <CardBody className="text-center">
              <h1>Coming in the future...</h1>
            </CardBody>
          </Card>
        </Container>
      </section>
    </Layout>
  );
}
