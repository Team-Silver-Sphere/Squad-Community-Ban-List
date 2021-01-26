import StepWizard from 'react-step-wizard';
import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { Card, CardBody, Container, Modal, ModalHeader, ModalBody } from 'reactstrap';

import { DISCORD_INVITE } from 'scbl-lib/config';

import Layout from '../layout/layout.js';

import { gql, useQuery } from '@apollo/client';

import steamAvatar from '../../assets/img/misc/avatar.jpg';

import SteamUserSearchBox from '../../components/steam-user-search-box-wizard.js';

import {
    AdvancedModal
  } from '../../components';


const GET_PLAYER = gql`
  query Search($id: String!) {
    steamUser(id: $id) {
      id
      name
      avatarFull
      reputationPoints
      riskRating
      reputationRank
      lastRefreshedInfo
      lastRefreshedReputationPoints
      lastRefreshedReputationRank
      activeBans: bans(orderBy: "created", orderDirection: DESC, expired: false) {
        edges {
          cursor
          node {
            id
            banList {
              id
              name
              organisation {
                id
                name
                discord
              }
            }
            reason
            created
            expires
          }
        }
      }
      expiredBans: bans(orderBy: "created", orderDirection: DESC, expired: true) {
        edges {
          cursor
          node {
            id
            banList {
              id
              name
              organisation {
                id
                name
                discord
              }
            }
            reason
            created
            expires
          }
        }
      }
    }
  }
`;

const Wizard = (props) => {
    const [state, updateState] = useState({
        form: {},
         outSideControls: false,
    });

    const updateForm = (key, value) => {
        const { form } = state;

        form[key] = value;
        updateState({
            ...state,
            form,
        });
    };

    // Do something on step change
    const onStepChange = (stats) => {
        //console.log(stats);
    };

    const setInstance = SW => updateState({
        ...state,
        SW,
    });

    const slides = [First, Second, Third, Fourth, Fifth, Last];

    return (
        <div className='container'>
            <div className={'jumbotron mt-4'}>
                <div className='row'>
                    <div className={`col-12 col-sm-6 offset-sm-3 rsw-wrapper`}>
                        <StepWizard
                            onStepChange={onStepChange}
                            isHashEnabled
                            instance={setInstance}
                        >
                            {slides.map((Slide, key) => (<Slide hashKey={key} key={key} form={state.form} update={updateForm} steamUser={props.steamUser} />))}
                        </StepWizard>
                    </div>
                </div>
            </div>
        </div>
    );
};


