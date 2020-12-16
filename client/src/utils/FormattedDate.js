import React from 'react';
const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};

export default function (props) {
  return <>{new Date(props.date).toLocaleDateString(undefined, options)}</>;
}
