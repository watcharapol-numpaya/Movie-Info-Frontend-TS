// CircularProgressBar.js
import React from "react";

const CircularProgressBar = ({ percentage }) => {
  //change radius
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const showColor = () => {
    if (percentage >= 70) {
      return "text-green-500";
    } else if (percentage >= 40) {
      return "text-yellow-500";
    } else if (percentage >= 1) {
      return "text-red-500";
    } else {
      return "text-gray-400";
    }
  };

  return (
    // change size

    <div className="circular-progress relative w-16 h-16 overflow-hidden">
      <svg
        className="absolute top-0 left-0 transform -rotate-90 "
        width="100%"
        height="100%"
      >
        <circle
          className={`progress-circle stroke-current ${showColor()}  `}
          cx="50%"
          cy="50%"
          r={radius}
          strokeWidth="5"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          fill="transparent"
        />
      </svg>
      {/* change bg color */}
      <div className="flex items-center justify-center w-full h-full rounded-full bg-white text-blue-500 font-bold   ">
        {percentage}%
      </div>
    </div>
  );
};

export default CircularProgressBar;
