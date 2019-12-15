import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import { Input } from 'reactstrap';

const query = gql`
  query {
    organizations {
      _id
      name
    }
  }
`;

export { query };

export default function(props) {
  return (
    <Input
      type="select"
      onChange={props.onChange}
      value={props.selectedOrganization || 'Select an Organization...'}
    >
      <Query query={query} onError={() => {}}>
        {({ loading, error, data }) => {
          if (loading) return (
            <option className="text-default" value={'Loading...'}>Loading...</option>
          );

          if (error) return (
            <option className="text-default" value={'Error...'}>Error...</option>
          );

          return (
            <>
              <option className="text-default" value={'Select an Organization...'}>Select an Organization...</option>
              {
                data.organizations.map((organization, key) => (
                  <option
                    className="text-default"
                    value={organization._id}
                    key={key}
                  >
                    {organization.name}
                    </option>
                ))
              }
            </>
          );
        }}
      </Query>
    </Input>
  );
}
