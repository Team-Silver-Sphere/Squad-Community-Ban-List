import mongoose from 'mongoose';

const BattleMetricsBan = new mongoose.Schema({
  uid: { type: String, require: true },
  timestamp: { type: Date, require: true },
  expires: { type: Date },
  reason: { type: String },
  note: { type: String },

  steamID: { type: String, require: true },

  banList: {
    type: mongoose.Types.ObjectId,
    ref: 'BattleMetricsBanList',
    require: true
  }
});

export default mongoose.model('BattleMetricsBan', BattleMetricsBan);
