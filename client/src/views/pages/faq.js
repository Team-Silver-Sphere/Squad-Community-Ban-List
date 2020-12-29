import React, { Component } from "react";
import {
  Card,
  CardBody,
  Container,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  Col,
  Row,
  TabPane } from 'reactstrap';
import classnames from "classnames";
// reactstrap components
import Layout from '../layout/layout.js';

// Declaration for the first tab opening
let tabLoc = 1;

switch(window.location.hash) {
  case '#tab1-q1':
    window.location.hash = '#tab1-q1'
    break;
  case '#tab1-q2':
    window.location.hash = '#tab1-q2'
    break;
  case '#tab1-q3':
    window.location.hash = '#tab1-q3'
    break;
    // Seconds tab
  case '#tab2-q1':
    tabLoc = 2
    
    window.location.hash = '#tab2-q1'
    break;
  case '#tab2-q2':
    tabLoc = 2
    window.location.hash = '#tab2-q2'
    break;
  case '#tab2-q3':
    tabLoc = 2
    window.location.hash = '#tab2-q3'
    break;
  case '#tab2-q4':
    tabLoc = 2
    window.location.hash = '#tab2-q4'
    break;
    // Third tab
  case '#tab3-q1':
    tabLoc = 3
    window.location.hash = '#tab3-q1'
    break;
  case '#tab3-q2':
    tabLoc = 3
    window.location.hash = '#tab3-q2'
    break;
  case '#tab3-q3':
    tabLoc = 3
    window.location.hash = '#tab3-q3'
    break;
  case '#tab3-q4':
    tabLoc = 3
    window.location.hash = '#tab3-q4'
    break;
  case '#tab3-q5':
    tabLoc = 3
    window.location.hash = '#tab3-q5'
    break;
  case '#tab3-q6':
    tabLoc = 3
    window.location.hash = '#tab3-q6'
    break;
  default:
    break;
}

