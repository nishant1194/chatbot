import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css";
import Linkk from "../assests/Linkk";
import img from '../assests/imgChatbot.png'

const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [chats, setChats] = useState([]);
  const [chatbotOpened, setChabotOpened] = useState(false);

  const send = async () => {
    setChats((prevChats) => [
      ...prevChats,
      { by: "me", message: query, confidence: "-1" },
    ]);
    setQuery("");
    try {
      const resp = await axios.post(Linkk + "/chat-bot/chat", { query });
      setChats((prevChats) => [
        ...prevChats,
        {
          by: "bot",
          message: resp.data.answer,
          confidence: resp.data.confidence,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chatbot-mainC">
      {chatbotOpened && (
        <div className="chatBox-cont">
          <div className="chatbot-heading">ChatBot</div>
          <div className="chat-area">
            {!chats || chats.length === 0 ? (
              <div className="empty-chats">Start Chatting...</div>
            ) : (
              chats.map((chat, index) =>
                chat?.by === "me" ? (
                  <div key={index} className="me-chat">
                    {chat.message}
                  </div>
                ) : chat?.by === "bot" ? (
                  <div key={index} className="bot-chat">
                    {chat.message} <br /> <div className="confidance-score">Confidence score for this response is:{" "}
                    {chat.confidence}{" "} </div>
                  </div>
                ) : null
              )
            )}
          </div>

          <div className="input-chatbot">
            <input
              className="inputlink"
              type="text"
              placeholder="Ask me your Query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="sendd" onClick={send}>
              |
            </div>
          </div>
        </div>
      )}
      <div
        className="roundedBox"
        onClick={() => {
          setChabotOpened(!chatbotOpened);
        }}
      >
        <img src={img} alt="" className="img-chatbot"/>
      </div>
    </div>
  );
};

export default Chatbot;
