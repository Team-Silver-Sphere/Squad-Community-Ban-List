const reasons = {
  Cheating: /cheat|hack/i,
  Glitching: /glitch/i,
  Exploiting: /exploit/i,

  Teamkilling: /team ?kill|\btk(?:ing|s)?\b/i,
  Trolling: /troll/i,
  Griefing: /grief/i,
  'Wasting Assets': /destroying assets|wast(e|ing)/i,
  Ghosting: /ghosting/i,

  Toxic: /flam(e|ing)|harass|insult|toxic/i,
  'Hate Speech': /abusive|bigot|derogatory|discriminat|hate ?spe(e|a)ch|homophobic|nazi|racial|racism|racist|sexism/i,

  'Breaking Seeding Rules': /seeding rules/i,
  Camping: /camping/i,
  'Current or Recent VAC Ban': /vac ban/i,
  'Helicopter Ramming': /heli ram/i,
  'Locked Squad': /locked squad/i,
  'No SL Kit': /sl kit/i,
  Recruiting: /recruiting/i,
  'Soloing Vehicles': /solo/i,
  'Stealing Assets': /steal/i
};

export default function (reason) {
  const classifiedReasons = [];

  for (const [type, regex] of Object.entries(reasons)) {
    if (regex.test(reason)) classifiedReasons.push(type);
  }

  return classifiedReasons.length > 0 ? classifiedReasons.join(', ') : 'Unknown';
}
