import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../styles/NavbarDashboard.css';
import {logOutRoute} from "../utils/APIRoutes"

const NavbarDashboard =() => {
  const Navigate=useNavigate();
  const handlelogout= async (e)=>{
    e.preventDefault();
    console.log("hehe");
    try{
      window.localStorage.clear();

      const response=await axios.get(logOutRoute,{
        withCredentials:true
      });
      if(response.status===200){
        Navigate('/login');
      }
    }catch(err){
      console.log(err);
    }
  }
  return (
    <nav className="navbar">
      <div className="navbar__logo">MACH 1</div>
      <ul className="navbar__links mr-5">
        <li><a href="/profileDashboard">Profile</a></li>
        <li><button className="btn-logout" onClick={(e) => {
            handlelogout(e);
        }}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default NavbarDashboard;