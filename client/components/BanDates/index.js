import FormattedDate from '../FormattedDate/index.js';

export default function BanDates(props) {
  return (
    <>
      <i className="fa fa-clock" title="Banned on" /> <FormattedDate date={props.created} /> <br />
      <i className="fa fa-hourglass-start" title="Banned until" />{' '}
      {props.expires ? <FormattedDate date={props.expires} /> : 'Permanent Ban'}
    </>
  );
}
