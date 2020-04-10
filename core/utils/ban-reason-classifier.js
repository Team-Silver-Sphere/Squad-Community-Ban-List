const reasons = {
  Cheating: /cheats|cheating|hacking/i,
  Glitching: /glitching/i,
  Exploiting: /exploiting/i,

  Teamkilling: /teamkill|\btk(?:ing|s)?\b/i,
  Trolling: /troll/i,
  Griefing: /grief/i,
  'Wasting Assets': /wasting assets|destroying assets|wasting resources/i,
  Ghosting: /ghosting/i,

  Toxic: /toxic/i,
  Hatespeach: /hate ?speach|derogatory|racism|racist|racial|sexism|homophobic/i,

  'Soloing Vehicles': /solo/i,
  Camping: /camping/i,
  Recruiting: /recruiting/i
};

export default function(reason) {
  const classifiedReasons = [];

  for (const [type, regex] of Object.entries(reasons)) {
    if (regex.test(reason)) classifiedReasons.push(type);
  }

  return classifiedReasons;
}
