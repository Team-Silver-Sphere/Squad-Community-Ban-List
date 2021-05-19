import Link from 'next/link';
import { Media } from 'reactstrap';

export default function SteamUser(props) {
  return (
    <Link href={`/search/${props.steamUser.id}`} passHref>
      <Media className="align-items-center">
        <span className="avatar avatar-sm rounded-circle">
          <img alt="..." src={props.steamUser.avatar || '/img/misc/avatar.jpg'} />
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
