const reasons = {
  Cheating: /cheating|cheats|hacking/i,
  Glitching: /glitching/i,
  Exploiting: /exploiting/i,

  Teamkilling: /team ?kill|\btk(?:ing|s)?\b/i,
  Trolling: /troll/i,
  Griefing: /grief/i,
  'Wasting Assets': /destroying assets|wasting assets|wasting resources/i,
  Ghosting: /ghosting/i,

  Toxic: /toxic/i,
  'Hate Speech': /abusive language|bigot|derogatory|discriminat|hate ?spe(e|a)ch|homophobic|racial|racism|racist|sexism/i,

  Camping: /camping/i,
  'Helicopter Ramming': /heli ram/i,
  Recruiting: /recruiting/i,
  'Soloing Vehicles': /solo/i
};

export default function (reason) {
  const classifiedReasons = [];

  for (const [type, regex] of Object.entries(reasons)) {
    if (regex.test(reason)) classifiedReasons.push(type);
  }

  return classifiedReasons.length > 0 ? classifiedReasons.join(', ') : 'Unknown';
}
