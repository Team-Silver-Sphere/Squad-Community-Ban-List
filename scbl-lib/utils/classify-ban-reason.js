const reasons = {
  Cheating: /cheat|hack|作弊|\bhile|trich|betr(ü|u)/i,
  Glitching: /glitch/i,
  Exploiting: /exploit|剝削|istismar|ausnutz/i,

  Teamkilling: /team ?kill|\btk/i,
  Trolling: /troll/i,
  Griefing: /grief/i,
  'Wasting Assets': /destroying assets|wast(e|ing)|taxi|israf/i,
  Ghosting: /ghosting/i,

  Toxic: /disrespect|flam(e|ing)|harass|insult|language|offensive|rude|toxic|sayg(i|ı)s(i|ı)z|hakaret|irrespect|respektlos|beleidigung/i,
  'Abusive Language/Hate Speech': /abusive|bigot|derogatory|discriminat|hate ?spe(e|a)ch|homophobi(c|a)|nazi|racial|racism|racist|sexism|sexist|(küfür|kufur)|mal(é|e)diction|種族主義|fluchen/i,

  AFK: /afk|unassigned/i,
  'Breaking Seeding Rules': /seed/i,
  'Breaking Vehicle Priority Rules': /priority|(ara(ç|c) (kural|ihlali))/i,
  Camping: /camping/i,
  'Current or Recent VAC Ban': /vac ban/i,
  'Destroying Friendly Assets': /(friendly|dost) (asset|fob|hab)|sabotage/i,
  'Discussing politics': /politic|siyaset/i,
  'Helicopter Ramming': /ramming/i,
  Hindering: /hindering/i,
  Impersonation: /impersonat/i,
  'Locked Squad': /locked squad/i,
  'No SL Kit': /sl kit/i,
  Recruiting: /recruiting/i,
  'Soloing Vehicles': /crewman|manning|solo/i,
  Spamming: /spam/i,
  'Squad Baiting': /baiting|creat(?:ed?|ing)(?: a)? squad|pass sl/i,
  'Stealing Assets': /steal|çalma/i,
  Streamsniping: /streamsniping|yayinc(i|ı)/i
};

export default function (reason) {
  const classifiedReasons = [];

  for (const [type, regex] of Object.entries(reasons)) {
    if (regex.test(reason)) classifiedReasons.push(type);
  }

  classifiedReasons.sort();

  return classifiedReasons.length > 0 ? classifiedReasons.join(', ') : 'Unknown';
}
