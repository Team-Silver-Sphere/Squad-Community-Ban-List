import React from 'react';
import { Card, CardBody, Container } from 'reactstrap';

import { DISCORD_INVITE } from 'scbl-lib/config';

import Layout from '../layout/layout.js';

export default function () {
  return (
    <Layout>
      <section className="section section-lg pt-lg-0 mt--200">
        <Container>
          <Card className="shadow border-0">
            <CardBody className="pt-5 pb-2 border-bottom">
              <div className="icon icon-shape bg-gradient-success rounded-circle text-white mb-4">
                <i className="fa fa-angle-double-up" />
              </div>
              <h6 className="text-success text-uppercase">Become a Partner Organisation</h6>
              <p className="description mt-2">
                Join the fight against harmful players by contributing ban information to the Squad
                Community Ban List!
              </p>
            </CardBody>
            <CardBody>
              <h5>Introduction to Partner Organisations</h5>
              <p>
                Partner organisations are Squad communities that contribute ban information from
                their server's ban lists to the Squad Community Ban List database. Any Squad
                community can become a partner organisation providing they have an active Squad
                server licensed by Offworld Industries.
              </p>
              <p>
                Becoming a partner organisation requires very little effort. We simply request the
                name of your community, a link to your Discord and information on how we can access
                your ban list. We primarily import bans from Battlemetrics and remote ban lists, but
                can easily add support for custom formats on request. Once your community is added
                to our system we will frequently automatically sync our database with your ban list
                and require no further involvement from you. We will share information from your ban
                list on this website and to Discord servers, however, this information is limited to
                the Steam ID of the banned player, the period of their ban and a list of categorised
                keywords found in their ban reason. We categorise ban reasons based on keywords for
                consistency, to maintain professionalism and to allow you to keep confidential notes
                in their ban lists private.
              </p>
              <p>
                There are currently no benefits to being a partner organisation, however, everyone
                benefits from our partner organisations as the more partner organisations that
                contribute information on players the more effective the Squad Community Ban List
                becomes in protecting the integrity of the Squad community so, please consider
                contributing to thank others for their contributions.
              </p>
              <h5>Form</h5>
              <p>
                If you are interested in becoming a partner organisation, please provide the
                following information via direct message to Tommy who can be found on our{' '}
                <a href={DISCORD_INVITE}>Discord</a>:
              </p>
              <pre>
                <code>
                  {'Community Name:\n' +
                    'Community Discord Invite Link:\n' +
                    '\n' +
                    'Ban List Name(s): Public Server\n' +
                    'Ban List Link(s):\n'}
                </code>
              </pre>
              <br />
              <h6>Notes</h6>
              <p>
                <ul>
                  <li>
                    The ban list name is intended for communities with multiple ban lists or who may
                    wish to share additional information on what their ban list contains, such as if
                    their ban list contains bans from multiple different games. In this case, ban
                    lists should be named to communicate what the ban list contains, e.g. "Hate
                    speech ban list". If this is not the case, you may leave the ban list name as
                    "Public Server".
                  </li>
                  <li>
                    The ban list link should either be a link to a remote ban list or a
                    Battlemetrics ban list invite. Battlemetrics ban list invites can be obtained by
                    navigating to <a href="https://www.battlemetrics.com/rcon/ban-lists">here</a>,
                    clicking "Share" on the appropriate ban list and generating an invite using the
                    default options. If your ban list uses a different format please state that here
                    and we will request further information from you.
                  </li>
                </ul>
              </p>
              <br />
              <p>
                If you wish to stop contributing as a partner organisation, please contact Tommy who
                can be found on our <a href={DISCORD_INVITE}>Discord</a>.
              </p>
            </CardBody>
          </Card>
        </Container>
      </section>
    </Layout>
  );
}