const Stats = ({
    nextStep,
    previousStep,
    totalSteps,
    step,
}) => (
    <div>
        <hr />
        {(step === 4 || step === 5) &&
            <AdvancedModal isOpen={false}>
            {(modal) => (
              <>
                <a
                  href="/test"
                  onClick={(e) => {
                    e.preventDefault();
                    modal.open();
                  }}
                >
                <button className='mt-2 mb-2 btn btn-danger btn-block'>Get Unlisted From SCBL</button>
                </a>
                <Modal
                  className="modal-dialog-centered"
                  isOpen={modal.isOpen}
                  toggle={modal.close}
                >
                  <ModalHeader toggle={modal.close}>How to get unlisted?</ModalHeader>
                  <ModalBody className="text-center">
                    <h3 className='text-primary'>Squad Community Ban List</h3>
                    <h6 className="mt-4">Appeal Information</h6>
                    <p>
                      The Squad Community Ban List does <strong>not</strong> and <strong>can't</strong> handle
                      ban appeals on behalf of partner organisations. To get a ban
                      removed from our list you need to <strong>contact each server directly</strong> and ask them to <strong>remove</strong> their ban from BattleMetrics.
                    </p>
                    <p>
                      <em>To find all server you were banned please search up yourself from our homepage and/or login with your steam account.</em>
                    </p>
                  </ModalBody>
                </Modal>
              </>
            )}
          </AdvancedModal>}
          {( step === 5) &&
            <AdvancedModal isOpen={false}>
            {(modal) => (
              <>
                <a
                  href="/test"
                  onClick={(e) => {
                    e.preventDefault();
                    modal.open();
                  }}
                >
                <button className='mt-2 mb-2 btn btn-info btn-block'>How does threshold work?</button>
                </a>
                <Modal
                  className="modal-dialog-centered"
                  isOpen={modal.isOpen}
                  toggle={modal.close}
                >
                  <ModalHeader toggle={modal.close}>How does the threshold ban system work?</ModalHeader>
                  <ModalBody className="text-center">
                    <h3 className='text-primary'>Squad Community Ban List</h3>
                    <p>
                    If you have been banned from a server as a result of the Squad Community Ban List then it means that the server uses one of our "export ban lists". Export ban lists use a configurable point system to calculate a player's reputation based on bans they already have on our partner organisation's servers. If a player's reputation exceeds a configured threshold (from 0 to 10) they will be added to the global ban list and will therefore be banned from the server. To get unbanned from the server you should appeal your existing bans so that your reputation decreasing and you fall below the threshold. You can use our Search function to find what bans you have and find links to the Discord where you may appeal the bans. Alternatively, you may request that the server reconfigures their export ban list to be more lenient or play on another server that already has a more lenient export ban list or does not use our export ban lists.</p>
                    <p>
                      <em>To find all server you were banned please search up yourself from our homepage and/or login with your steam account.</em>
                    </p>
                  </ModalBody>
                </Modal>
              </>
            )}
          </AdvancedModal>}
        {step === 2 &&
            <button className='btn btn-primary btn-block' onClick={nextStep}>Check Your Stats</button>
        }
        { (step < totalSteps && step !== 2) &&
            <button className='btn btn-primary btn-block' onClick={nextStep}>Continue</button>
        }
        { step > 1 &&
            <button className='btn btn-default btn-block' onClick={previousStep}>Go Back</button>
        }
        {step >= totalSteps &&
              <>
                <a
                  href="https://discord.gg/DjrpPuw"
                >
                <button className='mt-2 btn btn-secondary btn-block'>I still have questions!</button>
                </a>
              </>
        }
        {step >= totalSteps && 
            <>
              <a
                href="/"
              >
              <button className='mt-2 btn btn-success btn-block'>Finish!</button>
              </a>
            </>
      }
    </div>
);

const First = props => {
    return (
        <div>
        {props && props.steamUser === null && (
            <div className="text-center">
                <h3 className='text-center'>Welcome player! 👋</h3>
                <br />
            </div>
          )}

          {props && props.steamUser && (
            <div className="text-center">
                  <div className="avatar avatar-sm rounded-circle">
                    <img alt="..." src={props.steamUser.avatarFull} />
                  </div>
                  <h3>Welcome {props.steamUser.name}! 👋</h3>
                  <br />
            </div>
          )}
            <p className='text-center'>If you have found this page then it likely means that someone has directed you here because you are listed on or have been banned by the Squad Community Ban List.</p>
            <p className='text-center'>The following slides will gives you a little more information about what this means.</p>
            <p className='text-center'>We are keen to ensure that <strong>everyone</strong> can enjoy a healthy Squad community and therefore we are keen to allow reformed players to rejoin that community. However, we are limited by how much we can do to help you, as explained on the next slides.</p>
            <Stats step={1} {...props} />
        </div>
    );
};

const Second = props => {
    return (
        <div>
        <div className="text-center">
                <h3 className='text-center'>What is the Squad Community Ban List?</h3>
                <br />
                <p className='text-center'>The Squad Community Ban List is a third party <strong>monitoring</strong> application. We gather all the information we get from each partner organisations to a center place and share it with all of them.</p>
                <p className='text-center'>Emphasis that we deal in <strong>facts</strong> and not <em>opinions</em> and therefore we cannot change the data we display/bans we issue.</p>
            </div>
            <Stats step={2} {...props} />
        </div>
    );
};

