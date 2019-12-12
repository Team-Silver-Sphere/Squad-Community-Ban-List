import mongoose from 'mongoose';

const BattleMetricsBanList = new mongoose.Schema({
  id: { type: String, require: true },

  name: { type: String, require: true },

  lastImported: { type: Date, default: new Date(0), require: true },

  organization: {
    type: mongoose.Types.ObjectId,
    ref: 'Organization',
    require: true
  }
});

export default mongoose.model('BattleMetricsBanList', BattleMetricsBanList);
