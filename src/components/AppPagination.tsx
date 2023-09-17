import React from "react";
import { Pagination } from "@mui/material";

const AppPagination = ({ setPage, page, numberOfPage }) => {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Pagination
        color="primary"
        onChange={handleChange}
        page={page}
        count={numberOfPage}
      />
    </>
  );
};

export default AppPagination;
