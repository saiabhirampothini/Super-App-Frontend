import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
// import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Contacts from "../subComponents/Contacts";
import NoSelectedContact from "../subComponents/NoSelectedContact";
import ChatContainer from "../subComponents/ChatContainer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import { io } from "socket.io-client";
import { AuthContext } from "../contexts/authContext";
import "../styles/chat.css";
import { chatGetMyChatsRoute } from "../utils/APIRoutes";
import { chatFetchContactsRoute } from "../utils/APIRoutes";
function Chat() {
  const context = useContext(AuthContext);
  const profile = localStorage.getItem("profile");
  const userId = JSON.parse(profile);
  const isAuthenticated = context.isAuthenticated;

  const socket = useRef();

  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [currentChat, setCurrentChat] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [profiles, setProfiles] = useState([]);

  const getUser = async () => {
    setCurrentUser(userId.userID);
    setProfilePicture(userId.profilePicture);
  };

  const getContacts = async () => {
    const contact = await axios.post(
      chatGetMyChatsRoute,
      {
        userId,
      },
      {
        withCredentials: true,
      }
    );
    // console.log(contact.data.data);
    setContacts(contact.data.data);
    // console.log(contact);
    setIsLoading(false);
  };

  const handleChatChange = (chat) => {
    // console.log(chat)
    setCurrentChat(chat);
  };
  useEffect(() => {
    // if(!isAuthenticated){
    //   navigate("/login");
    // }
    // else{
    getUser();
    // }
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          chatFetchContactsRoute,

          {
            withCredentials: true,
          }
        );
        // console.log(response);
        const profiles = response.data.data.map((profile) => ({
          userID: profile.data.userID,
          email: profile.data.email,
          phone: profile.data.phone,
          profilePicture: profile.data.profilePicture,
        }));
        setProfiles(profiles); // Initially set filteredContacts to all profiles
        // console.log(profiles);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io("https://super-app-backend-sockets.vercel.app/");
      socket.current.emit("add-user", currentUser);
    }
  }, [currentUser]);

  useEffect(
    () => {
      if (currentUser) {
        setIsLoading(true);
        getContacts();
      }
    },
    // eslint-disable-next-line
    [currentUser]
  );

  return (
    <div>
      <div className="Container-Chat-Main">
        {isLoading ? (
          <div style={{ height: "100vh" }}>
            <Skeleton count={5} />
            <Skeleton count={5} />
            <Skeleton count={5} />
          </div>
        ) : (
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
            profilepic={profilePicture}
            profiles={profiles}
            loading={isLoading}
          />
        )}
        {currentChat ? (
          <ChatContainer
            currentChat={currentChat}
            socket={socket}
            contacts={contacts}
          />
        ) : (
          <NoSelectedContact />
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Chat;
