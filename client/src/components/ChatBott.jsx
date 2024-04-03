import React from "react";
import { NavLink } from "react-router-dom";
import chatbot from '../assets/ChatBot.svg';
const ChatBott = () => {
  return (
    <>
      <div>
        <div>
          <NavLink
            to="/ChatBot"
            className="rounded-full bg-[#196B69] z-50 m-40">
            <img
              src={chatbot}
              alt="ChatBot"
              className="rounded-full bg-[#196B69] z-50 m-40"
            />
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default ChatBott;
