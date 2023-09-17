import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ImageNotFound from "./ImageNotFound";
const CastCard = ({ cast }) => {
  const [imageUrl, setImageURL] = useState(
    "https://www.themoviedb.org/t/p/w780"
  );

  return (
    <>
      <Link
        to={`/castInfo/${cast.id}`}
        className="rounded-xl overflow-hidden shadow-xl"
      >
        <div className="w-44 h-80 bg-white px-3 pt-3 rounded-xl   ">
          <div className="w-full  flex justify-center   ">
            <div className=" w-40 h-52 rounded-lg  overflow-hidden">
              {cast.profile_path ? (
                <img
                  className=" w-40 h-52 rounded-lg "
                  src={`${imageUrl}/${cast.profile_path}`}
                  alt={cast.name}
                  loading="lazy"
                />
              ) : (
                <ImageNotFound />
              )}
            </div>
          </div>
          <div className="    ">
            <p className="font-semibold text-base">{cast.name}</p>
            <p className="font-thin text-xs  ">{cast.character}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CastCard;
