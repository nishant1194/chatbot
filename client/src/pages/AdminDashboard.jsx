import React, { useState } from "react";
import { Chat, ListAlt, Dashboard as DashboardIcon } from "@mui/icons-material";
import ChatLogs from "../components/ChatLogs";
import "./AdminDashboard.css"; // Import CSS
import CreateFAQ from "../components/CreateFAQ";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("ChatLogs");

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={()=>{
            setActiveTab("ChatLogs")
          }}>
            <DashboardIcon className="icon" />
            Dashboard
          </li>
          <li onClick={()=>{
            setActiveTab("CreateFAQ")
          }}>
            <Chat className="icon" />
            Create FAQS
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1>Dashboard Overview</h1>

      
        {activeTab==="ChatLogs" && <ChatLogs />}
        {activeTab==="CreateFAQ" && <CreateFAQ />}
       </main>
    </div>
  );
}

export default Dashboard;
