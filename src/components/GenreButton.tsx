import React from "react";

const GenreButton =({ genre, onSelect, isSelected })=> {
  const handleCheckboxChange = () => {
    onSelect(genre.id, !isSelected);
  };

  return (
    <>
      <button
        onClick={handleCheckboxChange}
        className={`   rounded-full p-1 px-3 cursor-pointer ${
          isSelected ? "bg-yellow-400" : "bg-gray-200"
        }`}
      >
        <input type="checkbox" checked={isSelected} onChange={() => {}} />  {genre.name}
      
      </button>
    </>
  );
}

export default GenreButton;
