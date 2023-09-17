import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  clearIsRegisterPassState,
  logout,
  signInUser,
} from "../storage/slices/authSlice";
import { getFavoriteMovieId } from "../storage/slices/userSlice";
import { decodeUser } from "../services/jwtTokenService";
import ScrollToTop from "../components/ScrollToTop";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const userData = { username, password };
    dispatch(signInUser(userData))
      .unwrap()
      .then((res) => {
        dispatch(getFavoriteMovieId(decodeUser(res.refresh_token).user_id));
        navigate("/");
      });
  };

  useEffect(() => {
    //handle user who navigate to sign-in without logout before
    dispatch(logout());
    return () => {
      dispatch(clearIsRegisterPassState());
    };
  }, []);

  const renderSignIn = () => {
    return (
      <div className="xl:container mx-auto  ">
        <div className="flex items-center justify-center sm:min-h-screen bg-gray-100  ">
          <div className="bg-white rounded-lg shadow-md p-8 sm:w-96 w-full sm:h-full h-screen">
            <div className="w-full flex justify-center pb-6">
              <span className="tracking-widest0.25 font-bold text-lg text-yellow-400">
                MOVIEINFO
              </span>
            </div>
            <h1 className="text-2xl font-semibold mb-6 text-center">Sign In</h1>
            <form className="space-y-4" onSubmit={handleSignIn}>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-xs text-red-500 pl-1">{message}</p>
              <button
                type="submit"
                className="w-full py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition duration-300"
              >
                Sign In
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm">
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-yellow-500 hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <ScrollToTop />
      <div className="bg-gray-100">{renderSignIn()} </div>
    </>
  );
};

export default SignInPage;
