import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MovieCard from "./MovieCard";

const MovieListCard = ({ movies, title="", notFoundTitle="" }) => {

  const renderNotFound = () => {
    return (
      <div className="  h-144 flex   items-center ">
        <p className="text-black text-2xl font-semibold">
          Not Found : {movies.length === 0 ? notFoundTitle : ""}
        </p>
      </div>
    );
  };

  const renderMovie = () => {
    return (
      <>
        {movies.length !== 0 ? (
          <>
            {movies &&
              movies.map((item) => (
                <div key={item.id}>
                  <MovieCard movie={item} />
                </div>
              ))}
          </>
        ) : (
          <>{renderNotFound()}</>
        )}
      </>
    );
  };

  const renderMovieSection = () => {
    return (
      <div className="xl:container mx-auto ">
        <div className="w-full bg-red">
          <div className="flex  p-4 text-black sm:mb-4  ">
            <Link className=" flex  items-center  " to="/">
              <span className="sm:block flex">
                <ArrowBackIosIcon />
              </span>
            </Link>
            <span id="Back" className="font-semibold text-2xl  uppercase ">
              {title}
            </span>
          </div>
          <div className="w-full flex justify-center ">
            <div className="flex  flex-wrap xl:gap-6 gap-4 justify-center mb-4  ">
              {renderMovie()}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <div className="w-full h-full  ">{renderMovieSection()}</div>;
};

export default MovieListCard;
