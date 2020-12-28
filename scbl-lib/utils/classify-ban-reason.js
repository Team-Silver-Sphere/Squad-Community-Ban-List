const reasons = {
  Cheating: /cheat|hack/i,
  Glitching: /glitch/i,
  Exploiting: /exploit/i,

  Teamkilling: /team ?kill|\btk/i,
  Trolling: /troll/i,
  Griefing: /grief/i,
  'Wasting Assets': /destroying assets|wast(e|ing)|taxi/i,
  Ghosting: /ghosting/i,

  Toxic: /disrespect|flam(e|ing)|harass|insult|language|offensive|rude|toxic/i,
  'Hate Speech': /abusive|bigot|derogatory|discriminat|hate ?spe(e|a)ch|homophobic|nazi|racial|racism|racist|sexism|sexist/i,

  'AFK': /afk|unassigned/i,
  'Breaking Seeding Rules': /seed/i,
  'Breaking Vehicle Priority Rules': /priority/i,
  Camping: /camping/i,
  'Current or Recent VAC Ban': /vac ban/i,
  'Destroying Friendly Assets': /friendly (asset|fob|hab)/i,
  'Discussing politics': /politic/i,
  'Helicopter Ramming': /ramming/i,
  'Hindering': /hindering/i,
  'Impersonation': /impersonat/i,
  'Locked Squad': /locked squad/i,
  'No SL Kit': /sl kit/i,
  Recruiting: /recruiting/i,
  'Soloing Vehicles': /solo|manning/i,
  'Squad Baiting': /baiting|creat(?:ed?|ing)(?: a)? squad|pass sl/i,
  'Stealing Assets': /steal/i,
  'Streamsniping': /streamsniping/i
};

export default function (reason) {
  const classifiedReasons = [];

  for (const [type, regex] of Object.entries(reasons)) {
    if (regex.test(reason)) classifiedReasons.push(type);
  }

  return classifiedReasons.length > 0 ? classifiedReasons.join(', ') : 'Unknown';
}
