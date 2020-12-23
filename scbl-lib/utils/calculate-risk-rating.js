const MAX = 9;

export default function (reputationPoints = 0) {
  return reputationPoints === 0 ? 0 : Math.min(Math.round((reputationPoints / MAX) * 100) / 10, 10);
}
