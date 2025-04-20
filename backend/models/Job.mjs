import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  applyLink: { type: String },
  salary: { type: String },         
  type: { type: String },           
  subject: { type: String },       
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);
