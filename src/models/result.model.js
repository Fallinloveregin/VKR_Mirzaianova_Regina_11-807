import mongoose, { Schema } from 'mongoose';

const Result = mongoose.model(
  'Result',
  new mongoose.Schema({
    user_id: String,
    duration: String,
    date: String,
    year: String,
    yearMonth: String,
    time: String,
    timestamp: Number,
    name: String,
    result: Schema.Types.Mixed
  })
);

export default Result;
