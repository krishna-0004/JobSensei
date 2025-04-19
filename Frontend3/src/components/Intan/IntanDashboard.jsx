import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  SquarePlay, BookType, CircleCheck, Headphones,
  Languages, BriefcaseBusiness, FileUser, Search,
  ArrowRight,
  Map
} from 'lucide-react';
import { Link } from 'react-router-dom';

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

export default function IntanDashboard() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const decoded = decodeJwt(token);
        if (!decoded || !decoded.id) return;

        const res = await axios.get(`http://localhost:4000/user/profile/${decoded.id}`);
        setUser(res.data);
        setCourses(res.data.course_recommendations || []); // FIXED HERE
      } catch (err) {
        console.error('❌ Failed to fetch user or courses:', err);
      }
    };
    fetchUserData();
  }, []);

  const steps = ["Plan", "Design", "Develop", "Test", "Deploy"];



  return (
    <section className="p-4 bg-sky-50 overflow-y-auto h-screen">
      <div>
        <h1 className="text-3xl font-bold mt-4 text-gray-800">Welcome</h1>
        <p className="text-base text-gray-500">AI Career Paths</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-2">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-3">

          {/* Recommended Videos */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">Recommended Videos For You</h2>
            <div className="flex overflow-x-auto gap-4 pb-2">
              {courses.map((course, idx) => (
                <a
                  href={course.course_link}
                  key={idx}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="min-w-[140px] h-44 bg-white rounded-2xl shadow hover:shadow-lg transition-all p-4 flex flex-col items-center gap-2">
                    <div className="p-3 bg-gradient-to-br from-sky-300 to-sky-500 rounded-full">
                      <SquarePlay className="size-10 text-white" />
                    </div>
                    <h2 className="text-sm font-semibold text-center text-gray-700">
                      {course.skill_name}
                    </h2>
                  </div>
                </a>
              ))}
            </div>
          </div>

          
          <div className="my-10 bg-gradient-to-br from-sky-500 to-sky-700 text-white p-6 rounded-3xl flex flex-col items-center gap-4 shadow">
            <FileUser className='size-10' />
            <h2 className="text-center text-lg font-semibold">Job-Winning Resume</h2>
          </div>

          {/* Skill Building */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">Skill Building</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[{ label: "Learning", icon: BookType }, { label: "Language", icon: Languages }, { label: "Skill", icon: Headphones }, { label: "Career", icon: CircleCheck }].map((item, i) => (
                <div key={i} className="flex flex-col justify-center items-center gap-2 p-4 bg-gradient-to-br from-sky-200 to-sky-400 rounded-2xl text-white shadow-md">
                  <item.icon className="size-7 md:size-9" />
                  <h3 className="text-sm font-semibold">{item.label}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          

          
          {/* Trending Jobs */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-700 text-white p-6 rounded-3xl flex flex-col items-center gap-4 shadow">
  <Map className="size-10" />
  <h2 className="text-center text-lg font-semibold">Turning Ideas into Impactful Products</h2>

  
  <Link to="/RS"><button className="bg-white px-4 py-1 text-blue-500 rounded-3xl">Click to Generate Roadmap</button></Link>

</div>  


          <div>
            <div className="flex justify-between items-center mb-3 mt-5">
              <div className="flex items-center gap-2 text-gray-700">
                <Search />
                <h1 className="font-semibold">Recomended Jobs</h1>
              </div>
              <button className="text-xs bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-full">See All</button>
            </div>

            <div className="flex flex-col gap-4 overflow-y-auto h-80 py-2 ">
              {user?.job_recommendations?.map((job, i) => (
                <div
                  key={i}
                  className="bg-white border border-sky-200 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all flex flex-col gap-2"
                >
                  {/* Title with icon */}
                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness className='text-sky-400'/>
                    <h3 className="text-sm font-semibold text-gray-800">{job.title}</h3>
                  </div>

                  {/* Match Insights */}
                  <p className="text-xs text-gray-600 italic border-l-4 border-sky-400 pl-2">
                    {job.match_insights}
                  </p>

                  {/* Apply button */}
                  <div className="flex justify-end">
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs font-medium bg-gradient-to-r from-sky-500 to-sky-600 text-white px-4 py-1.5 rounded-full shadow hover:scale-105 hover:shadow-lg transition"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              ))}
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
