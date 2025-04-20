import User from '../models/User.mjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';

export async function updateCommonInfo(req, res) {
  const { name, bio, location, phone, skills } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { name, bio, location, phone, skills },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Common info updated', user });

    setTimeout(() => {
      triggerFastAPIRecommendations(userId);
    }, 300);

  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function triggerFastAPIRecommendations(userId) {
  const courseURL = `https://error404-prabal-production.up.railway.app/recommend_courses/${userId}`;
  const jobURL = `https://error404-prabal-production.up.railway.app/recommend_jobs/${userId}`;

  try {
    const courseRes = await axios.get(courseURL, { responseType: 'text' });
    if (courseRes.data?.trim()) {
    } else {
      console.warn('Course API returned empty response for user:', userId);
    }
  } catch (err) {
    console.error('Course API error:', err.message);
    if (err.response?.data) {
      console.error('Course API response:', err.response.data);
    }
  }

  try {
    const jobRes = await axios.get(jobURL, { responseType: 'json' });
  } catch (err) {
    console.error('❌ Job API error:', err.message);
    if (err.response?.data) {
      console.error('Job API response:', err.response.data);
    }
  }
}

export const selectRole = async (req, res) => {
  try {
    const { role } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!['intan', 'mentor', 'recruiter'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role selected' });
    }

    user.role = role;
    if (role === 'intan') {
      user.profileCompleted = true;
    }

    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({ message: 'Role updated', user, token });
  } catch (err) {
    console.error('Role selection error:', err);
    res.status(500).json({ message: 'Error saving role selection' });
  }
};

export const submitRecruiterDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      companyName,
      website,
      registrationId,
      industry,
      companySize,
      businessEmail,
      address,
      pitchDeckUrl,
      isBusinessSubmitted
    } = req.body.businessDetails || {};

    const user = await User.findById(userId);
    if (!user || user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    user.businessDetails = {
      companyName,
      website,
      registrationId,
      industry,
      companySize,
      businessEmail,
      address,
      pitchDeckUrl,
      isBusinessSubmitted: isBusinessSubmitted ?? true,
    };

    user.verificationStatus = 'submitted';
    await user.save();

    res.status(200).json({ message: 'Recruiter details submitted', user });
  } catch (err) {
    console.error('Recruiter form error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const submitMentorDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      expertise,
      linkedIn,
      experienceYears,
      currentPosition,
      company,
      certifications,
      isMentorSubmitted
    } = req.body.mentorDetails || {};

    const user = await User.findById(userId);
    if (!user || user.role !== 'mentor') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    user.mentorDetails = {
      expertise,
      linkedIn,
      experienceYears,
      currentPosition,
      company,
      certifications,
      isMentorSubmitted: isMentorSubmitted ?? true,
    };

    user.verificationStatus = 'submitted';
    await user.save();

    res.status(200).json({ message: 'Mentor details submitted', user });
  } catch (err) {
    console.error('Mentor form error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const approveUser = async (req, res) => {
  try {
    const adminEmail = req.user.email;
    const { userId } = req.params;

    if (adminEmail !== 'krishnakadukar0004@gmail.com') {
      return res.status(403).json({ message: 'Only admin can approve' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isApproved = true;
    user.profileCompleted = true;
    user.verificationStatus = 'verified';

    await user.save();

    res.status(200).json({ message: 'User approved successfully', user });
  } catch (err) {
    console.error('Approval error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPendingUsers = async (req, res) => {
  try {
    const adminEmail = req.user.email;

    if (adminEmail !== 'krishnakadukar0004@gmail.com') {
      return res.status(403).json({ message: 'Only admin can view this' });
    }

    const users = await User.find({
      $or: [
        { verificationStatus: 'submitted' },
        { isApproved: false, profileCompleted: false },
      ]
    });

    res.status(200).json({ users });
  } catch (err) {
    console.error('Fetching pending users error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
export const rejectUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.status = 'rejected';
    await user.save();

    res.json({ message: 'User rejected successfully' });
  } catch (err) {
    console.error('Error rejecting user:', err);
    res.status(500).json({ message: 'Server error while rejecting user' });
  }
};
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.avatar = req.file.path; 
    await user.save();

    res.status(200).json({ message: 'Avatar uploaded', avatarUrl: user.avatar });
  } catch (error) {
    console.error('Upload avatar error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    console.error('Fetch profile by ID error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateProfileById = async (req, res) => {
  try {
    const {
      name,
      phone,
      location,
      bio,
      gender,
      dateOfBirth,
      skills,
      education,
      awardsAndCertifications,
      projects,
      experience,
      certifications,
    } = req.body;

    const updates = {
      name,
      phone,
      location,
      bio,
      gender,
      dateOfBirth,
      skills,
      education,
      awardsAndCertifications,
      projects,
      'mentorDetails.certifications': certifications,
      experience,
    };

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (err) {
    console.error('Update profile by ID error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const uploadCertificateOrProjectImage = async (req, res) => {
  try {
    const imageUrl = req.file.path;
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
};
