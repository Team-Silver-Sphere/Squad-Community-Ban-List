const reasons = {
  Teamkilling: /teamkill|\btk(?:ing|s)?\b/i,

  Trolling: /troll/i,
  Griefing: /grief/i,
  'Wasting Assets': /wasting assets|destroying assets|wasting resources/i,
  'Soloing Vehicles': /solo/i,

  Ghosting: /ghosting/i,

  Camping: /camping/i,

  Toxic: /toxic/i,
  Racism: /racism|racist|racial/i,
  Hatespeach: /hate ?speach|derogatory/i,
  Sexism: /sexism/i,

  Recruiting: /recruiting/i,

  Cheating: /cheats|cheating|hacking/i,
  Glitching: /glitching/i,
  Exploiting: /exploiting/i
};

export default function(reason) {
  const classifiedReasons = [];

  for (const [type, regex] of Object.entries(reasons)) {
    if (regex.test(reason)) classifiedReasons.push(type);
  }

  return classifiedReasons;
}
