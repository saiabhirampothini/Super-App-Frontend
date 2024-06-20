
import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import { IoPersonCircle } from "react-icons/io5";
import { AuthContext } from "../contexts/authContext";
import "../styles/chatInterface.css";

import "react-toastify/dist/ReactToastify.css";
import { chatGetMessagesRoute } from "../utils/APIRoutes";
import { chatAddMessagesRoute } from "../utils/APIRoutes";

export default function ChatContainer(props) {
  const context = useContext(AuthContext);
  const profile = localStorage.getItem("profile");
  const userid = JSON.parse(profile).userID;
  const userID = userid;
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [incoming, setIncoming] = useState(null);

  const getAllMessages = async () => {
    // console.log(userID)
    const res = await axios.post(
      chatGetMessagesRoute,
      {
        from: userID,
        to: props.currentChat.split(" ")[0],
      },
      {
        withCredentials: true,
      }
    );
    console.log(res.data.data);
    setMessages(res.data.data);
  };

  useEffect(() => {
    if (props.currentChat) {
      getAllMessages();
    }
  }, [props.currentChat]);

  const handleSend = async (msg) => {
    if (!props.contacts.includes(props.currentChat)) {
      props.contacts.push(props.currentChat);
    }
    await axios.post(chatAddMessagesRoute, {
      from: userID,
      to: props.currentChat.split(" ")[0],
      message: msg,
    });
    console.log(userID);
    props.socket.current.emit("send-msg", {
      to: props.currentChat.split(" ")[0],
      from: userID,
      message: msg,
    });

    props.socket.current.emit("send-notification", {
      to: props.currentChat.split(" ")[0],
      from: userID,
      message: msg,
    });

    const updatedMessages = [...messages];
    updatedMessages.push({ sender: userID, message: msg });
    // console.log(userID);
    setMessages(updatedMessages);
  };

  useEffect(() => {
    if (props.socket.current) {
      props.socket.current.on("msg-recieve", (msg) => {
        setIncoming({ sender: null, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    incoming && setMessages((prev) => [...prev, incoming]);
  }, [incoming]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const groupMessagesByDate = (messages) => {
    return messages.reduce((groups, message) => {
      const date = new Date(message.timestamp).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});
  };

  const formatTimestamp = (timestamp) => {
    if (timestamp === undefined) timestamp = Date.now();
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutesStr + " " + ampm;
  };
  const groupedMessages = groupMessagesByDate(messages);
  // Sort messages within each date group by time
  Object.keys(groupedMessages).forEach((date) => {
    groupedMessages[date].sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );
  });

  return (
    <>
      <div className="Container-Chat">
        <div className="chat-header">
          <div className="user-details">
            <div className="avatar">
              {props.currentChat.split(" ")[1] ? (
                <img src={props.currentChat.split(" ")[1]} alt="" />
              ) : (
                <IoPersonCircle />
              )}
            </div>
            <div className="username ml-3">
              <h3>{props.currentChat.split(" ")[0]}</h3>
            </div>
          </div>
        </div>
        <div className="chat-messages">
          {Object.keys(groupedMessages).map((date) => (
            <div key={uuidv4()}>
              <div className="date-header">
                {date !== "Invalid Date"
                  ? date
                  : new Date().toLocaleDateString() + "(Current Session)"}
                {/* {date} */}
              </div>
              {groupedMessages[date].map((message) => (
                <div
                  ref={scrollRef}
                  key={uuidv4()}
                  className={`message ${
                    message.sender === userID ? "sended" : "received"
                  }`}
                >
                  <div className="content">
                    <p>{message.message}</p>
                    <span className="timestamp">
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <ChatInput sendMessage={handleSend} />
      </div>
    </>
  );
}

// const Container = styled.div`
//   display: grid;
//   grid-template-rows: 10% 75% 15%;
//   gap: 0.1rem;
//   overflow: hidden;
//   @media screen and (min-width: 720px) and (max-width: 1080px) {
//     grid-template-rows: 10% 75% 15%;
//   }
//   .chat-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 0 2rem 0 1rem;
//     background-color: #075e54;
//     border-left-width: medium;
//     border-color: white;
//     .user-details {
//       display: flex;
//       align-items: center;
//       height: 0.5rem;
//       .avatar {
//         img {
//           height: 3rem;
//           width: 3rem;
//           border-radius: 3rem;
//         }
//         svg {
//           color: #a0a0a0;
//           font-size: 3rem;
//           cursor: pointer;
//         }
//       }
//       .username {
//         h3 {
//           color: white;
//         }
//       }
//     }
//   }
//   .chat-messages {
//     padding: 1rem 2rem;
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//     overflow: auto;
//     color: black;
//     background-color: #000;
//     &::-webkit-scrollbar {
//       margin-top: 10px;
//       margin-bottom: 10px;
//       width: 0.2rem;
//       &-thumb {
//         background-color: grey;
//         width: 0.1rem;
//         border-radius: 1rem;
//       }
//     }
//     .date-header {
//       text-align: center;
//       margin: 10px 0;
//       color: #888;
//     }
//     .message {
//       display: flex;
//       justify-content: flex-start;
//       align-items: center;
//       margin: 10px 0;
//       .content {
//         padding: 1px 10px;
//         font-size: 1.1rem;
//         border-radius: 0.5rem;
//         background-color: #fff;
//         color: #000;
//         max-width: 60%;
//         word-wrap: break-word;
//         overflow-wrap: break-word;
//       }
//       .timestamp {
//         position: relative;
//         font-size: 0.8rem;
//         color: #888;
//       }
//     }
//     .sended {
//       justify-content: flex-end;
//       .content {
//         background-color: #1e39e8;
//       }
//     }
//     .received {
//       justify-content: flex-start;
//       .content {
//         background-color: #fff;
//       }
//     }
//   }
// `;
