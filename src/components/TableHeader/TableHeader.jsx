import React, { useState, useEffect } from "react";
import "./TableHeader.css";
import AddIcon from "@mui/icons-material/Add";
const TableHeader = ({ title, desc, handleOpen }) => {
  return (
    <>
      <div className="d-flex justify-content-between mt-3 mb-3 headerTable p-3">
        <div>
          <h6>{title}</h6>
        </div>
        <div className="desc d-flex">
          <div className="descCircle">
            <AddIcon className="icon" onClick={handleOpen} />
          </div>
          <p>{desc}</p>
        </div>
      </div>
    </>
  );
};
export default TableHeader;
