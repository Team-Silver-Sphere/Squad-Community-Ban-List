import React from 'react';

export default function (props) {
  let colour;
  if (props.riskRating >= 6.6) colour = 'text-danger';
  else if (props.riskRating >= 3.3) colour = 'text-warning';
  else colour = 'text-success';

  return (
    <>
      <span className={colour}>{props.riskRating}</span>
      <small className="text-muted"> / 10</small>
    </>
  );
}
