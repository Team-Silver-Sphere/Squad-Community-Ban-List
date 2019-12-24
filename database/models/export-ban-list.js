import mongoose from 'mongoose';

const ExportBanListSchema = new mongoose.Schema({
  name: { type: String, require: true },
  config: { type: String, require: true },
  owner: { type: String, require: true },
  lastFetched: { type: Date, require: true, default: Date.now },
  generated: { type: Boolean, require: true, default: false }
});

export default mongoose.model('ExportBanList', ExportBanListSchema);
