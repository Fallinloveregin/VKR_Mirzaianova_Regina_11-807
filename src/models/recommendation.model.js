import mongoose from 'mongoose';

const Recommendation = mongoose.model(
  'Recommendation',
  new mongoose.Schema({
    user_id: String,
    name: String,
    value: String
  })
);

export default Recommendation;
