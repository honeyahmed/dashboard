import React,{useEffect} from "react";
import SideBar from "./components/SideBar/SideBar";
import TopBar from "./components/TopBar/TopBar";
import "./app.css";
import Home from "./components/Home/Home";
import { Route, Routes, useLocation } from "react-router-dom";

import Login from "./components/Login/Login";
import CountryTable from "./components/CountryTable/CountryTable";

const App = () => {
  const location = useLocation();
  
  return (
    <>
      <div className="d-flex">
        {
          location.pathname==='/login' ?(
         <Login/>):( <SideBar/>
       ) }
        <div className="container ">
          <div className="w-100">
            <TopBar />
          </div>
          <Routes>

            <Route path="home" element={<Home />} />
            <Route path="country" element={<CountryTable />} />
          </Routes>
        </div>
      </div>
  
     
    </>
  );
};

export default App;
