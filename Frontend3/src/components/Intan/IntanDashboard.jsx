import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  SquarePlay, BookType, CircleCheck, Headphones,
  Languages, BriefcaseBusiness, FileUser, Search
} from 'lucide-react';

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
                  <div className="min-w-[140px] h-40 bg-white rounded-2xl shadow hover:shadow-lg transition-all p-4 flex flex-col items-center gap-2">
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

          {/* Trending Jobs */}
          <div className="bg-gradient-to-br from-sky-100 to-sky-200 p-4 rounded-3xl shadow">
            <div className="flex items-center gap-3 mb-4">
              <BriefcaseBusiness className="text-sky-600" />
              <h1 className="font-semibold text-lg text-gray-700">Trending Jobs</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[{
                title: "Sales Executive",
                company: "Local Retail Chain",
                salary: "₹15k - ₹20k/month",
                skills: ["Communication", "Sales", "Customer Service"],
                match: "82%"
              }, {
                title: "Junior Web Developer",
                company: "Digital Agency",
                salary: "₹18k - ₹25k/month",
                skills: ["HTML", "CSS", "JavaScript"],
                match: "76%"
              }, {
                title: "Content Writer",
                company: "Education Startup",
                salary: "₹12k - ₹18k/month",
                skills: ["Writing", "Research", "Local Language"],
                match: "88%"
              }].map((job, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow hover:shadow-md transition">
                  <div className="mb-2">
                    <h3 className="font-semibold text-gray-800">{job.title}</h3>
                    <p className="text-sm text-gray-500">{job.company}</p>
                  </div>
                  <span className="inline-block bg-sky-100 text-sky-800 text-xs font-medium px-2 py-1 rounded-full mb-3">
                    {job.salary}
                  </span>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {job.skills.map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-xs rounded-md text-gray-700">{skill}</span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">Match: {job.match}</span>
                </div>
              ))}
            </div>
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
          <div className="bg-gradient-to-br from-sky-500 to-sky-700 text-white p-6 rounded-3xl flex flex-col items-center gap-4 shadow">
            <FileUser className='size-10' />
            <h2 className="text-center text-lg font-semibold">Job-Winning Resume</h2>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2 text-gray-700">
                <Search />
                <h1 className="font-semibold">Find Jobs</h1>
              </div>
              <button className="text-xs bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-full">See All</button>
            </div>

            <div className="flex flex-col gap-3">
              {[{ name: "Google", img: "/Images/google.png" }, { name: "Github", img: "/Images/github.png" }, { name: "TCS", img: "/Images/google.png" }, { name: "Infosys", img: "/Images/google.png" }].map((company, i) => (
                <div key={i} className="bg-gradient-to-br from-sky-100 to-sky-200 p-3 rounded-2xl flex items-center justify-between shadow">
                  <img src={company.img} alt={company.name} className="w-6" />
                  <p className="text-sm text-gray-700 font-medium">{company.name}</p>
                  <span className="text-sm text-gray-600">Jobs</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
