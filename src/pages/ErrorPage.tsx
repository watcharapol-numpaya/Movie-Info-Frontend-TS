import React from "react";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
const ErrorPage = () => {
  return (
    <div className="xl:container mx-auto   h-screen w-screen ">
      <div className=" flex justify-center items-center  w-full h-full sm:p-0 pb-56 ">
        <span className="text-black text-2xl font-semibold ">
          404 NOT FOUND
        </span>
        <PriorityHighIcon />
      </div>
    </div>
  );
};

export default ErrorPage;
