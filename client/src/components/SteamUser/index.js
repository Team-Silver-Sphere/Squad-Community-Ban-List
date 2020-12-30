import React from 'react';
import { Link } from 'react-router-dom';
import { Media } from 'reactstrap';

import steamAvatar from '../../assets/img/misc/avatar.jpg';

export default function (props) {
  return (
    <Link to={`/search/${props.steamUser.id}`}>
      <Media className="align-items-center">
        <span className="avatar avatar-sm rounded-circle">
          <img alt="..." src={props.steamUser.avatar || steamAvatar} />
        </span>
        <Media className="ml-2">
          <span className="mb-0 text-sm font-weight-bold">
            {props.steamUser.name || props.steamUser.id}
          </span>
        </Media>
      </Media>
    </Link>
  );
}
