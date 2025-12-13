# 🗣️ SpeakTasks — Voice-Driven Task Automation Workflow

> **One-line description:**  
> SpeakTasks converts voice notes into structured, prioritized, and actionable tasks using intelligent backend workflows — turning **voice into execution**, not just transcription.

---
## 🧩 Problem Statement

Voice notes are quick to record but difficult to act upon.  
Users often need to manually re-listen, interpret, and rewrite spoken instructions into task lists, which leads to missed deadlines and poor organization.

Most voice applications stop at **transcription or summarization** and do not convert voice into **actionable workflows**.

---

## 💡 Our Solution

**SpeakTasks** is a custom **SpeakSpace Action** that automatically converts spoken intent into:

- 📌 Structured tasks  
- ⏰ Detected deadlines & time references  
- 🚦 Priority levels (High / Medium / Low)  
- 🗂️ Task categories (Study / Work / Personal)  
- 🧠 Explainable decisions (why a task was created)  
- 🗓️ A short-term actionable plan  

It demonstrates **voice → intent → execution**, not just voice → text.

---

## 🔄 How It Works

1. User records a voice note in **SpeakSpace**
2. SpeakSpace converts speech → text
3. Text is sent to our backend API
4. Backend extracts intent, deadlines, priority & category
5. Tasks are stored and a plan is generated dynamically

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express  
- **NLP Logic:** Custom heuristics + `chrono-node`  
- **Storage:** JSON-based database (`db.json`)  
- **Hosting:** Railway  
- **Security:** API Key authentication  
- **Integration:** SpeakSpace Custom Actions  

---

## 🚀 Quick Start (Local Setup)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/24CS032Khushi/SpeakSpaceTry-2.git
cd SpeakSpaceTry-2
```
### 2️⃣ Install dependencies
```bash
npm install
```
### 3️⃣ Create environment variables
- **Create a .env file in the root directory:**
```bash
API_KEY=test123
PORT=3000
```
### 4️⃣ Run the server
```bash
node index.js
```
### 5️⃣ Test locally
- **GET** → http://localhost:3000/
- **POST** → http://localhost:3000/api/process
- **You should see:**
  ```bash
  ✅ SpeakTasks API is running
  ```
---
# 🚀 Deployment Guide (How Judges Can Test It)
## The project is fully deployed on Railway and does not require local setup for testing.
### 🔹 Steps for Judges
### **1. Use the deployed API endpoint:**
```text
https://speakspacetry-2-production.up.railway.app/
```

### **2. Send a POST request to:**
```text
POST https://speakspacetry-2-production.up.railway.app/api/process
```

### **3. Add request headers:**
```text
x-api-key: SpeakTask2001
Content-Type: application/json
```

### **4. Send the sample JSON body (shown below)**
- **🔹 Request Body Example**
```json
{
  "prompt": "Remind me to submit my assignment by Monday and email my professor tomorrow.",
  "note_id": "demo123",
  "timestamp": "2025-12-01T10:00:00Z"
}

```
## Judges can test using Postman,or directly via SpeakSpace Action.
---
# 📡 API Endpoint & Authorization Details
## 🔹 Main Workflow Endpoint
```http
POST /api/process
```
## 🔹 Headers
```http
x-api-key: SpeakTask2001
Content-Type: application/json
```
## 🔹 Request Body Example
```json
{
  "prompt": "Prepare slides for the client presentation by Thursday and follow up with the design team tomorrow.",
  "note_id": "judge_demo_001",
  "timestamp": "2025-12-04T14:30:00Z"
}

```
```json
{
  "prompt": "Remind me to revise data structures tonight and submit my operating systems assignment by Monday.",
  "note_id": "judge_demo_002",
  "timestamp": "2025-12-04T09:00:00Z"
}

```
```json
{
  "prompt": "Book a doctor's appointment this weekend and buy groceries on Saturday evening.",
  "note_id": "judge_demo_003",
  "timestamp": "2025-12-05T10:15:00Z"
}

```
```json
{
  "prompt": "Email my professor about project feedback tomorrow and complete the lab report by Friday night.",
  "note_id": "judge_demo_004",
  "timestamp": "2025-12-06T08:45:00Z"
}

```
## 🔹 View Stored Tasks
```http
GET /api/tasks
```
## 🔹 Generate Task Plan
```http
GET /api/plan?days=2
GET /api/plan?date=YYYY-MM-DD
```
---
# 🎤 SpeakSpace Action Configuration (Copy-Paste Ready)

## Title
```text
Create Tasks (SpeakTasks)
```
## Description
```text
Converts voice notes into structured tasks with detected deadlines, priorities, and categories.
```
## Prompt Template
```text
Convert the following voice note into actionable tasks with deadlines,
priority, and category.
$PROMPT
```
## API URL
```text
https://speakspacetry-2-production.up.railway.app/api/process
```
## Authorization Header
```text
x-api-key: SpeakTask2001
```
---
# 🏆 Why This Project Stands Out

- Goes beyond basic transcription and summarization
- Converts voice into actionable execution workflows
- Solves a real-world productivity problem
- Demonstrates voice-first automation
- Fully functional, deployed backend API
---
# 🔮 Future Enhancements

- Calendar integration
- Notion / Google Sheets sync
- Smart reminders
- Multi-user support
- Email execution automation

---
## 👩‍💻 Team

This project was built collaboratively by:

- **Khushi Ka.Patel** and **Jainam Khetani**
---
