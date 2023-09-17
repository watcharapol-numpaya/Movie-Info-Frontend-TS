import React, { useState } from "react";
import { useSelector } from "react-redux";
import CastCard from "../components/CastCard";

const  CastSection =()=> {
  const [displayedCast, setDisplayedCast] = useState(8); // Number of initially displayed cast
  const imageUrl = "https://www.themoviedb.org/t/p/w1280";
  const { allCast } = useSelector((state) => state.cast);
  const limitCast = allCast.slice(0, displayedCast);

  const showMoreCast = () => {
    setDisplayedCast(allCast.length); // Show all cast when "See More" is clicked
  };

  const showLessCast = () => {
    setDisplayedCast(8);
  };

  return (
    <div className="w-full h-full p-2  ">
 
      <p id="title" className="p-2 text-xl font-bold text-black">Cast</p>
      <hr />
      <div className="w-full flex justify-center flex-wrap pt-4 gap-2">
        {allCast &&
          limitCast.map((cast) => (
            <CastCard   key={cast.id} cast={cast}/>
          
          ))}
      </div>
      {displayedCast < allCast.length && (
        <div className="flex justify-center p-2 mb-4 ">
          <button
            onClick={showMoreCast}
            className="text-yellow-500 cursor-pointer font-semibold text-lg p-2  "
          >
            See More
          </button>
        </div>
      )}
     
      {allCast.length === limitCast.length && (
     
        <div className="flex justify-center p-2 mb-4">
 
          <button
            onClick={showLessCast}
            className="text-yellow-500  cursor-pointer font-semibold text-lg p-2 "
          >
           <a href="#title"> See Less</a>
          </button>
        </div>
      )}
    </div>
  );
}

export default CastSection;
