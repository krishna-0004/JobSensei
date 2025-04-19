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
