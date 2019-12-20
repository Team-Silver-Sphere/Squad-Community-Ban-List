import mongoose from 'mongoose';

const ExportBanListSchema = new mongoose.Schema({
  owner: { type: String, require: true },
  lastFetched: { type: String, require: true, default: Date.now },

  name: { type: String, require: true },
  config: { type: String, require: true }
});

export default mongoose.model('ExportBanList', ExportBanListSchema);
