import React, { useState, useEffect, useContext } from "react";
import Lottie from "lottie-react";
import conversation from "../assets/animation.json";
import styled from "styled-components";
import { AuthContext } from "../contexts/authContext";
import "../styles/noSelected.css";

function NoSelectedContact() {
  const context = useContext(AuthContext);
  const profile=localStorage.getItem('profile');
  const userid=JSON.parse(profile).userID;
  // const CurrentUser = context.user.userID;
  const CurrentUser=userid;

  const [user, setUser] = useState("");
  const getUser = () => {
    const existing = CurrentUser;
    console.log(user);
    if (existing) {
      setUser(existing);
      console.log(user);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="Container-NoSelect">
      <Lottie animationData={conversation} loop={true} />
      <h1>Welcome, to X !</h1>
      <h3>Please select a chat to Start chatting like never before.</h3>
    </div>
  );
}

export default NoSelectedContact;
