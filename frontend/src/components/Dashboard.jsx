import React from "react";

// 🔹 Function to extract the YouTube video ID and return the thumbnail URL
const getYoutubeThumbnail = (url) => {
  const videoIdMatch = url.match(
    /(?:youtu\.be\/|youtube\.com.*(?:v=|\/embed\/|\/v\/))([a-zA-Z0-9_-]{11})/
  );
  return videoIdMatch
    ? `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg`
    : null;
};

// 🔹 React Component to render the thumbnail
const VideoThumbnail = ({ link }) => {
  const thumbnail = getYoutubeThumbnail(link);

  return (
    <>
    
    <div className="w-full max-w-md mx-auto mt-10 text-center">
      {thumbnail ? (
        <div className="rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
          <img src={thumbnail} alt="Video Thumbnail" className="w-full" />
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 text-blue-400 hover:underline"
          >
            Watch Video
          </a>
        </div>
      ) : (
        <p className="text-red-500">Invalid YouTube link</p>
      )}
    </div>

    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">YouTube Thumbnail Viewer</h1>

      {/* Pass any YouTube video URL here */}
      <VideoThumbnail link="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
    </div>
    
    </>
  );
};

export default VideoThumbnail;
