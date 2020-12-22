import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Input } from 'reactstrap';

const GET_BAN_LISTS = gql`
  query GetBanLists {
    banLists {
      id
      name

      organisation {
        id
        name
      }
    }
  }
`;

export default function (props) {
  const { loading, error, data } = useQuery(GET_BAN_LISTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <Input type="select" {...props}>
      <option value={null}>Select a ban list...</option>
      {data.banLists.map((banList, key) => (
        <option value={banList.id} key={key}>
          {banList.organisation.name}'s {banList.name}
        </option>
      ))}
    </Input>
  );
}
