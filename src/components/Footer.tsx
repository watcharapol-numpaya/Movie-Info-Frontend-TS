import React from "react";

const Footer =()=> {
  return (
    <>
      <div className="h-44 w-full bg-black flex pl-6 pr-2 text-yellow-400 ">
        <div className="h-full flex items-center  justify-center">
          <h1 className="font-extrabold text-4xl tracking-widest">
            MOVIEINFO
          </h1>
        </div>

        <div className=" grid grid-cols-3  h-1/2 w-3/4 items-center gap-1 ml-6 self-center  ">
          <div className="flex items-center w-56 ">
            <div className="h-8 w-8 bg-red-400 rounded-full "></div>
            <a href="https://www.w3schools.com" className="pl-5  ">MovieInfo Official</a>
          </div>
          <div className="flex items-center w-56 ">
            <div className="h-8 w-8 bg-red-400 rounded-full "></div>
            <p className="pl-4">movieInfo Official</p>
          </div>
          <div className="flex items-center w-60 ">
            <div className="h-8 w-8 bg-red-400 rounded-full "></div>
            <p className="pl-4">02-111-1234</p>
          </div>
          <div className="flex items-center w-56 ">
            <div className="h-8 w-8 bg-red-400 rounded-full "></div>
            <p className="pl-4">MovieInfo_Tweets</p>
          </div>
          <div className="flex items-center w-60 ">
            <div className="h-8 w-8 bg-red-400 rounded-full "></div>
            <p className="pl-4">movie@movieInfo.com</p>
          </div>
        </div>

        <div className="flex w-96 justify-end pr-8 pt-4">
          <div className="h-20 w-20 bg-yellow-400 rounded-full"></div>
        </div>
      </div>
    </>
  );
}

export default Footer;
