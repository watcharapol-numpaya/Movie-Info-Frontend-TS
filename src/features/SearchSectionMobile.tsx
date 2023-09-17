import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearKeyword, getMovieByKeyword } from "../storage/slices/movieSlice";
import SearchCard from "../components/SearchCard";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import {setKeyword} from '../storage/slices/movieSlice'

const  SearchSectionMobile =()=> {
  const [showSearchCard, setShowSearchCard] = useState(false);
  const onType = useRef(null);
  const isMobileScreen = useMediaQuery("(max-width:767px)");
  const dispatch = useDispatch();
  const { searchList, keyword } = useSelector((state) => state.movies);
  const limitedData = searchList.slice(0, 5);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isMobileScreen) {
      navigate(-1);
    }
  }, [isMobileScreen]);

  const handlePressCancel = () => {
    dispatch(clearKeyword())
    navigate(-1);
  };

  const handlePressEnter = (e) => {
    if (e.key === "Enter" && keyword.trim() !== "") {
      navigate(`/all-result/${keyword}`);
    }
  };

  const handleSearch = (e) => {
    dispatch(setKeyword(e.target.value));
    dispatch(getMovieByKeyword(e.target.value.trim()));
    setShowSearchCard(true); // Show the search card when typing in the input box
  };

  const handleIsShowSearchMovieCard = () => {
    return limitedData.length !== 0;
  };

  const handleInputClick = () => {
    setShowSearchCard(true);
  };

  const handleClearText = () => {
    dispatch(clearKeyword())
    dispatch(getMovieByKeyword(""));
    onType.current.focus();
  };

 
  const handleClickOutsideInput = (e) => {

    //onType.current เก็บค่าของ ref ใช้ tag input
    //e.target เก็บค่า element ที่ได้กดจากตรงไหนก็ตามผ่าน handleClickOutsideInput
    //onType.current.contains(e.target) เช็คว่า ค่าใน input.current กับ onType.current.contains(e.target) ตรงกันไหม

    if (onType.current && !onType.current.contains(e.target)) {
      setShowSearchCard(false);
    }
  };

  const handleScroll = () => {
    if (onType.current) {
      onType.current.blur();
    }
  };

  useEffect(() => {
    onType.current.focus();
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideInput);
    window.addEventListener("scroll", handleScroll);

    // handleScroll();
    return () => {
      document.removeEventListener("click", handleClickOutsideInput);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const renderSearchMovieCard = () => {
    return (
      <div className="bg-white text-black w-80 rounded-lg overflow-hidden shadow-2xl mt-1">
        {limitedData &&
          limitedData.map((movie) => (
            <SearchCard key={movie.id} movie={movie} />
          ))}
        <div className="text-center py-1 cursor-pointer">
          <Link
            className="hover:text-black text-gray-600"
            to={`/all-result/${keyword}`}
          >
            View all results
          </Link>
        </div>
      </div>
    );
  };
 

  return (
    <>
      <div className="  w-full  h-full">
        <div className=" w-full h-full py-2 px-1 flex justify-center ">
          <div className="   flex flex-col items-center  ">
            <div className="flex">
              <div className="  flex justify-center bg-yellow-400   rounded-full  overflow-hidden   ">
                <div className="  flex items-center justify-center bg-yellow-400   h-12 w-12 pl-2  cursor-pointer">
                  <span className="material-icons -scale-x-90 text-black text-3xl">
                    search
                  </span>
                </div>
                <div className="bg-white rounded-full w-full  flex ">
                  <input
                    ref={onType}
                    onClick={handleInputClick}
                    onChange={handleSearch}
                    onKeyDown={handlePressEnter}
                    placeholder="Search movie"
                    className="outline-none text-black  w-full py-1 h-full text-xl   pl-3      rounded-l-full "
                    type="text"
                    value={keyword}
                     
                  />
                  <div
                    onClick={handleClearText}
                    className=" flex items-center justify-center   rounded-r-full   h-12 w-12    cursor-pointer"
                  >
                    <span className="material-icons -scale-x-90 text-black  " onClick={handleClearText}>
                      cancel
                    </span>
                  </div>
                </div>
              </div>
              <div
                onClick={handlePressCancel}
                className="h-full flex px-2  items-center bg-yellow-400 rounded-full ml-1 "
              >
                <p className="font-semibold text-black">Cancel</p>
              </div>
            </div>
            {showSearchCard && (
              <div id="search-card" className=" ">
                {handleIsShowSearchMovieCard() ? renderSearchMovieCard() : ""}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchSectionMobile;
