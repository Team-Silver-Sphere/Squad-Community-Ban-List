import mongoose from 'mongoose';

const ExportBanListSchema = new mongoose.Schema({
  name: { type: String, require: true },
  config: { type: String, require: true },
  owner: { type: String, require: true },

  battlemetricsStatus: {
    type: String,
    enum: ['disabled', 'queued', 'deleted', 'queued-errored', 'deleted-error'],
    require: true,
    default: 'disabled'
  },
  battlemetricsID: { type: String },
  battlemetricsInvite: { type: String },

  lastFetched: { type: Date, require: true, default: Date.now },

  generatorStatus: {
    type: String,
    enum: ['queued', 'completed', 'errored'],
    require: true,
    default: 'queued'
  }
});

export default mongoose.model('ExportBanList', ExportBanListSchema);
