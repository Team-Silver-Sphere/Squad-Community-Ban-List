import React from 'react';

import { calculateRiskRating } from 'scbl-lib/utils';

export default function (props) {
  const riskRating = calculateRiskRating(props.points);

  let colour;
  if (riskRating >= 6.6) colour = 'text-danger';
  else if (riskRating >= 3.3) colour = 'text-warning';
  else colour = 'text-success';

  return (
    <>
      <span className={colour}>{riskRating}</span>
      <small className="text-muted"> / 10</small>
    </>
  );
}
