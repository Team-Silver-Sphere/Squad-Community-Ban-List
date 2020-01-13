import mongoose from 'mongoose';

const ExportBanSchema = new mongoose.Schema({
  steamID: { type: String, require: true },
  exportBanList: {
    type: mongoose.Types.ObjectId,
    ref: 'ExportBanList',
    require: true
  }
});

export default mongoose.model('ExportBan', ExportBanSchema);
