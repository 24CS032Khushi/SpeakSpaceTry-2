# 🗣️ SpeakTasks — Voice-Driven Task Automation Workflow

> **One-line description:**  
> SpeakTasks converts voice notes into structured, prioritized, and actionable tasks using intelligent backend workflows — turning **voice into execution**, not just transcription.

---

## 🧩 Problem Statement

Voice notes are fast to record but difficult to act upon.

Users often record reminders, instructions, and ideas as voice notes, but must later **re-listen, interpret, and manually convert** them into tasks. This leads to:
- Missed deadlines  
- Unclear priorities  
- Low productivity  

Most voice applications stop at **transcription or summarization**.  
They fail to understand **intent**, **urgency**, and **execution logic**.

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
git clone <your-repo-url>
cd speaktasks
