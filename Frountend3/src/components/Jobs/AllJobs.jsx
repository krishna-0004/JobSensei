import { useState } from 'react';
import { Search, MapPin, BookOpen, IndianRupee, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';


// Mock data for jobs
const mockJobs = [
  {
    id: 1,
    title: 'High School Math Teacher',
    school: 'International School of Excellence',
    location: 'New York, NY',
    salary: '₹60,000 - ₹80,000',
    type: 'Full-time',
    subject: 'Mathematics',
    posted: '2 days ago',
  },
  {
    id: 2,
    title: 'Elementary School Teacher',
    school: 'Bright Future Academy',
    location: 'Los Angeles, CA',
    salary: '₹55,000 - ₹75,000',
    type: 'Full-time',
    subject: 'General Education',
    posted: '3 days ago',
  },
  {
    id: 3,
    title: 'Science Teacher',
    school: 'STEM Academy',
    location: 'Chicago, IL',
    salary: '₹58,000 - ₹78,000',
    type: 'Full-time',
    subject: 'Science',
    posted: '1 week ago',
  },
];


export default function AllJob() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [isShow, setisShow] = useState(false)

  const toggel = () => {
    setisShow(!isShow)
  } 

 

  return (
    <div className="h-screen bg-gray-50 py-12 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <button className="w-full md:w-auto bg-blue-500 text-white px-4 py-2">
              Search Jobs
            </button>
          </div>
        </div>

        {/* Filters and Results */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button type="button" onClick={toggel}><Filter className="h-5 w-5 text-gray-500 " /></button>
              </div>

              <div className="  max-[990px]:hidden">

                {/* Job Type */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Job Type</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="ml-2 text-gray-700">Full-time</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="ml-2 text-gray-700">Part-time</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="ml-2 text-gray-700">Contract</span>
                    </label>
                  </div>
                </div>

                {/* Subject */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Subject</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="ml-2 text-gray-700">Mathematics</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="ml-2 text-gray-700">Science</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="ml-2 text-gray-700">English</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="ml-2 text-gray-700">History</span>
                    </label>
                  </div>
                </div>

                {/* Experience Level */}
                <div>
                  <h4 className="font-medium mb-2">Experience Level</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="ml-2 text-gray-700">Entry Level</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="ml-2 text-gray-700">Mid Level</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="ml-2 text-gray-700">Senior Level</span>
                    </label>
                  </div>
                </div>

                <div className="mt-6">
                  <h1 className="font-medium mb-2">Location</h1>
                  <input type="text" className='border-2 border-gray-400 px-4 py-1 rounded-xl' name="" id="" />
                </div>

              </div>

              {isShow && ( <div className=" filterOptions">

                {/* Job Type */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Job Type</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="ml-2 text-gray-700">Full-time</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="ml-2 text-gray-700">Part-time</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="ml-2 text-gray-700">Contract</span>
                    </label>
                  </div>
                </div>

                {/* Subject */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Subject</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="ml-2 text-gray-700">Mathematics</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="ml-2 text-gray-700">Science</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="ml-2 text-gray-700">English</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="ml-2 text-gray-700">History</span>
                    </label>
                  </div>
                </div>

                {/* Experience Level */}
                <div>
                  <h4 className="font-medium mb-2">Experience Level</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="ml-2 text-gray-700">Entry Level</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="ml-2 text-gray-700">Mid Level</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="ml-2 text-gray-700">Senior Level</span>
                    </label>
                  </div>
                </div>

                <div className="mt-6">
                  <h1 className="font-medium mb-2">Location</h1>
                  <input type="text" className='border-2 border-gray-400 px-4 py-1 rounded-xl' name="" id="" />
                </div>

              </div>)  }


            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3 space-y-6">
            {mockJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-sm p-6">
                <Link to={'/ApplyJob'} className="">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <div className="mt-2 flex items-center text-gray-500">
                        <BookOpen className="h-5 w-5 mr-2" />
                        {job.school}
                      </div>
                      <div className="mt-2 flex items-center text-gray-500">
                        <MapPin className="h-5 w-5 mr-2" />
                        {job.location}
                      </div>
                      <div className="mt-2 flex items-center text-gray-500">
                        <IndianRupee className="h-5 w-5 mr-2" />
                        {job.salary}
                      </div>
                    </div>
                    <button className='bg-blue-500 text-white px-4 py-2'>Apply Now</button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {job.type}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {job.subject}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      {job.posted}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}