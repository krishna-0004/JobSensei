import React from 'react';

const mentors = [
  {
    id: 1,
    name: "Dr. Kavita Joshi",
    expertise: "AI & Machine Learning",
    timeslots: ["10:00 AM - 11:00 AM", "2:00 PM - 3:00 PM"],
    image: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
  },
  {
    id: 2,
    name: "Rahul Mehra",
    expertise: "Full Stack Web Development",
    timeslots: ["11:00 AM - 12:00 PM", "4:00 PM - 5:00 PM"],
    image: "https://cdn-icons-png.flaticon.com/512/921/921347.png",
  },
  {
    id: 3,
    name: "Anita Reddy",
    expertise: "Cybersecurity & Ethical Hacking",
    timeslots: ["9:00 AM - 10:00 AM", "3:00 PM - 4:00 PM"],
    image: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
  },
  {
    id: 4,
    name: "Siddharth Iyer",
    expertise: "Data Science & Analytics",
    timeslots: ["1:00 PM - 2:00 PM", "5:00 PM - 6:00 PM"],
    image: "https://cdn-icons-png.flaticon.com/512/201/201634.png",
  },
  {
    id: 5,
    name: "Meena Sharma",
    expertise: "Cloud Computing & DevOps",
    timeslots: ["10:30 AM - 11:30 AM", "3:30 PM - 4:30 PM"],
    image: "https://cdn-icons-png.flaticon.com/512/2922/2922656.png",
  },
];

const Mentor = () => {
  const handleBooking = (mentorName, slot) => {
    alert(`📅 Booked ${slot} with ${mentorName}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">Meet Your Mentors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 flex flex-col items-center transition-transform hover:scale-105 duration-300"
          >
            <img
              src={mentor.image}
              alt={mentor.name}
              className="w-28 h-28 rounded-full mb-4 object-cover"
            />
            <h2 className="text-2xl font-semibold text-gray-800">{mentor.name}</h2>
            <p className="text-sm text-gray-600 mb-4">{mentor.expertise}</p>
            <div className="w-full space-y-3">
              {mentor.timeslots.map((slot, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-gray-100 rounded-lg px-4 py-2"
                >
                  <span className="text-gray-700">{slot}</span>
                  <button
                    onClick={() => handleBooking(mentor.name, slot)}
                    className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-blue-700"
                  >
                    Book
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentor;
