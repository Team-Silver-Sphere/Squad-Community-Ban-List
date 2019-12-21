import React from 'react';
import { Link } from 'react-router-dom';

import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

import Layout from '../layout/layout';

import Auth from '../../../utils/auth';

function Question(props) {
  return <p className="font-weight-bold">Q: {props.children}</p>;
}

function Answer(props) {
  return (
    <p className="ml-4">
      <span className="font-weight-bold">A:</span> {props.children}
    </p>
  );
}

export default function() {
  return (
    <Layout>
      <Row className="justify-content-center">
        <Col>
          <Card className=" shadow">
            <CardHeader className=" bg-transparent">
              <h3 className=" mb-0">Players</h3>
            </CardHeader>
            <CardBody>
              <Question>
                I have been informed that I have banned on the Squad Community
                Ban List, what can I do?
              </Question>
              <Answer>
                Being banned on the Squad Community Ban List ("SCBL") depends on
                the criteria specified by the server you are attempting to play
                on. The less lenient the criteria the more likely you are to be
                banned via the SCBL, so you may first wish to try playing on
                another server before trying to appeal any bans. If you decide
                you wish to appeal the bans that have caused you to be banned
                via the SCBL, then our <Link to="/search">Search page</Link>{' '}
                will allow you to lookup which of our partner organisation's
                servers you are banned on and provide you with information on
                how to appeal the bans with our partner organisations.
              </Answer>
              <Question>
                One of your partner organisations won't unban me, can you unban
                me?
              </Question>
              <Answer>
                The Squad Community Ban List ("SCBL") organisation is not
                responsible for the issuing of bans on our partner
                organisation's servers and therefore does not handle appeals. If
                you believe that your ban is in breach of the{' '}
                <a href="http://forums.joinsquad.com/topic/7849-game-server-administration-guidelines/">
                  Official Squad Administrator Guidelines
                </a>{' '}
                then you could file a report with OWI. Otherwise, you could try
                to contact the server organisation you wish to play with in
                order to get them to change their remote ban list criteria to
                ensure you are not banned.
              </Answer>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col>
          <Card className=" shadow">
            <CardHeader className=" bg-transparent">
              <h3 className=" mb-0">Server Organisations</h3>
            </CardHeader>
            <CardBody>
              <Question>
                "Remote Ban List" & "Export Ban List", what are they?
              </Question>
              <Answer>
                In the Squad Community Ban List we refer to both "remote ban
                lists" and "export ban lists". An export ban list is a ban list
                generated based on the criteria specified when creating the
                export ban list and the information stored in our database. An
                export ban list can be imported to your Squad server as a remote
                ban list using the link, as specified on the{' '}
                <Link to="/install">Install page</Link>.
              </Answer>
              <Question>
                How can I setup a remote ban list on our server to start
                benefiting from the Squad Community Ban List?
              </Question>
              <Answer>
                {Auth.isLoggedIn ? (
                  <>
                    It appears that you are already logged in, so you simply
                    need to head over to the{' '}
                    <Link to="/install">Install page</Link>.
                  </>
                ) : (
                  <>
                    Firstly, you need to login to the site through our{' '}
                    <Link to="/login">Login page</Link> and then head over to
                    the <Link to="/install">Install page</Link>.
                  </>
                )}{' '}
                At the bottom of the page you will find the "Create Export Ban
                List" form, which allows you to create a remote ban list that
                lists players that should be banned according to the criteria
                that you specify in the form. Once you create the export ban
                list it will appear in the export ban list table. To install the
                remote ban list on your server, click the "Install Remote Ban
                List" button and follow the instructions in the popup.
              </Answer>
              <Question>
                Why am I limited to only three export ban lists?
              </Question>
              <Answer>
                The more export ban lists we host the longer it takes for new
                bans to be updated in the lists. It is important that our export
                ban lists are rapidly updated to ensure that malicious players
                are banned before they can cause too much harm to the Squad
                community, therefore we limit the number of export ban lists
                each user can create. If you have a legitimate need for more
                export ban lists, then please get in touch and we can increase
                your limit.
              </Answer>
              <Question>
                My export ban list was deleted for some reason. What happened?
              </Question>
              <Answer>
                The more export ban lists we host the longer it takes for new
                bans to be updated in the lists. It is important that our export
                ban lists are rapidly updated to ensure that malicious players
                are banned before they can cause too much harm to the Squad
                community, therefore we periodically delete export ban lists
                that have not been accessed, via the remote ban list URL, to
                prune export ban lists that appear to no longer be being used.
                If you do not wish for the export ban list to be deleted please
                fetch the remote ban list at least once a week.
              </Answer>
              <Question>"Threshold" & "Weights", what are they?</Question>
              <Answer>
                Thresholds and weights are how you specify the criteria for a
                player to be banned in your export ban list. The threshold
                specifies the number of times that a player must be banned for
                them to be included within the export ban list. Weights are
                specified for each ban list and determine how many bans they
                count as. For example, if a ban lists weight is 3 and the
                threshold is 3, then a single ban on this ban list would cause
                the player to be included within your export ban list. A weight
                of 0 will mean that bans on this ban list do not contribute to a
                player meeting the threshold. You can use this if you do not
                trust a ban list, i.e. you think the partner organisation who
                owns the ban list does not enforce rules correctly.
              </Answer>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col>
          <Card className=" shadow">
            <CardHeader className=" bg-transparent">
              <h3 className=" mb-0">Partner Organizations</h3>
            </CardHeader>
            <CardBody>
              <Question>How do I become a partner organisation?</Question>
              <Answer>
                Any server organisation can become a partner organisation. The
                only requirement is that the organisation must use BattleMetrics
                to enforce bans as we currently only pull bans from
                BattleMetrics. We actively encourage server organisations to
                become partner organisations as the more partner organisations
                that contribute information on players the more effective the
                Squad Community Ban List becomes in protecting the integrity of
                the Squad community. To become a partner organisation, please
                contact us via our{' '}
                <a href="https://discord.gg/fbZdj3q">Discord</a>.
              </Answer>
              <Question>
                What do I get out of being a partner organisation?
              </Question>
              <Answer>
                There are currently no benefits to being a partner organisation,
                however, everyone benefits from our partner organisations as the
                more partner organisations that contribute information on
                players the more effective the Squad Community Ban List becomes
                in protecting the integrity of the Squad community so, please
                consider contributing to thank others for their contributions.
              </Answer>
              <Question>
                What information do you share from our BattleMetrics ban list?
              </Question>
              <Answer>
                Currently, we only share whether a player is banned on your ban
                list. Although we store other pieces of information made
                available through the BattleMetrics API, we do not share this
                publicly.
              </Answer>
              <Question>
                We wish to stop being a partner organisation. How can I do this?
              </Question>
              <Answer>
                Please contact us via our{' '}
                <a href="https://discord.gg/fbZdj3q">Discord</a> so we can
                resolve the issues you have with the Squad Community Ban List
                and/or arrange your departure.
              </Answer>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
