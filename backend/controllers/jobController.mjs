import Job from "../models/Job.mjs";
import User from "../models/User.mjs";

export const getAllJobs = async (req, res) => {
  try {
    const { search, location } = req.query;

    const filter = {};
    if (search) filter.title = { $regex: search, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };

    const jobsFromMain = await Job.find(filter);

    const recruiters = await User.find({ role: 'recruiter', jobs: { $exists: true } });
    const recruiterJobs = recruiters.flatMap(user =>
      user.jobs
        .filter(job => {
          const matchesSearch = !search || new RegExp(search, 'i').test(job.title);
          const matchesLocation = !location || new RegExp(location, 'i').test(job.location);
          return matchesSearch && matchesLocation;
        })
        .map(job => ({ ...job, postedBy: user._id })) 
    );

    const allJobs = [...jobsFromMain, ...recruiterJobs];
    res.json(allJobs);

  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAllBusinessDetails = async (req, res) => {
    try {
      const users = await User.find().select('businessDetails');
  
      if (!users.length) {
        return res.status(404).json({ message: 'No users found' });
      }
  
      res.status(200).json(users.map(user => user.businessDetails));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching business details' });
    }
  };

export const applyToJob = async (req, res) => {
    const { jobId, userId } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const job = user.businessDetails.jobs.find((job) => job.jobId.toString() === jobId);
      if (!job) return res.status(404).json({ message: "Job not found" });
  
      if (!job.applicants.includes(userId)) {
        job.applicants.push(userId);
        await user.save();
      }
  
      res.status(200).json({ message: "Applied successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  