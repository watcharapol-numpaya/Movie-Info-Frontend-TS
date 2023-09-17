import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import HideImageIcon from "@mui/icons-material/HideImage";
import { Link } from "react-router-dom";
const SearchCard = ({ movie }) => {
  const [imageUrl, setImageUrl] = useState(
    "https://www.themoviedb.org/t/p/w220_and_h330_face"
  );

  return (
    <Link to={`/movieInfo/${movie.id}`}>
      <div className="flex gap-1 border-b hover:bg-slate-200 w-full p-1 px-2 cursor-pointer">
        <div className="w-1/6">
          <div className="flex items-center  justify-center h-20 w-12  ">
            {movie.poster_path ? (
              <img src={imageUrl + movie.poster_path} alt=""></img>
            ) : (
              <HideImageIcon />
            )}
          </div>
        </div>
        <div className="w-5/6 ">
          <p className="font-medium truncate ">{movie.title}</p>
          <div className="flex items-center">
            <StarIcon className="text-yellow-500" fontSize="small" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchCard;
