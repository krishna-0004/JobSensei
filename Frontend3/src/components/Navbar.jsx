import React, { useState } from 'react';
import {
  Menu,
  LayoutDashboard,
  BriefcaseBusiness,
  GraduationCap,
  UserRoundPen,
  BookOpenCheck,
  LogOut,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ userRole = "intern" }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = {
    intern: [
      { to: "/intan", icon: <LayoutDashboard />, label: "Dashboard" },
      { to: "/Jobs", icon: <BriefcaseBusiness />, label: "Jobs" },
      { to: "/Intern-Profile", icon: <UserRoundPen />, label: "Profile" },
      { to: "/mentors", icon: <GraduationCap />, label: "Mentors" },
      { to: "https://ai-mock-interview-ky9t.onrender.com", icon: <BookOpenCheck />, label: "Mock Interview" },
    ],
    mantor: [
      { to: "/dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
      { to: "/Mentor-Profile", icon: <UserRoundPen />, label: "Profile" },
    ],
    recrut: [
      { to: "/dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
      { to: "/Recruiter-Profile", icon: <UserRoundPen />, label: "Profile" },
    ],
  };

  return (
    <>
      {/* Toggle button for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-[100vh] z-40 w-[70%] sm:w-[60%] md:w-[16.6%] min-w-[240px] bg-[#DEF2FF] p-6 rounded-r-2xl transition-transform duration-300 font-RS shadow-md
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:static md:block`}
      >
        <nav className="flex flex-col justify-between h-full gap-4">
          <div>
            <div className="flex justify-start gap-6 items-center mb-4">
              <Menu />
              <h3 className="font-semibold text-lg">User Name</h3>
            </div>

            <ul className="flex flex-col gap-4">
              {navItems[userRole]?.map((item, idx) => (
                <li key={idx}>
                  <Link to={item.to} className="flex items-center gap-6 hover:text-indigo-600 transition">
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <li className="text-red-500">
            <Link to="/logout" className="flex items-center gap-6 hover:text-red-700 transition">
              <LogOut />
              <span>Sign Out</span>
            </Link>
          </li>
        </nav>
      </div>
    </>
  );
}
