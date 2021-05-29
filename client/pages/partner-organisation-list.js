import { gql, useQuery } from '@apollo/client';
import { NextSeo } from 'next-seo';
import { Card, CardBody, Container, Table } from 'reactstrap';

import RegularBanner from '../components/RegularBanner/index.js';

import { initializeApollo } from '../lib/apollo-client.js';

const GET_PARTNER_ORGANISATIONS = gql`
  query GET_PARTNER_ORGANISATIONS {
    organisations {
      id
      name
      discord
      banLists {
        id
        name
      }
    }
  }
`;

export async function getServerSideProps() {
  const apolloClient = initializeApollo();
  await apolloClient.query({ query: GET_PARTNER_ORGANISATIONS });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    }
  };
}

export default function Search() {
  const { loading, error, data } = useQuery(GET_PARTNER_ORGANISATIONS);

  return (
    <>
      <NextSeo
        title="Search | Squad Community Ban List"
        description="Search our database containing over 32,000 bans and 24,000 players."
      />
      <RegularBanner />
      <section className="section section-lg pt-lg-0 mt--200">
        <Container>
          <Card className="shadow border-0">
            <CardBody className="pt-5 pb-2 border-bottom">
              <div className="icon icon-shape bg-gradient-warning rounded-circle text-white mb-4">
                <i className="fa fa-question-circle" />
              </div>
              <h6 className="text-warning text-uppercase">Partner Organisation List</h6>
              <p className="description mt-2">
                View a list of our partner organisations and their ban lists.
              </p>
            </CardBody>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th>Organisation</th>
                  <th>Ban List</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={2} className="text-center">
                      <div className="text-center mt-2 mb-3">Loading...</div>
                      <div className="btn-wrapper text-center">
                        <i className="fas fa-circle-notch fa-spin fa-4x" />
                      </div>
                    </td>
                  </tr>
                )}
                {error && (
                  <tr>
                    <td colSpan={2} className="text-center">
                      <div className="text-center mt-2 mb-2">Error!</div>
                      <div className="btn-wrapper text-center">
                        <i className="fas fa-exclamation-triangle fa-4x" />
                      </div>
                      <div className="text-center mt-2 mb-2">Something went wrong. Sad times.</div>
                    </td>
                  </tr>
                )}
                {data &&
                  data.organisations.map((organisation, key) => (
                    <tr key={key}>
                      <td>
                        <a href={organisation.discord} target="_blank" rel="noopener noreferrer">
                          {organisation.name}
                        </a>
                      </td>
                      <td>{organisation.banLists.map((banList) => banList.name).join(', ')}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Card>
        </Container>
      </section>
    </>
  );
}
