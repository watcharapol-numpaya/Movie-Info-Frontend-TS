import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingMovies } from "../storage/slices/movieSlice";
import OnLoadingScreen from "../components/OnLoadingScreen";
import MovieListCard from "../components/MovieListCard";
import ScrollToTop from "../components/ScrollToTop";

const ViewMoreTrendingMoviePage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { trendingMovies } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(getTrendingMovies())
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
          <MovieListCard movies={trendingMovies} title={"trending"} />
        )}
      </div>
    </>
  );
};

export default ViewMoreTrendingMoviePage;
