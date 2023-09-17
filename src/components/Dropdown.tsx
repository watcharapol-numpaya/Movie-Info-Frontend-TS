import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../storage/slices/authSlice";
import { clearUserSliceState } from "../storage/slices/userSlice";

const Dropdown =()=> {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleSignOut = () => {
    dispatch(logout());
    dispatch(clearUserSliceState());
    location.reload()
  };

  return (
    <div className="relative">
      <div className="absolute z-10 bg-white h-8 w-8 -right-0 top-8 transform rotate-45"></div>
      <div className="absolute z-20 bg-white h-auto w-52 -right-2 top-10 rounded-lg shadow-2xl">
        <div className="w-full rounded-lg overflow-hidden">
          <div className="text-center  font-medium flex flex-col">
            <Link
              className={`hover:bg-gray-100 py-2 border-b ${
                user.length === 0 ? "block" : "hidden"
              }`}
              to="/sign-up"
            >
              Sign Up
            </Link>
            <Link
              className={`hover:bg-gray-100 py-2 border-b ${
                user.length === 0 ? "block" : "hidden"
              }`}
              to="/sign-in"
            >
              Sign In
            </Link>
            <Link
              className={`hover:bg-gray-100 py-2 border-b ${
                user.length === 0 ? "hidden" : "block"
              }`}
              to="/favorite-movie"
            >
              Favorite Movie
            </Link>
            <Link
              className={`hover:bg-gray-100 py-2 border-b ${
                user.length === 0 ? "hidden" : "block"
              }`}
              to="/"
              onClick={handleSignOut}
            >
              Sign Out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
