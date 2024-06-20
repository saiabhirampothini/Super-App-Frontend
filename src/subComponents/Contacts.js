import React, { useEffect, useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Logout from "./Logout";
import styled from "styled-components";
import "../styles/contacts.css";
export default function Contacts(props) {
  const { contacts, currentUser, changeChat, profilepic, profiles } = props;
  const [currentUserName, setCurrentUserName] = useState();
  const [currentSelected, setCurrentSelected] = useState();
  // const [profiles, setFilteredContacts] = useState([]);
  const [afterfilter, setAfterFilter] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const filtered = profiles.filter(
      (contact) =>
        contact.userID.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phone.includes(searchQuery)
    );
    
    setAfterFilter(filtered);
    
  }, [searchQuery, profiles]);

  // console.log(contacts);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    // console.log("index is"+index);
    setCurrentSelected(index);
    changeChat(contact);
    // console.log(contact.split(' ')[0])
  };

  const searchClick = (contact) => {
    const op = contact.userID + " " + contact.profilePicture;
    // contacts.push(op);
    // changeChat(op);
    console.log(
      "What we are doing here i guess is every searched thing is getting added to contacts but should not be the case"
    );
    console.log(contacts);
    if (contacts.indexOf(op) >= 0) {
      changeCurrentChat(contacts.indexOf(op), op);
    } else {
      changeCurrentChat(contact.length, op);
    }
  };
  const getUserId = (contact) => {
    let userID = contact.split(" ")[0];
    return userID;
  };
  return (
    <>
      {currentUserName && (
        <div className="Container-Contacts">
          <div className="contact-header">
            <div className="current-user">
              <div className="avatar">
                {currentUser.profilePicture ? (
                  <img src={profilepic} alt="" />
                ) : (
                  <IoPersonCircle />
                )}
              </div>
              <div className="username">
                <h2>{currentUserName}</h2>
              </div>
              <div style={{ position: "relative" }}>
                <Logout />
              </div>
            </div>
          </div>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              style={{ borderRadius: "5rem" }}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {searchQuery ? (
            <div className="contacts">
              {afterfilter.length > 0 ? (
                afterfilter.map((contact, index) => (
                  <div
                    key={contact.userID}
                    className={`contact ${
                      index === currentSelected ? "selected" : ""
                    }`}
                    onClick={() => searchClick(contact)}
                  >
                    <div className="avatar">
                      {props.loading && (
                        <Skeleton
                          circle
                          height="100%"
                          containerClassName="avatar-skeleton"
                        />
                      )}
                      {contact.profilePicture ? (
                        <img src={contact.profilePicture} alt="" />
                      ) : (
                        <IoPersonCircle />
                      )}
                    </div>
                    <div className="username">
                      {props.loading ? (
                        <Skeleton width={70} />
                      ) : (
                        <h3>{contact.userID}</h3>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No contacts found</p>
              )}
            </div>
          ) : (
            <div className="contacts">
              {contacts.map((contact, index) => {
                return (
                  <div
                    key={contact}
                    className={`contact ${
                      index === currentSelected ? "selected" : ""
                    }`}
                    onClick={() => changeCurrentChat(index, contact)}
                  >
                    <div className="avatar">
                      {props.loading && (
                        <Skeleton
                          circle
                          height="100%"
                          containerClassName="avatar-skeleton"
                        />
                      )}
                      {contact.split(" ")[1] !== "" ? (
                        <img src={contact.split(" ")[1]} alt="" />
                      ) : (
                        <IoPersonCircle />
                      )}
                    </div>
                    <div className="username">
                      {props.loading ? (
                        <Skeleton width={70} />
                      ) : (
                        <h3>{contact.substring(0, contact.indexOf(" "))}</h3>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}
