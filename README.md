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
---
