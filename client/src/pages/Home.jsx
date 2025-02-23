import React, { useState } from "react";
import Chatbot from "../components/ChatBot";
import "./Home.css";
import AdminDashboard from "./AdminDashboard";
export default function Home() {
  const [openAdminDashBoard, setopenAdminDashBoard] = useState(false);
  return (
    <div className="mainDiv">
      <div
        className="login"
        onClick={() => {
          setopenAdminDashBoard(!openAdminDashBoard);
        }}
      >
        Admin
      </div>
      {openAdminDashBoard&&<AdminDashboard />}
      <span>
        <Chatbot />
      </span>
    </div>
  );
}
