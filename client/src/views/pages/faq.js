import React from 'react';
import { Link } from 'react-router-dom';
import md5 from 'md5';

import { Card, CardBody, Container } from 'reactstrap';

import { DISCORD_INVITE } from 'scbl-lib/config';

import Layout from '../layout/layout.js';

const sections = [
  {
    name: 'Squad Community Ban List Basics',
    questions: [
      {
        question: 'What is the Squad Community Ban List?',
        answer: (
          <>
            The Squad Community Ban List is a community-led project that aims to protect the Squad
            community's integrity through collaboration and information sharing. It does this by
            importing ban information from various popular Squad servers, known as our partner
            organisations, into a database and providing functionality to search and export the data
            or aggregations of the data in a number of different formats. The project is lead by
            Tommy but its development has been contributed to by other members of the community. The
            project is not affiliated with Offworld Industries.
          </>
        )
      },
      {
        question: 'How often is the Squad Community Ban List updated?',
        answer: (
          <>
            The Squad Community Ban List updates automatically every 6 hours, however, some
            information is updated less frequently. Steam user profile information is updated every
            7 days or when we import new or updated bans belonging to that user.
          </>
        )
      },
      {
        question: 'What are "reputation points"?',
        answer: (
          <>
            "Points" is a term you will frequently hear in reference to the Squad Community Ban
            List. Points are used to represent how bad a reputation a player has based on bans they
            have on our partner organisation's ban lists. By default, active and expired bans will
            contribute 3 and 1 points respectively. Only one active ban per ban list is counted.
          </>
        )
      },
      {
        question: 'What is a "risk rating"?',
        answer: (
          <>
            "Risk rating" is 0-10 rating of how much of a risk of harming the Squad community's
            integrity a player is. The algorithm used to calculate the "risk rating" is still
            experimental and is subject to change.
          </>
        )
      },
      {
        question: 'What is a "risk ranking"?',
        answer: (
          <>
            "Risk ranking" is a ranking of players most at risk of harming the Squad community's
            integrity. It is based on player's reputation points where rank #1 is the player with
            the most reputation points and therefore the most likely to harm the Squad community's
            integrity.
          </>
        )
      },
      {
        question: 'How are ban reasons assigned?',
        answer: (
          <>
            The Squad Community Ban List assigns ban reasons to one or more categorises based on
            keywords/phrases found in the ban reasons assigned by our partner organisations. We do
            this to ensure they are easily read and analysed, consistent, professional and to
            protect any confidential information. Our keywords and phrases are not perfect so there
            may be a small number of scenarios where ban reasons are incorrectly categorised.
          </>
        )
      }
    ]
  },
  {
    name: 'Getting Unbanned',
    questions: [
      {
        question:
          'I have been banned from a server as a result of the Squad Community Ban List, what can I do?',
        answer: (
          <>
            If you have been banned from a server as a result of the Squad Community Ban List then
            it means that the server uses one of our "export ban lists". Export ban lists use a
            configurable point system to calculate a player's reputation based on bans they already
            have on our partner organisation's servers. If a player's reputation exceeds a
            configured threshold they will be added to the export ban list and will therefore be
            banned from the server. To get unbanned from the server you should appeal your existing
            bans so that your reputation decreasing and you fall below the threshold. You can use
            our <Link to="/search">Search</Link> function to find what bans you have and find links
            to the Discord where you may appeal the bans. Alternatively, you may request that the
            server reconfigures their export ban list to be more lenient or play on another server
            that already has a more lenient export ban list or does not use our export ban lists.
          </>
        )
      },
      {
        question:
          "I have appealed one of my bans with one of your partner organisations but they won't unban me. Can you unban me?",
        answer: (
          <>
            The Squad Community Ban List provides information on the bans players have on our
            partner organisations but not whether these bans are valid. If one of our partner
            organisations refuses to remove one of your bans then we will continue to communicate
            the existence of the ban to our users. If you believe that your ban is in breach of the
            Official Squad Administrator Guidelines then you could file a report with Offworld
            Industries.
          </>
        )
      }
    ]
  },
  {
    name: 'Export Ban Lists',
    questions: [
      {
        question: 'How are export ban lists configured?',
        answer: (
          <>
            Export ban lists use a point system to calculate which players should be listed on the
            export ban list. Points are used to represent how bad a reputation a player has based on
            bans they have on our partner organisation's ban lists. By default, active and expired
            bans will contribute 3 and 1 points respectively, however, users can configure these
            values when creating their export ban lists. Furthermore, users can set these values
            individually for each of our partner organisations' ban lists. Only one active ban per
            ban list is counted. Once the number of points a player has exceeds the threshold set in
            the export ban list's configuration they are added to the export ban list.
          </>
        )
      },
      {
        question: 'Why am I limited to only 4 export ban lists?',
        answer: (
          <>
            The more export ban lists we host the longer it takes for them to be updated when new or
            changed information is imported from our partner organisations. Therefore, to ensure
            export ban lists are updated within a reasonable time we limit the number of export ban
            lists each user can create to 4.
          </>
        )
      }
    ]
  }
];

export default function () {
  return (
    <Layout>
      <section className="section section-lg pt-lg-0 mt--200">
        <Container>
          <Card className="shadow border-0">
            <CardBody className="pt-5 pb-2 border-bottom">
              <div className="icon icon-shape bg-gradient-primary rounded-circle text-white mb-4">
                <i className="fa fa-question-circle" />
              </div>
              <h6 className="text-primary text-uppercase">Frequently Asked Questions</h6>
              <p className="description mt-2">
                If you can't find what you search, please join our{' '}
                <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
                  Discord
                </a>{' '}
                server.
              </p>
            </CardBody>
            {sections.map((section, sectionKey) => (
              <CardBody className="border-bottom" key={sectionKey}>
                <h4 className="text-center">{section.name}</h4>
                {section.questions.map((question, questionKey) => {
                  const hash = md5(question.question);

                  return (
                    <div key={questionKey}>
                      <a href={`#${hash}`}>
                        <h6 id={hash}>
                          <span className="font-weight-bold">Q: </span>
                          {question.question}
                        </h6>
                      </a>
                      <p className="ml-4">
                        <span className="font-weight-bold">A: </span>
                        {question.answer}
                      </p>
                    </div>
                  );
                })}
              </CardBody>
            ))}
          </Card>
        </Container>
      </section>
    </Layout>
  );
}
