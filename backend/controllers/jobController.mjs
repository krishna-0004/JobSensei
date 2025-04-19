import Job from "../models/Job.mjs";
import User from "../models/User.mjs";

// In jobController.mjs
export const getAllJobs = async (req, res) => {
  try {
    const { search, location } = req.query;

    // Build the main filter object for main job collection
    const filter = {};
    if (search) filter.title = { $regex: search, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' }; // Location filter for main jobs

    // Get jobs from the main jobs collection
    const jobsFromMain = await Job.find(filter);

    // Get jobs from recruiters
    const recruiters = await User.find({ role: 'recruiter', jobs: { $exists: true } });
    const recruiterJobs = recruiters.flatMap(user =>
      user.jobs
        .filter(job => {
          // Apply search and location filters to recruiter jobs
          const matchesSearch = !search || new RegExp(search, 'i').test(job.title);
          const matchesLocation = !location || new RegExp(location, 'i').test(job.location);
          return matchesSearch && matchesLocation;
        })
        .map(job => ({ ...job, postedBy: user._id })) // Add recruiter ID to each job
    );

    // Combine jobs from main collection and recruiter jobs
    const allJobs = [...jobsFromMain, ...recruiterJobs];
    res.json(allJobs);

  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAllBusinessDetails = async (req, res) => {
    try {
      // Fetch all users and select only the businessDetails field
      const users = await User.find().select('businessDetails');
  
      if (!users.length) {
        return res.status(404).json({ message: 'No users found' });
      }
  
      // Return the business details for all users
      res.status(200).json(users.map(user => user.businessDetails));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching business details' });
    }
  };

  // controllers/jobController.mjs
// POST /api/jobs/apply
export const applyToJob = async (req, res) => {
    const { jobId, userId } = req.body;
  
    try {
      // Find the job in the businessDetails.jobs array
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      // Loop through the user's businessDetails to find the job
      const job = user.businessDetails.jobs.find((job) => job.jobId.toString() === jobId);
      if (!job) return res.status(404).json({ message: "Job not found" });
  
      // Check if the user has already applied to the job
      if (!job.applicants.includes(userId)) {
        job.applicants.push(userId);
        await user.save(); // Save the updated user document
      }
  
      res.status(200).json({ message: "Applied successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  