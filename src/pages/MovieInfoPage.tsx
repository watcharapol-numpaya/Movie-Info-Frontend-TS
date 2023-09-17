import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getMovieDetailByID } from "../storage/slices/movieSlice";
import OnLoadingScreen from "../components/OnLoadingScreen";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgressBar from "../components/CircularProgressBar";
import Youtube from "react-youtube";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import BlockIcon from "@mui/icons-material/Block";
import { getCast } from "../storage/slices/castSlice";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CastSection from "../features/CastSection";
import ImageNotFound from "../components/ImageNotFound";
import ScrollToTop from "../components/ScrollToTop";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const MovieInfoPage = ({}) => {
  const { movieInfo } = useSelector((state) => state.movies);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [imageUrl, setImageURL] = useState(
    "https://www.themoviedb.org/t/p/w1280"
  );
  
  const voteAvgInPercentage = Math.round(movieInfo.vote_average * 10);

  useEffect(() => {
    Promise.all([dispatch(getMovieDetailByID(id)), dispatch(getCast(id))])
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch, id]);

  const renderMovieInfo = () => {
    return (
      <div className="xl:container mx-auto">
        <div id="banner-section" className="h-full w-full">
          {renderTitleAndBannerSection()}
        </div>
        <div id="details-section" className="h-full w-full  ">
          {renderSubInfoSection()}
        </div>
        <div id="cast-section" className="h-full w-full ">
          {renderCastSection()}
        </div>
      </div>
    );
  };

  const renderTitleAndBannerSection = () => {
    return (
      <>
        <div className="  mx-auto h-full  w-full flex justify-center ">
          <div className="relative sm:h-128 h-176  w-full  bg-black   ">
          <Link
              className="sm:hidden flex     absolute top-4 left-4    items-center justify-center z-10 h-12 w-12 pl-2 bg-gray-200 opacity-50 rounded-full  "
              to="/"
            >
              <div className=" flex justify-center items-center">
                <ArrowBackIosIcon />
              </div>
            </Link>
            <div
              id="image-background"
              className="sm:h-full h-176 w-full opacity-40 bg-gray-200  "
            >
              {movieInfo.backdrop_path ? (
                <img
                  className="w-full sm:h-full h-176 object-cover"
                  src={`${imageUrl}/${movieInfo.backdrop_path}`}
                  alt="Banner Image"
                />
              ) : (
                ""
              )}
            </div>
            <div className="absolute top-0 h-full w-full  flex sm:flex-row flex-col   ">
              <div id="poster" className="  sm:pt-0 pt-2  sm:w-2/6 w-full ">
                <div className="w-full h-full flex justify-center items-center   ">
                  <div className="lg:h-112 md:h-96 sm:h-80 h-72 lg:w-76 md:w-64 sm:w-56 w-48 border-white bg-gray-200  rounded-xl overflow-hidden shadow-lg">
                    {movieInfo.poster_path ? (
                      <img
                        className="lg:h-112 md:h-96 sm:h-80 h-72 lg:w-76 md:w-64 sm:w-56 w-48 shadow-xl rounded-xl border-4 border-white bg-gray-200"
                        src={`${imageUrl}/${movieInfo.poster_path}`}
                      />
                    ) : (
                      <ImageNotFound />
                    )}
                  </div>
                </div>
              </div>

              <div
                id="content"
                className="px-2 lg:pt-10 md:pt-16  pt-2  h-full sm:w-4/6 w-full   "
              >
                <div className="   ">
                  <p className="text-white md:text-4xl sm:text-3xl text-2xl font-semibold  ">
                    {movieInfo.title}
                  </p>
                </div>
                <hr className="border my-2 mt-3" />
                <div className="text-white  flex flex-wrap  ">
                  {/* <span className="font-semibold">Genres :</span> */}
                  {movieInfo.genres.map((genre, index) => (
                    <span
                      className="md:text-base sm:text-sm text-xs bg-yellow-500 ml-1 rounded-lg p-1 cursor-pointer"
                      key={genre.id}
                    >
                      {genre.name}
                      {/* {index !== movieInfo.genres.length - 1 && ","} */}
                    </span>
                  ))}
                </div>
                <div className="w-full mt-2 flex items-center">
                  <CircularProgressBar percentage={voteAvgInPercentage} />
                  <div className="text-white flex ml-2">
                    <ThumbUpIcon />
                    <p className=" "> {movieInfo.vote_count} Vote</p>
                  </div>
                </div>

                <div id="overview" className=" text-white    ">
                  <p className=" md:text-2xl sm:text-xl text-lg font-bold py-2   ">
                    Overview
                  </p>
                  <p
                    className={`${
                      movieInfo.overview.length >= 1380
                        ? "overflow-y-scroll "
                        : ""
                    } lg:h-64 md:h-48 sm:h-40 h-36   md:text-lg sm:text-base text-sm font-normal overflow-auto    `}
                  >
                    {movieInfo.overview}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderSubInfoSection = () => {
    return (
      <>
        <div className="  bg-white w-full h-full  ">
          <div className="flex  sm:flex-row  flex-col-reverse ">
            <div id="details " className="w-full  p-2 ">
              {renderDetail()}
            </div>
            <div id="trailer" className="w-full ">
              {renderTrailer()}
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderDetail = () => {
    return (
  
        <div className="w-full text-base text-black">
          <p className="text-xl font-bold">Details</p>
          <hr className="my-2" />
          <div className=" ">
            <div>
              <span className="font-semibold  ">Original Title : </span>
              <span>
                {movieInfo.original_title ? movieInfo.original_title : "-"}
              </span>
            </div>
            <div>
              <span className="font-semibold ">Status : </span>
              <span className=" ">
                {movieInfo.status ? movieInfo.status : "-"}
              </span>
            </div>
            <div>
              <span className="font-semibold ">Release date : </span>
              <span>
                {movieInfo.release_date ? movieInfo.release_date : "-"}
              </span>
            </div>
            <div>
              <span className="font-semibold ">Original Language : </span>
              <span>
                {movieInfo.original_language
                  ? movieInfo.original_language
                  : "-"}
              </span>
            </div>
            <div>
              <span className="font-semibold ">Time Duration : </span>
              <span>
                {movieInfo.runtime ? movieInfo.runtime + " Minutes" : "-"}
              </span>
            </div>
            <div>
              <span className="font-semibold">Budget : </span>
              <span>
                $
                {movieInfo.budget
                  ? movieInfo.budget.toLocaleString("en-US")
                  : "-"}
              </span>
            </div>
            <div>
              <span className="font-semibold">Revenue : </span>
              <span>
                $
                {movieInfo.budget
                  ? movieInfo.revenue.toLocaleString("en-US")
                  : "-"}
              </span>
            </div>
            <div>
              <span className="font-semibold ">Website : </span>
              {movieInfo.homepage ? (
                <a
                  className="underline"
                  href={movieInfo.homepage}
                  target="_blank"
                >
                  {movieInfo.homepage}
                  <OpenInNewIcon
                    className="text-yellow-400"
                    fontSize="medium"
                  />
                </a>
              ) : (
                "-"
              )}
            </div>
          </div>
        </div>
 
    );
  };

  const renderTrailer = () => {
    const trailer = movieInfo.videos.results.find(
      (vid) =>
        vid.name === "Official Trailer" ||
        vid.name === "Main Trailer" ||
        vid.name === "Teaser Trailer" ||
        vid.name === "Trailer"
    );

    return (
        <div className=" ">
          <div className="  w-full h-full flex justify-center items-center  p-2  ">
            {trailer && (
              <div className="h-full w-full  rounded-xl overflow-hidden   ">
                <Youtube
                  className=" sm:h-112 h-52  w-full "
                  videoId={trailer.key}
                  opts={{
                    height: "100%",
                    width: "100%",
                    playerVars: {
                      autoplay: 0,
                      origin: "https://mf-movie-info.netlify.app",
                    },
                  }}
                />
              </div>
            )}

            {!trailer && (
              <div className=" sm:block hidden   sm:h-112 h-52  w-full p-4  ">
                <div className="bg-gray-300 h-full w-full flex justify-center items-center text-black rounded-lg ">
                  <BlockIcon />
                  <p className=" text-lg font-semibold pl-1">No media</p>
                </div>
              </div>
            )}
          </div>
        </div>
    );
  };

  const renderCastSection = () => {
    return (
        <div className="w-full h-full">
          <CastSection />
        </div>
    );
  };

  return (
    <>
      <ScrollToTop />
      <div className="  w-full h-full ">
        {isLoading ? <OnLoadingScreen /> : renderMovieInfo()}
      </div>
    </>
  );
};

export default MovieInfoPage;
