import mongoose from 'mongoose';

const AffectedSteamID = new mongoose.Schema({
  steamID: { type: String, require: true },
  affectedAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['queued', 'errored'],
    require: true,
    default: 'queued'
  }
});

export default mongoose.model('AffectedSteamID', AffectedSteamID);
