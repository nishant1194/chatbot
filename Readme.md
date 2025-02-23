# AI-Powered FAQ Chatbot 🤖

## 📌 Overview
This AI-powered chatbot provides FAQ responses using NLP similarity matching while detecting and correcting biased or misleading answers. If confidence is below 50%, the chatbot refuses to answer instead of generating unreliable information.


**Demo Video Link:-** https://drive.google.com/file/d/16vuVWA26-MXb9sWagzgHD8aMO9TnK72q/view?usp=sharing


---

## Installation steps

- Clone yhis repo.
- Go to client directory and write following commands.
- npm install
- npm run dev
- Now go to server directory and write following commands
- npm install
- npm run nodemon

The client will running on http://localhost:5173/

The server will running on http://localhost:6004/


## Approach for Chatbot
- **Data Storage (MongoDB)**- FAQs are stored with their vector embeddings generated using Xenova/all-MiniLM-L6-v2.
- **Query Processing** – User input is converted to an embedding, and cosine similarity finds the most relevant FAQ.
- **Bias Detection (Gemini AI)** – The retrieved response is checked for bias and rephrased if needed.
- **Frontend (React.js)** – Interactive UI for users and an admin panel for FAQ management.
- **Backend (Node.js + Express)** – API handles FAQ management and chat queries efficiently.
- **API Endpoints (Node.js + Express)**
-  POST /api/faq → Add a new FAQ (embedding generated and stored)
-  GET /api/faq → Fetch all FAQs
-  PUT /api/faq/:id → Update an FAQ (embedding re-calculated)
-  DELETE /api/faq/:id → Remove an FAQ
-  POST /api/chat → Process user queries, retrieve relevant answers, and apply bias detection


## 🚀 Features
### ✅ Interactive Chatbot UI
- Users can enter any query into a chatbot interface.
- Retrieves the most relevant FAQ using NLP similarity matching.
- If confidence is below 50%, refuses to answer.

### ✅ Real-Time Bias Detection & Self-Correction
- Identifies overly positive marketing phrases (e.g., _"Our product is the best"_).
- Rephrases biased answers into neutral, fact-based response using gemini api key.
- Displays: _"I'm not sure about this, let me find more details."_ when confidence is low.

### ✅ FAQ Management with CRUD Operations
- **Create** – Admins can add new FAQs.
- **Read** – Retrieves FAQs from a database.
- **Update** – Users can edit chatbot responses.
- **Delete** – Removes outdated FAQs.

### ✅ Optional Enhancements
- Displays confidence scores for responses.

---

## 🛠️ Tech Stack Used
- **Frontend:** React.js
- **Backend:** Node.js (Express)
- **Database:** MongoDB
- **NLP Tools:**
  - **Text Embeddings:** `Xenova/all-MiniLM-L6-v2` (Transformer-based model)
  - **Bias Detection & Neutralization:** Google Generative AI (Gemini)
  - **Cosine Similarity** for relevance scoring

---
