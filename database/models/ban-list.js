import mongoose from 'mongoose';

const BanList = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },

  type: {
    type: String,
    require: true
  },

  source: {
    type: String,
    require: true
  },

  lastImported: {
    type: Date,
    default: new Date(0),
    required: true
  },

  importStatus: {
    type: String,
    enum: ['queued', 'errored'],
    required: true,
    default: 'queued'
  },

  organization: {
    type: mongoose.Types.ObjectId,
    ref: 'Organization',
    require: true
  }
});

export default mongoose.model('BanList', BanList);
