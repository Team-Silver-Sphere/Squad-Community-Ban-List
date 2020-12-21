import React from 'react';

import { FormattedDate } from '../';

export default function (props) {
  return (
    <>
      <i className="fa fa-clock" title="Banned on" /> <FormattedDate date={props.created} /> <br />
      <i className="fa fa-hourglass-start" title="Banned until" />{' '}
      {props.expires ? <FormattedDate date={props.expires} /> : 'Permanent Ban'}
    </>
  );
}
