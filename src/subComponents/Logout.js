import React from "react";
import { useNavigate } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import styled from "styled-components";
import axios from "axios";
import { closeChatRoute } from "../utils/APIRoutes";

export default function Logout() {
  const navigate = useNavigate();
  const userID = JSON.parse(localStorage.getItem("profile")).userID;
  console.log(userID);
  const handleClick = async () => {
    const data = await axios.get(
      closeChatRoute,
      {
        userID,
      },
      {
        withCredentials: true,
      }
    );

    if (data.status === 200) {
      navigate("/dashboard");
    }
  };

  return (
    <Button onClick={handleClick}>
      <GoSignOut />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: grey;
  }
`;
