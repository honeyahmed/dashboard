import React from "react";
import img from "../../images/img.png";
import "./TopBar.css";
const TopBar = () => {
  return (
    <div className="topBar mt-3">
      <div className="d-flex">
        <img src={img} alt="" className="topAvatar" />

 
       <h6 className="topText ms-2 mt-4">AR Shakir</h6>

      </div>
    </div>
  );
};

export default TopBar;
