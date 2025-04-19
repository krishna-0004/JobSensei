const RoadmapItem = ({ title, description, date }) => {
    return (
      <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-blue-500 w-[90vw] max-w-2xl">
        <h3 className="text-xl font-semibold text-blue-600">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <span className="text-sm text-gray-400 mt-1 block">{date}</span>
      </div>
    );
  };
  
  export default RoadmapItem;
  