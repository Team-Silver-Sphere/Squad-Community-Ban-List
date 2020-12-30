import React from 'react';
import { gql, useMutation } from '@apollo/client';

import { ErrorModal, LoadingModal } from '../';

import Form from './form';

const CREATE_EXPORT_BAN_LIST_CONFIG = gql`
  mutation CreateExportBanListConfig(
    $exportBanList: Int!
    $banList: Int!
    $activePoints: Int!
    $expiredPoints: Int!
  ) {
    createExportBanListConfig(
      exportBanList: $exportBanList
      banList: $banList
      activePoints: $activePoints
      expiredPoints: $expiredPoints
    ) {
      id
      activePoints
      expiredPoints

      exportBanList {
        id
        name
      }
    }
  }
`;

function addToCache(cache, { data: { createExportBanListConfig } }) {
  cache.modify({
    id: cache.identify(createExportBanListConfig.exportBanList),
    fields: {
      exportBanListConfigs(exportBanListConfigs = [], { readField }) {
        const newExportBanListConfig = cache.writeFragment({
          data: createExportBanListConfig,
          fragment: gql`
            fragment NewExportBanListConfig on ExportBanListConfig {
              id
              activePoints
              expiredPoints

              exportBanList {
                id
                name
              }
            }
          `
        });

        if (
          exportBanListConfigs.some((ref) => readField('id', ref) === createExportBanListConfig.id)
        )
          return exportBanListConfigs;

        return [...exportBanListConfigs, newExportBanListConfig];
      }
    }
  });
}

export default function (props) {
  const [createExportBanListConfig, { loading, error }] = useMutation(
    CREATE_EXPORT_BAN_LIST_CONFIG,
    { update: addToCache }
  );

  return (
    <>
      {loading && <LoadingModal />}
      {error && <ErrorModal errors={error.graphQLErrors} />}
      <Form
        {...props}
        onSubmit={async (data) => {
          await createExportBanListConfig({
            variables: { ...data, exportBanList: props.exportBanListID }
          });
        }}
      />
    </>
  );
}
