import React, { useEffect, useRef, useState } from "react";
import SearchSection from "../features/SearchSection";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useDispatch, useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import { getFavoriteMovieId } from "../storage/slices/userSlice";
import ScrollToTop from "./ScrollToTop";

const Navbar = () => {
  const [isShow, setIsShow] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleShowDropDown = () => {
    setIsShow(!isShow);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsShow(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (user.length !== 0) {
      dispatch(getFavoriteMovieId(user.user_id));
    }
  }, []);
  
  const renderNavbar = () => {
    return (
      <>
        <div className="flex h-full w-full justify-between items-center text-yellow-400  ">
          <div className="flex items-center  cursor-pointer">
            {/* <i className="material-icons text-4xl mr-4">menu</i> */}
            <Link to="/home">
              <span className="tracking-widest0.25 font-bold text-lg">
                MOVIEINFO
              </span>
            </Link>
          </div>

          <div id="searchBox" className="md:block hidden h-full w-96  ">
            <SearchSection />
          </div>

          <ul className="flex  h-full  items-center justify-end space-x-2 text-black">
            <li className="md:hidden flex  h-12 w-12 bg-yellow-400  rounded-full  items-center justify-center  cursor-pointer ">
              <Link to="/mobile-search-page">
                <i className="material-icons -scale-x-90 text-black text-3xl">
                  search
                </i>
              </Link>
            </li>
            <li className="lg:flex hidden invisible  h-12 w-12 bg-yellow-400  rounded-full  items-center justify-center  cursor-pointer"></li>

            <li
              className="h-12 w-12 bg-yellow-400  rounded-full flex items-center justify-center  cursor-pointer"
              onClick={handleShowDropDown}
            >
              <div
                ref={dropdownRef}
                className="   w-12 h-12 flex justify-center items-center rounded-full"
              >
                {user.username ? (
                  <p className="uppercase font-semibold text-xl ">
                    {user.username.substring(0, 2)}{" "}
                  </p>
                ) : (
                  <PersonIcon fontSize="large" />
                )}

                {isShow && <Dropdown />}
              </div>
            </li>
          </ul>
        </div>
      </>
    );
  };

  return (
    <>
      <ScrollToTop />
      <div className=" mx-auto sm:h-16 h-18  bg-black  px-4">
        {renderNavbar()}
      </div>
    </>
  );
};

export default Navbar;
