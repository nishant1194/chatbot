import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ChatLogs.css"; // Import CSS

const API_URL = "http://localhost:5000/api/faqs"; // Update this with your actual backend API

function ChatLogs() {
    const [faqs,setFaqs] = useState([])
    const [editingId, setEditingId] = useState(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");

  const getFaqs = async()=>{
     const resp = await axios.get("http://localhost:6004/chat-bot/faq") 
     setFaqs(resp.data)

  }
  useEffect(() => {
    getFaqs();
    },[faqs]);
 
  const handleEdit = (faq) => {
    setEditingId(faq._id);
    setEditQuestion(faq.question);
    setEditAnswer(faq.answer);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditQuestion("");
    setEditAnswer("");
  };

  const handleSave = async (id) => {
    const updatedFaq = { question: editQuestion, answer: editAnswer };
    try {
      const resp = await axios.put(`http://localhost:6004/chat-bot/faq/${id}`, updatedFaq);
      console.log(resp);
      await getFaqs()
      setEditingId(null);
    } catch (error) {
      console.error("Error updating FAQ:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      const resp = await axios.delete(`http://localhost:6004/chat-bot/faq/${id}`);
      console.log(resp);
      await getFaqs()
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  };

  return (
    <div className="chat-logs">
      <h2>All FAQs</h2>

      {[...faqs].reverse().map((faq) => (
        <div key={faq._id} className="faqDiv">
          {editingId === faq._id ? (
            <>
              <input
                type="text"
                value={editQuestion}
                onChange={(e) => setEditQuestion(e.target.value)}
                className="faq-input"
              />
              <textarea
                value={editAnswer}
                onChange={(e) => setEditAnswer(e.target.value)}
                className="faq-input"
              />
              <div className="faq-buttons">
                <button onClick={() => handleSave(faq._id)} className="save-btn">Save</button>
                <button onClick={handleCancel} className="cancel-btn">Cancel</button>
              </div>
            </>
          ) : (
            <>
              <div className="faq-question">Question: {faq.question}</div>
              <div className="faq-answer">Answer: {faq.answer}</div>
              <div className="faq-buttons">
                <button onClick={() => handleEdit(faq)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(faq._id)} className="delete-btn">Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ChatLogs;
