import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const topics = ["frontend", "backend", "devops", "fullstack"];

const RoadmapSection = () => {
  const [selectedTopic, setSelectedTopic] = useState("frontend");
  const [roadmapData, setRoadmapData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRoadmap = async (topic) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`https://error404-prabal-2.onrender.com/roadmap/${topic}`);
      const data = await res.json();
      setRoadmapData(data);
    } catch (err) {
      setError("Failed to fetch roadmap data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmap(selectedTopic);
  }, [selectedTopic]);

  return (
    <div className="p-6 mx-auto bg-white rounded-2xl shadow-md overflow-y-auto h-screen max-w-5xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-extrabold text-gray-800">Learning Roadmap</h1>
        <select
          className="border border-gray-300 rounded-md px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic.charAt(0).toUpperCase() + topic.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center">Loading roadmap...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="relative">
          {/* Center vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-300 z-0" />

          <ul className="relative z-10 space-y-28">
            {roadmapData.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <li key={index} className="relative w-full flex justify-center items-center">
                  {/* Card container */}
                  <div
                    className={`w-full sm:w-1/2 px-4 ${
                      isLeft ? "ml-auto text-left" : "mr-auto text-right"
                    }`}
                  >
                    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-5 rounded-xl shadow-md hover:shadow-xl transition transform animate-fade-up">
                      <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      )}
                      <div className={`flex ${isLeft ? "justify-start" : "justify-end"} items-center mt-3`}>
                        {item.timestamp && (
                          <span className="text-xs font-medium text-blue-600">
                            ⏱ Duration: {item.timestamp}
                          </span>
                        )}
                        {item.course_link && (
                          <a
                            href={item.course_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-4 text-xs px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Go to Course
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SVG Arrow Line */}
                  {index !== roadmapData.length - 1 && (
                    <svg
                      className="absolute top-full mt-2 w-16 h-16 z-0 text-blue-400"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        left: isLeft ? "calc(50% - 2rem)" : "calc(50% + 2rem)",
                        transform: isLeft ? "rotate(45deg)" : "rotate(-45deg)",
                      }}
                    >
                      <path
                        d="M0,0 C50,100 50,100 100,0"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="transparent"
                      />
                    </svg>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RoadmapSection;
