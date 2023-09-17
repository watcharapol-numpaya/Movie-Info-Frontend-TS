import React from "react";
import { Link } from "react-router-dom";

const ListTitle2SideCard=({ title, data })=> {
  return (
    <div className=" ">
      <p className="text-xl font-bold pb-1">{title}</p>
      <div className="flex">
        <div className="w-1/2">
          {data&&data.slice(0, Math.ceil(data.length / 2)).map((movie, index) => (
            <p key={movie.id}>
              <Link to={`/movieInfo/${movie.id}`}>
                {index + 1}. {movie.title}
              </Link>
            </p>
          ))}
        </div>
        <div className="w-1/2">
          {data&&data.slice(0, Math.ceil(data.length / 2)).map((movie, index) => (
            <p key={movie.id}>
              <Link to={`/movieInfo/${movie.id}`}>
                {index + Math.ceil(data.length / 2) + 1}. {movie.title}
              </Link>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListTitle2SideCard;
