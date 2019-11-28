import mongoose from 'mongoose';

import mongoDB from 'core/config/database';

export default function () {
  return mongoose.connect(
    mongoDB,
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  );
}