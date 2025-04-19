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

  // ✅ New Shared Fields
  gender: {
    type: String,
    enum: ['male', 'female', 'others', 'prefer not to say'],
  },
  dateOfBirth: { type: Date },

  education: [{
    institution: String,
    degree: String,
    fieldOfStudy: String,
    startYear: Number,
    endYear: Number,
  }],

  awardsAndCertifications: [{
    title: String,
    issuer: String,
    year: Number,
    credentialUrl: String,
    imageUrl: String, // 📸 Certification image URL
  }],

  projects: [{
    name: String,
    description: String,
    link: String,
    techStack: [String],
    imageUrl: String, // 📸 Project screenshot or cover photo
  }],

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

  // Updated Business Details with Job References
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
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    jobs: [
      {
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' }, // Reference to a Job model
        title: { type: String },
        description: { type: String },
        location: { type: String },
        applyLink: { type: String },
      }
    ]
  },

  // Mentor-specific Details
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
