import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  applyLink: { type: String },
  salary: { type: String },         // optional
  type: { type: String },           // optional: full-time, part-time, etc.
  subject: { type: String },        // optional
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);
