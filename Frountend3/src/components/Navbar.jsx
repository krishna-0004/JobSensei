import React from 'react';
import {
  Menu,
  LayoutDashboard,
  BriefcaseBusiness,
  GraduationCap,
  UserRoundPen,
  BookOpenCheck,
  LogOut,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ userRole = "intern" }) {
  return (
    <section className="text-black  font-RS p-6 m-2 md:h-[97vh] rounded-2xl bg-[#E8EAEE]">
      <nav className="flex flex-col justify-between gap-4">
        <div className="flex justify-start gap-6 items-center">
          <Menu />
          <h3>User Name</h3>
        </div>

        {userRole === "intern" && (

          <ul className="mt-5 flex flex-col gap-4">
            <li>
              <Link to="/dashboard" className="flex items-center gap-6">
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </li>




            <li>
              <Link to="/jobs" className="flex items-center gap-6">
                <BriefcaseBusiness />
                <span>Jobs</span>
              </Link>
            </li>

            <li>
              <Link to="/Intern-Profile" className="flex items-center gap-6">
                <UserRoundPen />
                <span>Profile</span>
              </Link>
            </li>


            <li>
              <Link to="/mentors" className="flex items-center gap-6">
                <GraduationCap />
                <span>Mentors</span>
              </Link>
            </li>

            <li>
              <Link to="/mock" className="flex items-center gap-6">
                <BookOpenCheck />
                <span>Mock Interview</span>
              </Link>
            </li>
          </ul>

        )}

        {userRole === "mantor" && (

          <ul className="mt-5 flex flex-col gap-4">

            <li>
              <Link to="/dashboard" className="flex items-center gap-6">
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </li>

            <li>
              <Link to="/Mentor-Profile" className="flex items-center gap-6">
                <UserRoundPen />
                <span>Profile</span>
              </Link>
            </li>



          </ul>


        )}

        {userRole === "recrut" && (

          <ul className="mt-5 flex flex-col gap-4">

            <li>
              <Link to="/dashboard" className="flex items-center gap-6">
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </li>

            <li>
              <Link to="/Recrut-Profile" className="flex items-center gap-6">
                <UserRoundPen />
                <span>Profile</span>
              </Link>
            </li>



          </ul>


        )}

        {/* Common for mentor, recruiter, intern */}
        <li className="text-red-500 absolute bottom-10">
          <Link to="/logout" className="flex items-center gap-6">
            <LogOut />
            <span>Sign Out</span>
          </Link>
        </li>

      </nav>
    </section >
  );
}
