import mongoose from 'mongoose';

const Ban = new mongoose.Schema({
  steamID: {
    type: String,
    required: true
  },

  created: {
    type: Date
  },

  expires: {
    type: Date
  },

  expired: {
    type: Boolean
  },

  reason: [
    {
      type: String
    }
  ],

  // optional way to id the ban during import
  uid: {
    type: String
  },

  banList: {
    type: mongoose.Types.ObjectId,
    ref: 'BanList',
    required: true
  }
});

export default mongoose.model('Ban', Ban);
