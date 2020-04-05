import mongoose from 'mongoose';

const Organization = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },

  contact: {
    type: String,
    require: true
  },

  appeal: {
    type: String,
    require: true
  },

  official: {
    type: Boolean,
    require: true,
    default: false
  }
});

export default mongoose.model('Organization', Organization);
