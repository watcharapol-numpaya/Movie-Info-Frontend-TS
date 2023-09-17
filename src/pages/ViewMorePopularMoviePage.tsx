import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieListCard from "../components/MovieListCard";
import OnLoadingScreen from "../components/OnLoadingScreen";
import { getPopularMovies } from "../storage/slices/movieSlice";
import ScrollToTop from "../components/ScrollToTop";

const ViewMorePopularMoviePage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const { popularMovies } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(getPopularMovies())
      .unwrap()
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <ScrollToTop /> 
      <div className=" ">
        {isLoading ? (
          <OnLoadingScreen />
        ) : (
          <MovieListCard movies={popularMovies} title={"Popular"} />
        )}
      </div>
    </>
  );
};

export default ViewMorePopularMoviePage;
