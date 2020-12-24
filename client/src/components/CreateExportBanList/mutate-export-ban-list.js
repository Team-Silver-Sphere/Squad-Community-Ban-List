import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Redirect } from 'react-router-dom';

import { ErrorModal, LoadingModal } from '../';

import Form from './form';

const CREATE_EXPORT_BAN_LIST = gql`
  mutation CreateExportBanList(
    $name: String!
    $server: String!
    $type: String!
    $threshold: Int!
    $defaultActivePoints: Int!
    $defaultExpiredPoints: Int!
  ) {
    createExportBanList(
      name: $name
      server: $server
      type: $type
      threshold: $threshold
      defaultActivePoints: $defaultActivePoints
      defaultExpiredPoints: $defaultExpiredPoints
    ) {
      id
      name
      server
      type
      threshold
      defaultActivePoints
      defaultExpiredPoints
    }
  }
`;

const UPDATE_EXPORT_BAN_LIST = gql`
  mutation UpdateExportBanList(
    $id: Int!
    $name: String!
    $server: String!
    $threshold: Int!
    $defaultActivePoints: Int!
    $defaultExpiredPoints: Int!
  ) {
    updateExportBanList(
      id: $id
      name: $name
      server: $server
      threshold: $threshold
      defaultActivePoints: $defaultActivePoints
      defaultExpiredPoints: $defaultExpiredPoints
    ) {
      id
      name
      server
      type
      threshold
      defaultActivePoints
      defaultExpiredPoints
    }
  }
`;

function addToCache(cache, { data: { createExportBanList } }) {
  cache.modify({
    fields: {
      loggedInSteamUser(loggedInSteamUser) {
        cache.modify({
          id: loggedInSteamUser.__ref,
          fields: {
            exportBanLists(exportBanLists = [], { readField }) {
              const newExportBanList = cache.writeFragment({
                data: createExportBanList,
                fragment: gql`
                  fragment NewExportBanList on ExportBanList {
                    id
                    name
                    server
                    type
                    threshold
                    defaultActivePoints
                    defaultExpiredPoints
                  }
                `
              });

              if (exportBanLists.some((ref) => readField('id', ref) === createExportBanList.id))
                return exportBanLists;

              return [...exportBanLists, newExportBanList];
            }
          }
        });

        return loggedInSteamUser;
      }
    }
  });
}

export default function (props) {
  const [mutateExportBanList, { loading, error, data }] = useMutation(
    props.exportBanList ? UPDATE_EXPORT_BAN_LIST : CREATE_EXPORT_BAN_LIST,
    {
      update: props.exportBanList ? undefined : addToCache
    }
  );

  if (!error && data && props.exportBanList) return <Redirect to="/export-ban-lists" />;
  if (!error && data && !props.exportBanList)
    return <Redirect to={`/export-ban-lists/${data.createExportBanList.id}`} />;

  return (
    <>
      {loading && <LoadingModal />}
      {error && <ErrorModal errors={error.graphQLErrors} />}
      <Form
        {...props}
        onSubmit={async (data) => {
          await mutateExportBanList({
            variables: props.exportBanList ? { ...data, id: props.exportBanList.id } : data
          });
        }}
      />
    </>
  );
}
