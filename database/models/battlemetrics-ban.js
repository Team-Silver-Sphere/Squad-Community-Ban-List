import mongoose from 'mongoose';

const BattleMetricsBan = new mongoose.Schema({
  id: { type: String, require: true },
  uid: { type: String, require: true },
  timestamp: { type: Date, require: true },
  expires: { type: Date },
  reason: { type: String },
  note: { type: String },

  steamID: { type: String, require: true },

  importID: { type: Number, require: true },
  lastImported: { type: Date, default: Date.now }
});

export default mongoose.model('BattleMetricsBan', BattleMetricsBan);
