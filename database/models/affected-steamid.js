import mongoose from 'mongoose';

const AffectedSteamID = new mongoose.Schema({
  steamID: { type: String, require: true },
  affectedAt: { type: Date, default: Date.now }
});

export default mongoose.model('AffectedSteamID', AffectedSteamID);
