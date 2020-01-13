import mongoose from 'mongoose';

const Ban = new mongoose.Schema({
  steamID: { type: String, require: true },

  banList: {
    type: mongoose.Types.ObjectId,
    ref: 'BanList',
    require: true
  },

  /* BattleMetrics Ban Info */
  battlemetricsUID: { type: String },
  battlemetricsTimestamp: { type: Date },
  battlemetricsExpires: { type: Date },
  battlemetricsExpired: { type: Boolean },
  battlemetricsReason: { type: String },
  battlemetricsNote: { type: String }
});

export default mongoose.model('Ban', Ban);
