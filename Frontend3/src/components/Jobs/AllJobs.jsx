import { useEffect, useState } from 'react';
import { Search, MapPin, BookOpen } from 'lucide-react';
import axios from 'axios';

export default function AllJob() {
  const [globalJobs, setGlobalJobs] = useState([]);
  const [recruiterJobs, setRecruiterJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  // JWT Decoding function
  const decodeJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (err) {
      console.error('❌ Failed to decode token:', err);
      return null;
    }
  };

  // Fetch job data from both platform and recruiters
  const fetchJobs = async () => {
    try {
      const platformRes = await axios.get('http://localhost:4000/api/jobs', {
        params: { search: searchTerm, location },
      });
      const recruiterRes = await axios.get('http://localhost:4000/api/business-details');
      setGlobalJobs(platformRes.data);
      setRecruiterJobs(recruiterRes.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [searchTerm, location]);

  const handleSearch = () => {
    fetchJobs();
  };

  const handleApply = async (jobId) => {
    console.log('Job ID:', jobId);  // Debugging log for jobId
    if (!jobId) {
      alert('❌ Invalid Job ID');
      return;
    }

    const token = localStorage.getItem('token');
    const decoded = decodeJwt(token);

    if (!decoded || !decoded.id) {
      alert('Invalid or expired token. Please log in again.');
      return;
    }

    try {
      await axios.post(`http://localhost:4000/api/jobs/apply/${jobId}`, {
        userId: decoded.id,
      });
      alert('✅ Applied Successfully!');
    } catch (error) {
      console.error('❌ Apply failed:', error);
      alert('Failed to apply.');
    }
  };

  // Filter jobs based on search term
  const filterJobs = (jobs) => {
    return jobs.filter((job) => {
      const title = job['Job Title'] || job.title || '';
      const company = job.Company || job.businessDetails?.companyName || '';
      const jobLocation = job.Location || job.location || '';
      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jobLocation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  const filteredGlobalJobs = filterJobs(globalJobs);
  const filteredRecruiterJobs = recruiterJobs.filter((job) => job.isBusinessSubmitted);

  return (
    <div className="h-screen bg-gray-50 py-12 overflow-y-auto">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <MapPin className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* Side-by-Side Layout for Global Jobs and Recruiter Jobs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Platform Jobs */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Platform Jobs</h3>
            <div className="space-y-6">
              {filteredGlobalJobs.length > 0 ? (
                filteredGlobalJobs.map((job, index) => {
                  const title = job['Job Title'] || job.title;
                  const company = job.Company || job.businessDetails?.companyName;
                  const jobLocation = job.Location || job.location;

                  return (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                          <div className="mt-2 flex items-center text-gray-500">
                            <BookOpen className="h-5 w-5 mr-2" />
                            {company}
                          </div>
                          <div className="mt-2 flex items-center text-gray-500">
                            <MapPin className="h-5 w-5 mr-2" />
                            {jobLocation}
                          </div>
                        </div>
                      </div>
                      <a
                        href={job['Apply Link'] || job.applyLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 font-medium mt-2 inline-block"
                      >
                        Apply Now →
                      </a>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-gray-600">No jobs found.</p>
              )}
            </div>
          </div>

          {/* Recruiter Job Posts */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Recruiter Business Details</h3>
            <div className="space-y-6">
              {filteredRecruiterJobs.length > 0 ? (
                filteredRecruiterJobs.map((business, index) => {
                  const companyName = business.companyName || 'Unknown Company';
                  const website = business.website || '#';
                  const industry = business.industry || 'Unknown Industry';
                  const companySize = business.companySize || 'Unknown Size';
                  const address = business.address || 'Unknown Address';
                  const jobId = business._id || business.jobId || business.id; // ✅ Handle missing jobId

                  return (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
                      <h3 className="text-xl font-semibold text-gray-900">{companyName}</h3>
                      <div className="mt-2 flex items-center text-gray-500">
                        <BookOpen className="h-5 w-5 mr-2" />
                        {industry}
                      </div>
                      <div className="mt-2 flex items-center text-gray-500">
                        <MapPin className="h-5 w-5 mr-2" />
                        {address}
                      </div>
                      <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 font-medium mt-2 inline-block"
                      >
                        Visit Website →
                      </a>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-gray-600">No recruiter businesses found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}