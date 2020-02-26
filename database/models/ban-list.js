import mongoose from 'mongoose';

const BanList = new mongoose.Schema({
  name: { type: String, require: true },
  type: { type: String, require: true },

  organization: {
    type: mongoose.Types.ObjectId,
    ref: 'Organization',
    require: true
  },

  importStatus: {
    type: String,
    enum: ['queued', 'errored'],
    require: true,
    default: 'queued'
  },
  lastImported: { type: Date, default: new Date(0), require: true },

  /* BattleMetrics Ban Info */
  battlemetricsID: { type: String, require: true }
});

export default mongoose.model('BanList', BanList);
