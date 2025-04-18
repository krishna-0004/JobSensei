import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true },

  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address.']
  },
  avatar: { type: String },
  bio: { type: String },
  location: { type: String },
  phone: { 
    type: String,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number.']
  },
  skills: [{ type: String }],

  role: {
    type: String,
    enum: ['intan', 'recruiter', 'mentor', 'admin'],
    default: 'intan',
  },
  isVerified: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
  profileCompleted: { type: Boolean, default: false },

  verificationCode: { type: String },
  verificationStatus: {
    type: String,
    enum: ['pending', 'submitted', 'verified', 'rejected'],
    default: 'pending',
  },
  rejectionReason: { type: String },

  businessDetails: {
    companyName: { type: String },
    website: { type: String },
    registrationId: { type: String },
    industry: { type: String },
    companySize: { type: String },
    businessEmail: { type: String },
    address: { type: String },
    pitchDeckUrl: { type: String },
    isBusinessSubmitted: { type: Boolean, default: false },
  },

  mentorDetails: {
    expertise: [{ type: String }],
    linkedIn: { type: String },
    experienceYears: { type: Number },
    currentPosition: { type: String },
    company: { type: String },
    certifications: [{ type: String }],
    portfolioUrl: { type: String },
    isMentorSubmitted: { type: Boolean, default: false },
  },

  adminNotes: { type: String }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
