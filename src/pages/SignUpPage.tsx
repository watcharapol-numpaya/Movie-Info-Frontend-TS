import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Validation from "../services/Validation";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  registerUser,
} from "../storage/slices/authSlice";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameMsg, setUsernameMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [confirmPasswordMsg, setConfirmPasswordMsg] = useState("");
  const [msg, setMsg] = useState("");
  const { isRegisterPass, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    if (isRegisterPass) {
      navigate("/sign-in");
    }
  }, [isRegisterPass]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (
      Validation.getValidateUsername(username) &&
      Validation.getValidatePassword(password) &&
      Validation.getValidateConfirmPassword(password, confirmPassword)
    ) {
      let userData = await { username: username, password: password };
      await dispatch(registerUser(userData));
    } else {
      setMsg("Invalid information.");
    }
  };

  const handleUsername = (e) => {
    let username = e.target.value;
    setUsername(username);
    if (Validation.getValidateUsername(username)) {
      setUsernameMsg("");
    } else {
      setUsernameMsg("Username must be 3-15 characters and no spaces.");
    }
  };

  const handlePassword = (e) => {
    let password = e.target.value;
    setPassword(password);
    if (Validation.getValidatePassword(password)) {
      setPasswordMsg("");
    } else {
      setPasswordMsg(
        "Password must include 1 lowercase (a-z), 1 uppercase (A-Z), and 8-128 characters."
      );
    }
  };

  const handleConfirmPassword = (e) => {
    let confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    if (Validation.getValidateConfirmPassword(password, confirmPassword)) {
      setConfirmPasswordMsg("");
    } else {
      setConfirmPasswordMsg("Passwords do not match.");
    }

    setConfirmPassword(e.target.value);
  };

  const renderSignUpPage = () => {
    return (
      <div className="xl:container mx-auto  ">
        <div className="flex items-center justify-center sm:min-h-screen bg-gray-100  ">
          <div className="bg-white rounded-lg shadow-md p-8 sm:w-96 w-full sm:h-full h-screen">
            <div className="w-full flex justify-center pb-6">
              <span className="tracking-widest0.25 font-bold text-lg text-yellow-400">
                MOVIEINFO
              </span>
            </div>
            <h1 className="text-2xl font-semibold mb-6 text-center">Sign Up</h1>
            <form className="space-y-3" onSubmit={handleSignUp}>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={username}
                onChange={handleUsername}
              />
              <p className="text-xs text-red-500 pl-1">{usernameMsg}</p>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={password}
                onChange={handlePassword}
              />
              <p className="text-xs text-red-500 pl-1">{passwordMsg}</p>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={confirmPassword}
                onChange={handleConfirmPassword}
              />
              <p className="text-xs text-red-500 pl-1">{confirmPasswordMsg}</p>
              <p className="text-xs text-red-500 pl-1">{message}</p>
              <button
                type="submit"
                className="w-full py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition duration-300"
              >
                Sign Up
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm">
                Already have an account?{" "}
                <Link to="/sign-in" className="text-yellow-500 hover:underline">
                  Sign In
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
      <div>{renderSignUpPage()}</div>
    </>
  );
};

export default SignUpPage;
