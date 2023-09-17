import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMovies,
  getPopularMovies,
  getTrendingMovies,
} from "../storage/slices/movieSlice";
import MovieCard from "../components/MovieCard";
import "react-multi-carousel/lib/styles.css";
import AppPagination from "../components/AppPagination";
import GenreSection from "../features/GenreSection";
import MovieCarouselCard from "../features/MovieCarouselCard";
import TuneIcon from "@mui/icons-material/Tune";
import useMediaQuery from "@mui/material/useMediaQuery";
import OnLoadingScreen from "../components/OnLoadingScreen";
 
const HomePage =()=> {
  const dispatch = useDispatch();
  const { trendingMovies, popularMovies, allMovie, totalPages } =
    useSelector((state) => state.movies);
  const { selectedGenres } = useSelector((state) => state.genre);
  const [page, setPage] = useState(1);
  const [bannerUrl, setBannerUrl] = useState(
    "https://www.themoviedb.org/t/p/w1280"
  );
  const [isShowMobileGenreSection, setIsShowMobileGenreSection] = useState(false);
  const isLgScreen = useMediaQuery("(min-width:1024px)");
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const limitedTotalPages = totalPages > 500 ? 500 : totalPages;

  useEffect(() => {
    // Hide the genre card automatically when the screen size is greater than "lg"
 
    if (!isLgScreen) {
      handleCloseMobileGenreSection()
    }    
  }, [isLgScreen]);

  const handleCloseMobileGenreSection = ()=>{
    setIsShowMobileGenreSection(false);
  }


  useEffect(() => {
    Promise.all([
      dispatch(getTrendingMovies()),
      dispatch(getPopularMovies()),
      handleGetMovie(),
    ])
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [page]);

  // Random backdrop image
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(() =>
        Math.floor(Math.random() * trendingMovies.length)
      );
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [trendingMovies]);

  const handleGetMovie = (genre) => {
    let data = { page: page, genre: selectedGenres };
 
    dispatch(getAllMovies(data));
  };

  const renderHomePage = () => {
    return (
      <>
        <div className="w-full sm:h-112 h-56  relative">
          {/* <div className=" absolute inset-y-0 left-0  sm:w-1/4 w-1/12 bg-gradient-to-l from-transparent to-black"></div>
          <div className=" absolute inset-y-0 right-0 sm:w-1/4 w-1/12 bg-gradient-to-r from-transparent to-black"></div> */}

          <div className="absolute sm:bottom-12 bottom-6 sm:pl-6 pl-3">
            <p
              style={{ textShadow: "3px 3px black" }}
              className="text-white cursor-pointer font-semibold sm:text-4xl  md:text-5xl text-xl drop-shadow-2xl  "
            >
              {trendingMovies[currentImageIndex].title}
            </p>
          </div>

          {popularMovies && (
            <img
              className="w-full h-full object-cover   "
              src={`${bannerUrl}/${trendingMovies[currentImageIndex].backdrop_path}`}
              alt="Banner Image"
            ></img>
          )}
        </div>
        <div className="flex lg:flex-row flex-col w-full h-full bg-white  flex-wrap mx-auto   ">
          <div className="w-full ">
            <MovieCarouselCard
              title={"trending"}
              movies={trendingMovies}
            />
            <MovieCarouselCard
              title={"popular"}
              movies={popularMovies}
            />
            <div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-600 to-black text-white relative ">
                <span className="font-semibold text-2xl  uppercase  ">
                  Movies
                </span>
                {/* Genre card mobile */}
                <button
                  className="lg:hidden block"
                  onClick={() => {
                    setIsShowMobileGenreSection(!isShowMobileGenreSection);
                  }}
                >
                  <TuneIcon />
                </button>

                <div
                  className={`absolute bg-white shadow-xl p-2 rounded-xl w-64 right-4 top-14 z-10 ${
                    isLgScreen
                      ? "hidden"
                      : isShowMobileGenreSection
                      ? "block"
                      : "hidden"
                  }`}
                >
                  <GenreSection onSelectGenre={handleGetMovie} onCloseDropdown={handleCloseMobileGenreSection}/>
                </div>
              </div>
              <div className="flex">
                <div id="all-movie" className="lg:w-3/4 w-full ">
                  <div className=" flex justify-center w-full my-2 ">
                    <AppPagination
                      setPage={setPage}
                      page={page}
                      numberOfPage={limitedTotalPages}
                    />
                  </div>
                  <div
                    id="item-container"
                    className={`flex  flex-wrap xl:gap-6 gap-4   justify-center  `}
                  >
                    {allMovie &&
                      allMovie.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                      ))}
                    <div className=" flex justify-center w-full mb-4">
                      <AppPagination
                        setPage={setPage}
                        page={page}
                        numberOfPage={limitedTotalPages}
                      />
                    </div>
                  </div>
                </div>
                <div
                  id="genre-card"
                  className="lg:block hidden w-1/4 bg-gray-100 p-2  "
                >
                  <GenreSection onSelectGenre={handleGetMovie} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className=" h-full bg-white">
        <div className=" xl:container  mx-auto  ">
          {isLoading ? <OnLoadingScreen /> : renderHomePage()}
        </div>
        {/* <Footer/> */}
      </div>
    </>
  );
}

export default HomePage;
