import mongoose from 'mongoose';

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    username: String,
    name: String,
    group: String,
    sex: String,
    birth: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
      }
    ]
  })
);

export default User;
