import { useEffect, useState } from 'react';
import { Search, MapPin, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AllJob() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState(''); // Add location state

  useEffect(() => {
    axios.get('http://localhost:4000/api/jobs') // replace with your actual API URL
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredJobs = jobs.filter(job =>
    job['Job Title'].toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.Company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.Location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    // Refetch on search
    axios.get('http://localhost:4000/api/jobs', { params: { searchTerm, location } }) // You can pass the search term and location to filter
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div className="h-screen bg-gray-50 py-12 overflow-y-auto">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
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
                onChange={(e) => setLocation(e.target.value)} // Fix location state update
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
           
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mx-10">

          <div className="lg:col-span-4 space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{job['Job Title']}</h3>
                      <div className="mt-2 flex items-center text-gray-500">
                        <BookOpen className="h-5 w-5 mr-2" />
                        {job.Company}
                      </div>
                      <div className="mt-2 flex items-center text-gray-500">
                        <MapPin className="h-5 w-5 mr-2" />
                        {job.Location}
                      </div>
                    </div>
                  
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.type && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {job.type}
                      </span>
                    )}
                    {job.subject && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {job.subject}
                      </span>
                    )}
                    {job.posted && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        {job.posted}
                      </span>
                    )}
                  </div>
                  {/* External Link for Apply Now */}
                  <a
                    href={job['Apply Link']}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium mt-2 inline-block"
                  >
                    Apply Now →
                  </a>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No jobs found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
