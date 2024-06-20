import React, { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/authContext";
import '../styles/dashboard.css';
import NavbarDashboard  from "./NavbarDashboard"
import { fetchProfileRoute } from "../utils/APIRoutes";
const DashBoard = () => {
  const { setuser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profile = await axios.get(
          fetchProfileRoute,
          {
            withCredentials: true,
          }
        );
        localStorage.setItem('profile', JSON.stringify(profile.data.data));
        setuser(profile.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProfile();
  }, []);

  return (
    <>
    <NavbarDashboard/>
    <ul class="cards">
    <li>
      <a href="/chat" class="card">
      <div className="card__image-container">
        <img src="https://plus.unsplash.com/premium_photo-1677252438450-b779a923b0f6?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="card__image" alt="" />
      </div>
        <div class="card__overlay">
          <div class="card__header">
            <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
            <img class="card__thumb" src="https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhdCUyMGFwcHxlbnwwfHwwfHx8MA%3D%3D" alt="" />
            <div class="card__header-text">
              <h3 class="card__title">Connect and Chat!!</h3>            
            </div>
          </div>
          <p class="card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
        </div>
      </a>      
    </li>
    <li>
      <a href="/products-dashboard" class="card">
      <div className="card__image-container">
        <img src="https://plus.unsplash.com/premium_photo-1683746792239-6ce8cdd3ac78?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGUlMjBjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D" class="card__image" alt="" />
      </div>
        <div class="card__overlay">        
          <div class="card__header">
            <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                 
            <img class="card__thumb" src="https://plus.unsplash.com/premium_photo-1683798464819-d1376249293e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww" alt="" />
            <div class="card__header-text">
              <h3 class="card__title">Shop Now!!</h3>
              
            </div>
          </div>
          <p class="card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
        </div>
      </a>
    </li>
    <li>
      <a href="" class="card">
      <div className="card__image-container">
        <img src="https://plus.unsplash.com/premium_photo-1676922908970-7513c1e043d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEzfHx0cmFkaW5nfGVufDB8fDB8fHww" class="card__image" alt="" />
      </div>
        <div class="card__overlay">
          <div class="card__header">
            <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
            <img class="card__thumb" src="https://plus.unsplash.com/premium_photo-1663931932688-86ce797dcccb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQxfHx0cmFkaW5nfGVufDB8fDB8fHww" alt="" />
            <div class="card__header-text">
              <h3 class="card__title">Invest Now!!</h3>           
            </div>
          </div>
          <p class="card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
        </div>
      </a>
    </li>
    <li>
      <a href="" class="card">
      <div className="card__image-container">
        <img src="https://i.imgur.com/2DhmtJ4.jpg" class="card__image" alt="" />
        </div>
        <div class="card__overlay">
          <div class="card__header">
            <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                 
            <img class="card__thumb" src="https://i.imgur.com/sjLMNDM.png" alt="" />
            <div class="card__header-text">
              <h3 class="card__title">kim Cattrall</h3>
              <span class="card__status">3 hours ago</span>
            </div>          
          </div>
          <p class="card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
        </div>
      </a>
    </li>    
  </ul>
  </>
  );
};

export default DashBoard;
