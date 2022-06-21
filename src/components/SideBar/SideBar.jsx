import React ,{useState} from "react";
import "./SideBar.css";
import { LineStyle ,Edit,People,Payment ,FilterList,LocationOn,AutoAwesome,Forum,Quiz,Campaign,Language,Person,SupportAgent,Logout,ArrowForwardIos} from "@mui/icons-material";
import img from "../../images/Group.png";
import {Link} from 'react-router-dom'
const SideBar = () => {
  const [isActive, setActive] = useState("false");
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <div className="sideBar">
      <div className="sideBarWrapper">
        <div className="d-flex justify-content-center w-100">
          <img src={img} alt="" className="imgSide" />
        </div>
        <ul className="sideBarList ms-3 mt-4">
          <li className="sideBarListItem active">
         <Link to='/home'><LineStyle className="me-2 icon" />
            Dashboard
         </Link>
          </li>
          <li className="sideBarListItem">
            <Edit className="me-2"/>
            Permissions
          </li>
          <li className="sideBarListItem">
            <People className="me-2" />
            Users
          </li>
          <li className="sideBarListItem">
            <Payment className="me-2"/>
            Subscription
          </li>
          <li className="sideBarListItem">
            <FilterList className="me-2" />
            Content Mangement
          </li>
          <li className="sideBarListItem">
            <LocationOn className="me-2"/>
            Geography
            <ArrowForwardIos onClick={handleToggle} className="forward"/>
            
        <ul className={` subList collapse ${isActive ? "d-block" : "collapse"}`} id="geography">  
      <div>
   
          <li>
          <Link to='/country' className=''>Country</Link>

          </li>
          <li>
            <a href="#" className=''>City</a>
          </li>
          <li>
            <a href="#" className=''>Government</a>
          </li>
      </div>
        </ul>

          </li>
                <li className="sideBarListItem">
            <AutoAwesome className="me-2" />
            Needs
          </li>
          <li className="sideBarListItem">
            <Forum className="me-2"/>
            Chat
            <ArrowForwardIos className="forward"/>
            </li>
            <li className="sideBarListItem">
            <Quiz  className="me-2" />
            Test
            <ArrowForwardIos className="forward"/>
            </li>
            <li className="sideBarListItem">
            <Campaign  className="me-2"/>
            About Us
            </li>
            <li className="sideBarListItem">
            <Language className="me-2"/>
            Languages
            </li>
            <li className="sideBarListItem">
            <Person className="me-2"/>
            My profile
            </li>
            <li className="sideBarListItem">
            <SupportAgent className="me-2"/>
            Customer Service
            </li>
            <li className="sideBarListItem">
            <Logout className="me-2"/>
           Logout
            </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
