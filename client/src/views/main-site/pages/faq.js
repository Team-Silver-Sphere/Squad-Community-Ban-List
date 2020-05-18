import React from 'react';
import { Link } from 'react-router-dom';

import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

import { discordLink } from 'core/config/web-server';

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
              <h3 className=" mb-0">Getting Unbanned</h3>
            </CardHeader>
            <CardBody>
              <Question>
                I have been informed that I have banned on the Squad Community
                Ban List, what can I do?
              </Question>
              <Answer>
                Being banned on the Squad Community Ban List ("SCBL") depends on
                the export ban list criteria specified by the server you are
                attempting to play on. The less lenient the criteria the more
                likely you are to be banned via the SCBL, so you may first wish
                to try playing on another server before trying to appeal any
                bans. If you decide you wish to appeal the bans that have caused
                you to be banned via the SCBL, then our{' '}
                <Link to="/search">Search page</Link> will allow you to lookup
                which of our partner organisation's servers you are banned on
                and provide you with information on how to appeal the bans with
                our partner organisations.
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
                to contact the server organisation who's server you wish to play
                in order to get them to change their export ban list criteria to
                in such a way that you are no longer banned.
              </Answer>
              <Question>
                The search page informs me I've been banned by the Squad
                Community Ban List. How can I appeal this ban?
              </Question>
              <Answer>
                The Squad Community Ban List ("SCBL") issues bans when strong
                evidence of a more serious rule break is provided via the OWI
                Hosting Discord #problem-players / #cheating-reports channels.
                These bans have a fixed length and can only be appealed under
                exceptional circumstances via our{' '}
                <a href={discordLink}>Discord</a>.
                <br />
                <br />
                These bans fall under three categories with the associated
                lengths:
                <ul>
                  <li>Cheating Ban - Permanent</li>
                  <li>Trolling (e.g. intentional teamkilling) - One Month</li>
                  <li>Hate Speech - Two Weeks</li>
                </ul>
              </Answer>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col>
          <Card className=" shadow">
            <CardHeader className=" bg-transparent">
              <h3 className=" mb-0">Using the Squad Community Ban List</h3>
            </CardHeader>
            <CardBody>
              <Question>How are the ban reasons classified?</Question>
              <Answer>
                We classify ban reasons by looking for keywords in any text
                accompanying the ban in the ban list's source. If a reason is
                unknown this means that no keywords matched or there is no text
                supplied with the ban.
              </Answer>
              <Question>
                How can I use the Squad Community Ban List on my server?
              </Question>
              <Answer>
                {!Auth.isLoggedIn ? (
                  <>
                    Firstly, you must login to the Squad Community Ban List
                    website via our <Link to="/login">Login page</Link>. Next,
                    head
                  </>
                ) : (
                  <>Head</>
                )}
                over to the <Link to="/install">Install page</Link>. On this
                page, you can create an "export ban list" with customizable
                criteria. Once generated, this export ban list will contain an
                up-to-date list of players deemed malicious based on your
                criteria. If you use BattleMetrics then you can opt to enable
                BattleMetrics and we will create and share a ban list with you
                for you to import within your BattleMetrics organisation. If you
                do not use BattleMetrics, fear not, we also provide a link to a
                remote ban lists that can be imported into your Squad server.
                For information on how to achieve this, please refer to the{' '}
                <a href="https://squad.gamepedia.com/Server_Configuration#Remote_Ban_Lists_in_RemoteBanListHosts.cfg">
                  Squad Wiki
                </a>
                .
              </Answer>
              <Question>How does the criteria system work?</Question>
              <Answer>
                The criteria consists of a set of weights and a threshold. In
                order for a player to be banned then the weights must add up to
                equal or exceed the threshold value.
                <br />
                <br />
                The default weights are 3 for active bans and 1 for expired bans
                and the default threshold is 9. This means that a player must
                have 3 active bans to exceed the threshold as 3 active bans
                times the weight, 3, equals the threshold, 9. Any combination of
                active and expired bans will cause the player to be banned,
                providing the weights sum to equal or exceed the threshold. So,
                for example, a player with 2 active bans and 3 expired bans will
                also be banned with the default criteria as 2 active bans times
                the weight, 3, plus 3 expired bans times the weight, 1, exceeds
                the threshold 9.
              </Answer>
              <Question>
                Why am I limited to only three export ban lists?
              </Question>
              <Answer>
                The more export ban lists we host the longer it takes for them
                to be updated when new or changed information is imported from
                our partner organisation's ban list. It is important that our
                export ban lists are rapidly updated to ensure that malicious
                players are banned before they can cause too much harm to the
                Squad community, therefore we limit the number of export ban
                lists each user can create. If you have a legitimate need for
                more export ban lists, then please get in touch and we can
                increase your limit.
              </Answer>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col>
          <Card className=" shadow">
            <CardHeader className=" bg-transparent">
              <h3 className=" mb-0">
                Contributing to the Squad Community Ban List
              </h3>
            </CardHeader>
            <CardBody>
              <Question>How do I become a partner organisation?</Question>
              <Answer>
                Any server organisation can become a partner organisation. We
                actively encourage server organisations to become partner
                organisations as the more partner organisations that contribute
                information on players the more effective the Squad Community
                Ban List becomes in protecting the integrity of the Squad
                community. To become a partner organisation, please contact us
                via our <a href={discordLink}>Discord</a>.
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
                What information do you share from our ban list?
              </Question>
              <Answer>
                Currently, for each ban in your ban list we share the Steam ID
                of the banned player, the creation date, expiry date and a
                classified reason by looking for keywords in the ban reason and
                note, if using Battlemetrics.
              </Answer>
              <Question>
                How do I share my BattleMetrics ban list in order to help
                contribute?
              </Question>
              <Answer>
                An invite can be created and linked to other organisations to
                allow them to subscribe to view an up to date copy of your ban
                list. To share a BattleMetrics ban list, please refer to the{' '}
                <a href="https://www.battlemetrics.com/rcon/ban-lists">
                  ban list page
                </a>
                .
              </Answer>
              <Question>
                What access must I provide to my BattleMetrics ban list?
              </Question>
              <Answer>
                We only require read access to your BattleMetrics ban list. All
                other permissions can be disabled.
              </Answer>
              <Question>
                We wish to stop being a partner organisation. How can I do this?
              </Question>
              <Answer>
                Please contact us via our <a href={discordLink}>Discord</a> so
                we can resolve the issues you have with the Squad Community Ban
                List and/or arrange your departure.
              </Answer>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
