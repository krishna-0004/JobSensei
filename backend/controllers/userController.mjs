import User from '../models/User.mjs';
import jwt from 'jsonwebtoken';

// ✅ Step 2: Update Common Info
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
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

// ✅ Step 3: Select Role
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

    // For Intan → mark complete, else wait for form submission
    if (role === 'intan') {
      user.profileCompleted = true;
    }

    await user.save();

    // Sign new JWT with role
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

// ✅ Step 4a: Submit Recruiter Form
export const submitRecruiterDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      companyName, website, registrationId, industry, companySize,
      businessEmail, address, pitchDeckUrl,
    } = req.body;

    const user = await User.findById(userId);
    if (!user || user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    user.businessDetails = {
      companyName, website, registrationId, industry,
      companySize, businessEmail, address, pitchDeckUrl,
      isBusinessSubmitted: true,
    };

    user.verificationStatus = 'submitted';
    await user.save();

    res.status(200).json({ message: 'Recruiter details submitted', user });
  } catch (err) {
    console.error('Recruiter form error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Step 4b: Submit Mentor Form
export const submitMentorDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      expertise, linkedIn, experienceYears, currentPosition,
      company, certifications, portfolioUrl,
    } = req.body;

    const user = await User.findById(userId);
    if (!user || user.role !== 'mentor') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    user.mentorDetails = {
      expertise, linkedIn, experienceYears, currentPosition,
      company, certifications, portfolioUrl,
      isMentorSubmitted: true,
    };

    user.verificationStatus = 'submitted';
    await user.save();

    res.status(200).json({ message: 'Mentor details submitted', user });
  } catch (err) {
    console.error('Mentor form error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Step 5: Admin Approves User
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

// ✅ Step 6: Get Pending Users (for Admin)
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

    // Set status to rejected or remove user, depending on your logic
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
