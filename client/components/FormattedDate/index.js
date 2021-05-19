const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
};

export default function FormattedDate(props) {
  return <>{new Date(props.date).toLocaleDateString(undefined, options)}</>;
}
