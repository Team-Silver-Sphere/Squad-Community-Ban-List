const reasons = {
  Teamkilling: /teamkill/i,
  Trolling: /trolling/i,
  Racism: /racism/i,
  Cheating: /cheating|hacking/i,
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
