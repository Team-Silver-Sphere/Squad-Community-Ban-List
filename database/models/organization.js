import mongoose from 'mongoose';

const Organization = new mongoose.Schema({
  name: { type: String, require: true }
});

export default mongoose.model('Organization', Organization);
