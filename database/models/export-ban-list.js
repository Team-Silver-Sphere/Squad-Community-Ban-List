import mongoose from 'mongoose';

const ExportBanListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  config: {
    type: String,
    required: true
  },

  owner: {
    type: String,
    required: true
  },

  generatorStatus: {
    type: String,
    enum: ['queued', 'completed', 'errored'],
    require: true,
    default: 'queued'
  },

  battlemetricsStatus: {
    type: String,
    enum: ['disabled', 'queued', 'deleted', 'queued-errored', 'deleted-error'],
    required: true,
    default: 'disabled'
  },

  battlemetricsID: {
    type: String
  },
  battlemetricsInvite: {
    type: String
  }
});

export default mongoose.model('ExportBanList', ExportBanListSchema);
