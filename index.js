// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { extractTasksFromText } = require("./utils/parser");

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY || null;
const DB_PATH = path.join(__dirname, "db.json");

const app = express();
app.use(cors());
app.use(express.json());

// ensure DB exists
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify({ tasks: [] }, null, 2));
}

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH));
}
function writeDB(obj) {
  fs.writeFileSync(DB_PATH, JSON.stringify(obj, null, 2));
}

/* --------- Home --------- */
app.get("/", (req, res) => {
  res.send("✅ SpeakTasks API is running");
});

/* --------- SpeakSpace workflow endpoint --------- 
Receives: { prompt: "...", note_id, timestamp }
*/
app.post("/api/process", (req, res) => {
  try {
    if (API_KEY) {
      const clientKey = req.header("x-api-key");
      if (!clientKey || clientKey !== API_KEY) {
        return res.status(401).json({ status: "error", message: "Unauthorized" });
      }
    }

    const { prompt, note_id, timestamp } = req.body || {};
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ status: "error", message: "Missing prompt" });
    }

    // Extract tasks
    const tasksRaw = extractTasksFromText(prompt, timestamp ? new Date(timestamp) : new Date());

    // Transform into storage format
    const toStore = tasksRaw.map(t => ({
      id: uuidv4(),
      text: t.text,
      raw: t.raw,
      dueDate: t.dueDate, // iso or null
      priority: t.priority,
      category: t.category,
      status: "pending",
      createdAt: new Date().toISOString()
    }));

    // Save to DB
    const db = readDB();
    db.tasks = toStore.concat(db.tasks); // newest first
    writeDB(db);

    // Build a simple plan for next 24/48 hours
    const plan = buildPlanForNextDays(db.tasks, 2);

    // Response: keep small (SpeakSpace expects basic success), but include plan if needed
    return res.status(200).json({
      status: "success",
      message: `Created ${toStore.length} task(s)`,
      note_id: note_id || null,
      data: {
        createdTasks: toStore,
        plan
      }
    });
  } catch (err) {
    console.error("Error /api/process:", err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
});

/* --------- API to view tasks (for judges) --------- */
app.get("/api/tasks", (req, res) => {
  const db = readDB();
  res.json(db.tasks);
});

/* --------- API to get a plan for a date or next N days --------- */
app.get("/api/plan", (req, res) => {
  // query: ?days=2 or ?date=2025-12-10
  const db = readDB();
  const { days, date } = req.query;
  if (date) {
    const d = new Date(date);
    const start = new Date(d.setHours(0,0,0,0));
    const end = new Date(d.setHours(23,59,59,999));
    const tasks = db.tasks.filter(t => t.dueDate && new Date(t.dueDate) >= start && new Date(t.dueDate) <= end);
    return res.json({ date: start.toISOString().slice(0,10), tasks });
  }
  const dnum = days ? parseInt(days) : 2;
  const plan = buildPlanForNextDays(db.tasks, dnum);
  res.json(plan);
});

/* --------- Utility: build plan --------- */
function buildPlanForNextDays(tasks, days = 2) {
  const now = new Date();
  const end = new Date(now.getTime() + days*24*60*60*1000);
  const upcoming = tasks.filter(t => t.dueDate && new Date(t.dueDate) <= end).sort((a,b) => {
    const da = a.dueDate ? new Date(a.dueDate) : new Date(8640000000000000);
    const db = b.dueDate ? new Date(b.dueDate) : new Date(8640000000000000);
    return da - db;
  });
  // group by day
  const grouped = {};
  upcoming.forEach(t => {
    const day = t.dueDate ? new Date(t.dueDate).toISOString().slice(0,10) : "no-deadline";
    if (!grouped[day]) grouped[day] = [];
    grouped[day].push(t);
  });
  return { start: now.toISOString(), end: end.toISOString(), upcoming: grouped };
}

/* --------- Start --------- */
app.listen(PORT, () => {
  console.log(`🚀 SpeakTasks API listening on port ${PORT}`);
});