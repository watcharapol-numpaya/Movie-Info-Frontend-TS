import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MovieListCard from "../components/MovieListCard";

const ViewAllSearchResultPage = () => {
  const { searchList } = useSelector((state) => state.movies); //receive data from search
  const { keyword } = useParams();

  return (
    <div className=" ">
      <MovieListCard
        movies={searchList}
        title="Result"
        notFoundTitle={keyword}
      />
    </div>
  );
};

export default ViewAllSearchResultPage;
