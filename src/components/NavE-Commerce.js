import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from "axios";
import '../styles/NavbarDashboard.css';
import {getFullProfileRoute} from "../utils/APIRoutes"
import {logOutRoute} from "../utils/APIRoutes"

const NavECommerce =() => {
    const [profile,setProfile]=useState(null);
  const Navigate=useNavigate();

  useEffect(()=>{
    const fetchProfile = async () => {
        try {
          const response = await axios.get(getFullProfileRoute, {
            withCredentials: true
          });
          console.log(response.data.data.Items[0].data);
          setProfile(response.data.data.Items[0].data);
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      };
      fetchProfile();
  },[])
  const handlelogout= async (e)=>{
    e.preventDefault();
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
  const handleLogoClick=()=>{
    Navigate("/dashboard")
  }
  return (
    <nav className="navbar">
      <div className="navbar__logo" onClick={()=>{handleLogoClick()}}>MACH 1</div>
      <ul className="navbar__links mr-5">
      {/* <li><a href="/cart">Cart</a></li>
      <li><a href="/orders">Orders</a></li>
      <li><a href="/wishlist">Wishlist</a></li> */}
      <li><a href="/products-dashboard">Dashboard</a></li>
      <li>
          <a href="/cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
              <path d="M0 1a1 1 0 0 1 1-1h1.11a1 1 0 0 1 .978.78L3.89 3H14a1 1 0 0 1 .98 1.197l-1.5 8A1 1 0 0 1 12.5 13H4a1 1 0 0 1-.98-.803L1.61 1.607A1 1 0 0 1 0 1zm2.89 2 .55 3H12.5a1 1 0 0 0 .98-.803L14.78 4H3.439l-.55-3H1zm11.621 8 .59-3.149-9.25-.001-.59 3.15H14.51z"/>
            </svg>
            Cart
          </a>
        </li>
        <li>
          <a href="/orders">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-seam" viewBox="0 0 16 16">
              <path d="M8.612 1.104a.5.5 0 0 0-.224 0l-7 2.5a.5.5 0 0 0-.288.645l1 3a.5.5 0 0 0 .316.316l.72.24L1.94 9.27A.5.5 0 0 0 1.5 10v4a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.44-.732l-1.696-.566.72-.24a.5.5 0 0 0 .316-.316l1-3a.5.5 0 0 0-.288-.645l-7-2.5zM8 2.648 13.277 4 8 5.935 2.723 4 8 2.648zm.447 4.825-6.564 2.19L1 6.302l6.553-2.19L8.447 7.473zm-.894 0L7 4.112l6.553 2.19-.883 3.036-6.564-2.19zm-6.72 5.108L1 10.904v3.596h1v-2.498l-.883-.296zM2.618 12h10.764l1.5 4.5H1.118L2.618 12z"/>
            </svg>
            Orders
          </a>
        </li>
        <li>
          <a href="/wishlist">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
              <path d="M8 13.247l-.548-.431C3.465 9.719 1 7.21 1 4.5 1 2.42 2.42 1 4.5 1 5.74 1 6.918 1.81 7.625 2.881L8 3.5l.375-.619C9.082 1.81 10.26 1 11.5 1 13.58 1 15 2.42 15 4.5c0 2.71-2.465 5.219-6.452 8.316L8 13.247zM4.5 2C3.12 2 2 3.12 2 4.5c0 2.174 2.19 4.518 6 7.2 3.81-2.682 6-5.026 6-7.2C14 3.12 12.88 2 11.5 2c-1.136 0-2.258.73-3.093 1.789L8 4.5l-.407-.711C6.758 2.73 5.636 2 4.5 2z"/>
            </svg>
            Wishlist
          </a>
        </li>
      {profile !== null && profile.isSeller && (
        <li><a href="/post-products">Add Products</a></li>
      )}
        <li><a href="/profile">Profile</a></li>
        <li><button className="btn-logout" onClick={(e) => {
            handlelogout(e);
        }}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default NavECommerce;