export default class App extends Component {
  state = {
    tabs: tabLoc
  };
  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };
    render() {
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
            <div>
            <div className="nav-wrapper">
            <Nav
              className="nav-fill flex-column flex-md-row"
              id="tabs-icons-text"
              pills
              role="tablist"
            >
              <NavItem>
                <NavLink
                  aria-selected={this.state.tabs === 1}
                  className={classnames("mb-sm-3 mb-md-0", {
                    active: this.state.tabs === 1
                  })}
                  onClick={e => this.toggleNavs(e, "tabs", 1)}
                  href="#pablo"
                  role="tab"
                >
                  <i className="ni ni-cloud-upload-96 mr-2" />
                  Getting Unbanned
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  aria-selected={this.state.tabs === 2}
                  className={classnames("mb-sm-3 mb-md-0", {
                    active: this.state.tabs === 2
                  })}
                  onClick={e => this.toggleNavs(e, "tabs", 2)}
                  href="#pablo"
                  role="tab"
                >
                  <i className="ni ni-bell-55 mr-2" />
                  Using SCBL
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  aria-selected={this.state.tabs === 3}
                  className={classnames("mb-sm-3 mb-md-0", {
                    active: this.state.tabs === 3
                  })}
                  onClick={e => this.toggleNavs(e, "tabs", 3)}
                  href="#"
                  role="tab"
                >
                  <i className="ni ni-calendar-grid-58 mr-2" />
                  Contribuing to SCBL
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          <Card className="shadow">
            <CardBody>
              <TabContent activeTab={"tabs" + this.state.tabs}>
                <TabPane tabId="tabs1">
                  <p className="description">
                  <Row>
                    <h6 id='tab1-q1'><Col sm="12"><strong>Q: I have been informed that I have banned on the Squad Community Ban List, what can I do?</strong></Col></h6>
                  </Row>
                  <Row>
                    <Col className="pl-4 pb-4" sm="9"><strong>A:</strong> Being banned on the Squad Community Ban List ("SCBL") depends on the export ban list criteria specified by the server you are attempting to play on. The less lenient the criteria the more likely you are to be banned via the SCBL, so you may first wish to try playing on another server before trying to appeal any bans. If you decide you wish to appeal the bans that have caused you to be banned via the SCBL, then our <a href='https://squad-community-ban-list.com/search' target='_blanc'>Search page</a> will allow you to lookup which of our partner organisation's servers you are banned on and provide you with information on how to appeal the bans with our partner organisations.</Col>
                    </Row>

                    <Row>
                    <h6 id='tab1-q2'><Col sm="12"><strong>Q: One of your partner organisations won't unban me, can you unban me?</strong></Col></h6>
                  </Row>
                  <Row>
                    <Col className="pl-4 pb-4" sm="9"><strong>A:</strong> The Squad Community Ban List ("SCBL") organisation is not responsible for the issuing of bans on our partner organisation's servers and therefore does not handle appeals. If you believe that your ban is in breach of the <a href='https://squad.gamepedia.com/Server_licensing' target='_blanc'>Official Squad Administrator Guidelines</a> then you could file a report with OWI. Otherwise, you could try to contact the server organisation who's server you wish to play in order to get them to change their export ban list criteria to in such a way that you are no longer banned.</Col>
                    </Row>

                    <Row>
                    <h6 id='tab1-q3'><Col sm="12"><strong>Q: The search page informs me I've been banned by the Squad Community Ban List. How can I appeal this ban?</strong></Col></h6>
                  </Row>
                  <Row>
                    <Col className="pl-4 pb-4" sm="9"><strong>A:</strong> The Squad Community Ban List ("SCBL") issues bans when strong evidence of a more serious rule break is provided via the OWI Hosting Discord #problem-players / #cheating-reports channels. These bans have a fixed length and can only be appealed under exception circumstances via our <a href='https://discord.gg/fbZdj3q' target='_blanc'>Discord</a>.</Col>
                    <Col className="pl-4" sm="9">These bans fall under three categories with the associated lengths:</Col>
                    <Col className="pl-6 pb-6" sm="6">
                    <li>Cheating Ban - Permanent</li>
                    <li>Trolling (e.g. intentional teamkilling) - One Month</li>
                    <li>Hate Speech - Two Weeks</li>
                    </Col>

                    </Row>
                  </p>
                </TabPane>

                <TabPane tabId="tabs2">
                  <p className="description">
                  <Row>
                  <h6 id='tab2-q1'><Col sm="12"><strong>Q: How are the ban reasons classified?</strong></Col></h6>
                </Row>
                <Row>
                  <Col className="pl-4 pb-4" sm="9"><strong>A:</strong> We classify ban reasons by looking for keywords in any text accompanying the ban in the ban list's source. If a reason is unknown this means that no keywords matched or there is no text supplied with the ban.</Col>
                  </Row>
                  <Row>
                  <h6 id='tab2-q2'><Col sm="12"><strong>Q: How can I use the Squad Community Ban List on my server?</strong></Col></h6>
                </Row>
                <Row>
                  <Col className="pl-4 pb-4" sm="9"><strong>A:</strong> Headover to the <a href='/export-ban-lists'>Install</a> page. On this page, you can create an "export ban list" with customizable criteria. Once generated, this export ban list will contain an up-to-date list of players deemed malicious based on your criteria. If you use BattleMetrics then you can opt to enable BattleMetrics and we will create and share a ban list with you for you to import within your BattleMetrics organisation. If you do not use BattleMetrics, fear not, we also provide a link to a remote ban lists that can be imported into your Squad server. For information on how to achieve this, please refer to the <a href='https://squad.gamepedia.com/Server_Configuration#Remote_Ban_Lists_in_RemoteBanListHosts.cfg' target='_blanc'>Squad Wiki</a>.</Col>
                  </Row>

                  <Row>
                  <h6 id='tab2-q3'><Col sm="12"><strong>Q: How does the criteria system work?</strong></Col></h6>
                </Row>
                <Row>
                  <Col className="pl-4 pb-4" sm="9"><strong>A:</strong> The criteria consists of a set of weights and a threshold. In order for a player to be banned then the weights must add up to equal or exceed the threshold value.</Col>
                  <Col className="pl-4 pb-4" sm="9">The default weights are 3 for active bans and 1 for expired bans and the default threshold is 9. This means that a player must have 3 active bans to exceed the threshold as 3 active bans times the weight, 3, equals the threshold, 9. Any combination of active and expired bans will cause the player to be banned, providing the weights sum to equal or exceed the threshold. So, for example, a player with 2 active bans and 3 expired bans will also be banned with the default criteria as 2 active bans times the weight, 3, plus 3 expired bans times the weight, 1, exceeds the threshold 9.</Col>
                  </Row>
                  <Row>
                  <h6 id='tab2-q4'><Col sm="12"><strong>Q: Why am I limited to only three export ban lists?</strong></Col></h6>
                </Row>
                <Row>
                  <Col className="pl-4 pb-4" sm="9"><strong>A:</strong> The more export ban lists we host the longer it takes for them to be updated when new or changed information is imported from our partner organisation's ban list. It is important that our export ban lists are rapidly updated to ensure that malicious players are banned before they can cause too much harm to the Squad community, therefore we limit the number of export ban lists each user can create. If you have a legitimate need for more export ban lists, then please get in touch and we can increase your limit.</Col>
                  </Row>
                  </p>
                </TabPane>

                <TabPane tabId="tabs3">
                  <p className="description">
                  <Row>
                  <h6 id='tab3-q1'><Col sm="12"><strong>Q: How do I become a partner organisation?</strong></Col></h6>
                </Row>
                <Row>
                  <Col className="pl-4 pb-4" sm="9"><strong>A:</strong> Any server organisation can become a partner organisation. We actively encourage server organisations to become partner organisations as the more partner organisations that contribute information on players the more effective the Squad Community Ban List becomes in protecting the integrity of the Squad community. To become a partner organisation, please contact us via our <a href='https://discord.gg/fbZdj3q' target='_blanc'>Discord</a>.</Col>
                  </Row>
                  <Row>
                  <h6 id='tab3-q2'><Col sm="12"><strong>Q: What do I get out of being a partner organisation?</strong></Col></h6>
                </Row>
                <Row>
                  <Col className="pl-4 pb-4" sm="9"><strong>A:</strong> There are currently no benefits to being a partner organisation, however, everyone benefits from our partner organisations as the more partner organisations that contribute information on players the more effective the Squad Community Ban List becomes in protecting the integrity of the Squad community so, please consider contributing to thank others for their contributions.</Col>
                  </Row>
                  <Row>
                  <h6 id='tab3-q3'><Col sm="12"><strong>Q: What information do you share from our ban list?</strong></Col></h6>
                </Row>
                <Row>
                  <Col className="pl-4 pb-4" sm="9"><strong>A:</strong> Currently, for each ban in your ban list we share the Steam ID of the banned player, the creation date, expiry date and a classified reason by looking for keywords in the ban reason and note, if using Battlemetrics.</Col>
                  </Row>
                  <Row>
                  <h6 id='tab3-q4'><Col sm="12"><strong>Q: How do I share my BattleMetrics ban list in order to help contribute?</strong></Col></h6>
                </Row>
                <Row>
                  <Col className="pl-4 pb-4" sm="9"><strong>A:</strong>  An invite can be created and linked to other organisations to allow them to subscribe to view an up to date copy of your ban list. To share a BattleMetrics ban list, please refer to the <a href='https://www.battlemetrics.com/rcon/ban-lists' target='_blanc'>ban list page</a>.</Col>
                  </Row>
                  <Row>
                  <h6 id='tab3-q5'><Col sm="12"><strong>Q: What access must I provide to my BattleMetrics ban list?</strong></Col></h6>
                </Row>
                <Row>
                  <Col className="pl-4 pb-4" sm="9"><strong>A:</strong> We only require read access to your BattleMetrics ban list. All other permissions can be disabled.</Col>
                  </Row>
                  <Row>
                  <h6 id='tab3-q6'><Col sm="12"><strong>Q: We wish to stop being a partner organisation. How can I do this?</strong></Col></h6>
                </Row>
                <Row>
                  <Col className="pl-4 pb-4" sm="9"><strong>A:</strong> Please contact us via our <a href='https://discord.gg/fbZdj3q' target='_blanc'>Discord</a> so we can resolve the issues you have with the Squad Community Ban List and/or arrange your departure.</Col>
                  </Row>
                  </p>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
            </div>
            </CardBody>
          </Card>
        </Container>
      </section>
    </Layout>
        );
    }
}
