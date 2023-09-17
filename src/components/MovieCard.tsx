import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link, useNavigate } from "react-router-dom";
import ImageNotFound from "./ImageNotFound";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteMovie,
  removeFavoriteMovie,
  removeFavoriteMovieId,
  removeMovieFromFavoriteMovies,
  sendFavoriteMovieId,
} from "../storage/slices/userSlice";

const  MovieCard =({ movie })=> {
  const [imageUrl, setImageURL] = useState(
    "https://www.themoviedb.org/t/p/w780"
  );
 
  const dispatch = useDispatch();
  const { favoriteMovieIdList } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const checkIsFavorite = favoriteMovieIdList ? favoriteMovieIdList.includes(movie.id) : false;
   
   
  const navigate = useNavigate();
  const handleAddFavoriteMovie = (movieId, event) => {
    event.preventDefault(); // Prevent link navigation
    event.stopPropagation(); // Prevent event propagation to parent Link
    console.log(user);
    if (user.length === 0) {
      return setTimeout(() => {
        navigate("/sign-in");
      }, 300);
    }
    
    const data = {
      user_id: user.user_id,
      movieId: movieId, //id to add
    };
 
    dispatch(addFavoriteMovie(movieId));
    dispatch(sendFavoriteMovieId(data));
 
  };

  
  const handleRemoveFavoriteMovie = (movieId, event) => {
    event.preventDefault(); // Prevent link navigation
    event.stopPropagation(); // Prevent event propagation to parent Link
 
    const data = {
      user_id: user.user_id,
      movieId: movieId, //id to remove
    };
    
    dispatch(removeFavoriteMovie(movieId)); //remove id from favoriteMovieIdList
    dispatch(removeFavoriteMovieId(data)); //remove id from database
    dispatch(removeMovieFromFavoriteMovies(movieId)) //remove item from favoriteMovies
  };

  return (
    <>
      <Link to={`/movieInfo/${movie.id}`}>
      
        <div className="flex flex-col bg-white shadow-xl rounded-xl sm:h-96 sm:w-52 xsm:h-80 xsm:w-44 h-72 w-40 border-t border-gray-100 sm:hover:scale-105 p-2 relative   ">
          <div className="sm:w-48 sm:h-72  xsm:w-40 xsm:h-60 w-36  h-54 rounded-xl overflow-hidden  ">
            {movie.poster_path ? (
              <img
                className=" h-full w-full "
                alt="poster"
                src={imageUrl + movie.poster_path}
              />
            ) : (
              <ImageNotFound className=" " />
            )}
          </div>
          <div
            className={`${checkIsFavorite ? "block" : "hidden"} `}
            onClick={(event) => {
              handleRemoveFavoriteMovie(movie.id, event);
            }}
          >
            <FavoriteIcon
              className={`absolute top-2 right-3 m-1 text-yellow-300 `}
            />
          </div>
          <div
            className={`${checkIsFavorite ? "hidden" : "block"} `}
            onClick={(event) => {
              handleAddFavoriteMovie(movie.id, event);
            }}
          >
            <FavoriteBorderIcon
              className={`absolute top-2 right-3 m-1 text-yellow-300`}
            />
          </div>
          <span className="font-medium pt-1 px-1  sm:text-base text-sm  overflow-hidden text-black">
            {movie.title}
          </span>
          <div className="absolute  rounded-r-lg text-black bg-amber-400 h-8 w-12 left-0 bottom-24 flex items-center justify-center">
            <span id="vote-point">{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </Link>
    </>
  );
}

export default MovieCard;
