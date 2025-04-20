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
  CircleCheckBig,
  MessageSquareCode,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ userRole = "intern" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleChat = () => setChatOpen(!chatOpen);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
  
    const userMessage = messageInput.trim();
  
    // Show the user's message immediately
    setMessages((prev) => [...prev, `You: ${userMessage}`]);
    setMessageInput('');
  
    try {
      // Sending the correct payload format
      const response = await fetch('https://aichatbot-production-4db8.up.railway.app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });
  
      // Check if the response is OK (status 200)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Log the full response for debugging
      const data = await response.json();
      console.log('API Response:', data);
  
      // Extract the correct field from the response
      const botReply = data.response || "Sorry, no response from bot.";
      setMessages((prev) => [...prev, `Bot: ${botReply}`]);
  
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [...prev, "Bot: Error contacting server."]);
    }
  };
  

  const navItems = {
    intern: [
      { to: "/intan", icon: <LayoutDashboard />, label: "Dashboard" },
      { to: "/Jobs", icon: <BriefcaseBusiness />, label: "Jobs" },
      { to: "/Intern-Profile", icon: <UserRoundPen />, label: "Profile" },
      { to: "/mentors", icon: <GraduationCap />, label: "Mentors" },
      { to: "https://ai-mock-interview-production.up.railway.app/", icon: <BookOpenCheck />, label: "Mock Interview" },
      { to: "https://quizportal-beige.vercel.app/", icon: <CircleCheckBig />, label: "Quiz Portal" },
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
      {/* Sidebar Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen z-40 w-[70%] sm:w-[60%] md:w-[16.6%] min-w-[240px] bg-[#DEF2FF] p-6 rounded-r-2xl transition-transform duration-300 font-RS shadow-md
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
          <li className="text-red-500 list-none">
            <Link to="" className="flex items-center gap-6 hover:text-red-700 transition">
              <LogOut />
              <span>Sign Out</span>
            </Link>
          </li>
        </nav>

        {/* Floating Chat Icon */}
        <div
          onClick={toggleChat}
          className="absolute bottom-20 left-8 bg-white p-4 border-gray-300 rounded-full cursor-pointer shadow-md hover:bg-blue-100 transition"
        >
          <MessageSquareCode className="text-blue-600" />
        </div>
      </div>

      {/* Chatbot Popup */}
      {chatOpen && (
  <div className="fixed bottom-5 left-5 z-50 w-1/3 bg-blue-50 border border-blue-200 rounded-xl shadow-xl">
    <form className="relative p-4 flex flex-col space-y-3" onSubmit={handleSendMessage}>
      <button
        type="button"
        onClick={toggleChat}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
      >
        &times;
      </button>

      <div className="flex items-center gap-2 text-blue-700 text-lg font-semibold">
        <i className="fa-solid fa-chalkboard-user"></i>
        <h3>Chat with us</h3>
      </div>

      <div className="h-96 overflow-y-auto p-2 bg-white rounded-md text-sm text-gray-800 shadow-inner">
        {messages.map((msg, idx) => (
          <div key={idx} className="bg-blue-100 p-2 my-1 rounded-md">{msg}</div>
        ))}
      </div>

      <textarea
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Type message..."
        required
        className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-20"
      ></textarea>

      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
        >
          Send
        </button>
        <button
          type="button"
          onClick={toggleChat}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm"
        >
          Close
        </button>
      </div>
    </form>
  </div>
)}

    </>
  );
}
