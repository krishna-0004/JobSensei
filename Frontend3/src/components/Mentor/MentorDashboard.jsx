import React from 'react';

const bookings = [
  {
    id: 1,
    intanName: "Anjali Verma",
    email: "anjali.verma@example.com",
    slot: "10:00 AM - 11:00 AM",
    message: "Looking for guidance on ML projects.",
    date: "2025-04-20",
  },
  {
    id: 2,
    intanName: "Rohit Singh",
    email: "rohit.singh@example.com",
    slot: "2:00 PM - 3:00 PM",
    message: "Need help with system design interview prep.",
    date: "2025-04-21",
  },
  {
    id: 3,
    intanName: "Sneha Patil",
    email: "sneha.patil@example.com",
    slot: "11:30 AM - 12:30 PM",
    message: "Want to understand DevOps better.",
    date: "2025-04-22",
  },
];

const MentorDashboard = () => {
  return (
    <div className=" bg-gray-50 p-8 overflow-y-auto h-screen">
      <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">Mentor Dashboard</h1>
      
      <div className="mb-6 text-center">
        <span className="text-lg text-gray-700">
          📋 Total Bookings: 
        </span>
        <span className="text-xl font-semibold text-blue-800 ml-2">
          {bookings.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold text-blue-800">{booking.intanName}</h2>
            <p className="text-gray-600 text-sm mb-1">{booking.email}</p>
            <p className="text-sm text-gray-700">📅 Date: {booking.date}</p>
            <p className="text-sm text-gray-700">🕒 Slot: {booking.slot}</p>
            <p className="text-sm text-gray-700 mt-2">📝 Message: <span className="text-gray-600 italic">{booking.message}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorDashboard;