const Third = props => {
    const activeBans = props.steamUser?.activeBans.edges.length;
    const expiredBans = props.steamUser?.expiredBans.edges.length;
    let history = useHistory();
    let link = "/search/"+props.steamUser?.id;
    const redirect = () => {
        history.push(link)
      }
    return (
        <div>
        <div className="text-center">
                <h3 className='text-center'>
                    {props && props.steamUser === null && (
                        <CardBody>
                        <div className="text-center mt-2 mb-2">Unknown Steam User</div>
                        <div className="text-center mt-2 mb-2">
                            We do not have this Steam user on record.
                        </div>
                        </CardBody>
                    )}
                    {props && props.steamUser && (
                        <div>
                        <img
                            alt={`${props.steamUser.name || props.steamUser.id}'s avatar`}
                            src={props.steamUser.avatarFull || steamAvatar}
                            width="184px"
                            className="rounded-circle mb-4"
                        />
                    </div>
                    )}
                    {(activeBans === 0 && expiredBans === 0) && (
                        <strong className="text-success">{props.steamUser?.name || 'Player'}, you are on the right path!</strong>
                    )}
                    {(activeBans === 0 && expiredBans !== 0) && (
                        <strong>{props.steamUser?.name || 'Player'}, <br />you have <span className='text-warning'>{props.steamUser?.expiredBans.edges.length} expired ban{(props.steamUser?.expiredBans.edges.length > 1) ? "s" : ""}</span>!</strong>
                    )}
                    {activeBans > 0 && (
                        <strong>{props.steamUser?.name || 'Player'}, <br /> you have <span className='text-warning'>{activeBans} active ban{(activeBans > 1) ? "s" : ""}</span> and <span className='text-warning'>{props.steamUser?.expiredBans.edges.length} expired ban{(props.steamUser?.expiredBans.edges.length > 1) ? "s" : ""}</span>!</strong>
                        )}
                </h3>
                {((activeBans > 0) || (expiredBans > 0)) ? <div className='text-center'>
                <button className='btn btn-default' onClick={redirect}>See details</button>
                </div> : ""}
                      {((activeBans === 0) && (expiredBans === 0)) && (
                        <span className='text-center'>
                            <strong className='text-center'>You don't have any ban on record.</strong>
                        </span>
                      )}
            </div>
            <Stats step={3} {...props} steamUser={props.steamUser} />
        </div>
    );
};

const Fourth = props => {
    const activeBans = props.steamUser?.activeBans.edges.length;
    const expiredBans = props.steamUser?.expiredBans.edges.length;
    return (
        <div>
        <div>
                <h3 className='text-center'>
                {props && props.steamUser === null && (
                    <CardBody>
                      <div className="text-center mt-2 mb-2">Please report this issue.</div>
                      <div className="text-center mt-2 mb-2">
                        We do not have this Steam user on record.
                      </div>
                    </CardBody>
                  )}
                  </h3>
                    {(activeBans === 0 && expiredBans === 0) && (
                        <div className='text-center text-success'>You are not banned, but in case you want to know how SCBL works, please keep reading. Otherwise you can just leave now.</div>
                    )}
                    {(activeBans === 0 && expiredBans !== 0) && (
                        <div className='text-center text-warning'>You have only expired ban(s) but we recommend you to continue with reading.</div>
                    )}
                  {activeBans > 0 && (
                    <div className='text-center text-danger'><strong>You have active ban(s) therefor we highly recommend you to continue with reading!</strong></div>
                    )}
                    <br />
                    <span>
                    <h5 className='text-center'><strong>You are listed at <br /><span className='text-primary'>Squad Community Ban List</span>, <br />what now?</strong></h5>
                        <div className='ml-3'>When you are joining a partner organisation you may get targeted by the active admins/owners, which means every movement you do will be supervised by them and they will be, probably, ready to ban you, <strong>if you don't follow their rules</strong>. <br /><br /><strong>Disclaimer: </strong><em>As SCBL we can't edit your ban/status at SCBL. We can only recommend you to read the rules of the servers before joining them. <br />In case you have active bans you need to contact the server you are banned and not us, since we don't act as a middleman.</em></div>
                    </span>
            </div>
            <Stats step={4} {...props} steamUser={props.steamUser} />
        </div>
    );
};

const Fifth = props => {
    const activeBans = props.steamUser?.activeBans.edges.length;
    const expiredBans = props.steamUser?.expiredBans.edges.length;
    return (
        <div>
        <div>
                <h3 className='text-center'>
                {props && props.steamUser === null && (
                    <CardBody>
                      <div className="text-center mt-2 mb-2">Please report this issue.</div>
                      <div className="text-center mt-2 mb-2">
                        We do not have this Steam user on record.
                      </div>
                    </CardBody>
                  )}
                  </h3>
                    {(activeBans === 0 && expiredBans === 0) && (
                        <div className='text-center text-success'>You are not banned, but in case you want to know how SCBL works, please keep reading. Otherwise you can just leave now.</div>
                    )}
                    {(activeBans === 0 && expiredBans !== 0) && (
                        <div className='text-center text-warning'>You have only expired ban(s) but we recommend you to continue with reading.</div>
                    )}
                  {activeBans > 0 && (
                    <div className='text-center text-danger'><strong>You have active ban(s) therefor we highly recommend you to continue with reading!</strong></div>
                    )}
                    <br />
                    <span>
                    <h5 className='text-center'><strong>You are global banned at <br /><span className='text-primary'>Squad Community Ban List</span>, <br />what now?</strong></h5>
                        <div className='ml-3'>When you are joining a partner organisation you may get <strong>auto-kicked</strong> with a message saying you are banned by <span className='text-primary'>Squad Community Ban List</span>. This means you passed the <strong>threshold</strong> limit of that server you joined.<br /> <br />If you want to lower your threshold you need to contact the servers you are already banned from and ask for an appeal. An alternative way would be waiting for the grace period of that server. A server owner can put a time limit, for example 365 days, and that way your bans that proceed those limits will not be count at their threshold limit and you may be able to join the server back after a while. <br /><br /><strong>Disclaimer: </strong><em>As SCBL we can't edit your ban/status at SCBL. We can only recommend you to read the rules of the servers before joining them. <br />In case you have active bans you need to contact the server you are banned and not us, since we don't act as a middleman.</em></div>
                    </span>
            </div>
            <Stats step={5} {...props} steamUser={props.steamUser} />
        </div>
    );
};


const Last = (props) => {

    return (
        <div>
            <div className={'text-center'}>
                <h3>You are done!</h3>
                <hr />
                <p>We hope the previous shared information helps you resolve your issues.</p>
                <p>If this is not the case please do contact us from our Discord server.</p>
            </div>
            <Stats step={6} {...props} />
        </div>
    );
};


export default function (props) {
    const search = props.match.params.uid;
    let isRedirected = false;
    if(!search) {
        isRedirected = true;
    }
    const isValidSteam64ID = search && search.match(/^[0-9]{17}$/);

    const {data} = isValidSteam64ID
    ? useQuery(GET_PLAYER, { variables: { id: search } })
    : { data: null };

  return (
    <Layout>
      <section className="section section-lg pt-lg-0 mt--200">
        <Container>
          <Card className="shadow border-0">
            <CardBody className="pt-5 pb-2 border-bottom">
              <div className="icon icon-shape bg-gradient-warning rounded-circle text-white mb-4">
                <i className="fa fa-life-ring" />
              </div>
              <h6 className="text-warning text-uppercase">I'm banned, what now?</h6>
              <p className="description mt-2">
              An information guide to the Squad Community Ban List intended for players.
              </p>
            </CardBody>
            <div style={{ display: 'none' }}>
                <AdvancedModal isOpen={isRedirected}>
                   {(modal) => (
                     <>
                       <a
                         href="/test"
                         onClick={(e) => {
                           e.preventDefault();
                           modal.open();
                         }}
                       >
                       <button className='mt-2 mb-2 btn btn-info btn-block'>How does threshold work?</button>
                       </a>
                       <Modal
                         className="modal-dialog-centered"
                         isOpen={modal.isOpen}
                         toggle={modal.close}
                       >
                         <ModalHeader>Fill in your Steam64ID!</ModalHeader>
                         <ModalBody className="text-center">
                           <h3 className='text-primary'>Your Steam64ID:</h3>
                           <SteamUserSearchBox uid={props.match.params.uid} />
                           <p><small>You can find yours <a href='https://steamidfinder.com/lookup/' target='_blank' rel='noreferrer'>here</a>.</small></p>
                         </ModalBody>
                       </Modal>
                     </>
                   )}
                 </AdvancedModal>
                 </div>
            <Wizard steamUser={data?.steamUser} >
            </Wizard>
          </Card>
        </Container>
      </section>
    </Layout>
  );
}
