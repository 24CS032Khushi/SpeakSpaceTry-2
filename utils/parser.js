const chrono = require("chrono-node");

const PRIORITY_KEYWORDS = {
  high: ["urgent", "asap", "immediately", "priority", "important", "right away"],
  medium: ["soon", "tomorrow", "later", "this week"],
  low: ["whenever", "sometime", "when free"]
};

const CATEGORY_KEYWORDS = {
  study: ["study", "revise", "read", "learn", "prepare"],
  work: ["email", "project", "submit", "assignment", "meeting", "report"],
  personal: ["buy", "call", "pay", "groceries", "personal", "appointment"]
};

function detectPriority(text) {
  const t = text.toLowerCase();
  for (const p of Object.keys(PRIORITY_KEYWORDS)) {
    for (const kw of PRIORITY_KEYWORDS[p]) {
      if (t.includes(kw)) return p;
    }
  }
  return "medium";
}

function detectCategory(text) {
  const t = text.toLowerCase();
  for (const cat of Object.keys(CATEGORY_KEYWORDS)) {
    for (const kw of CATEGORY_KEYWORDS[cat]) {
      if (t.includes(kw)) return cat;
    }
  }
  return "general";
}

function extractCandidateClauses(text) {
  // Split by separators and also by "and" in long sentences
  let parts = text.split(/[,;]+|\band\b/i);
  parts = parts.map(p => p.trim()).filter(Boolean);
  // Also split by "then" and "also"
  const res = [];
  parts.forEach(p => {
    p.split(/\bthen\b|\balso\b/i).forEach(q => {
      q = q.trim();
      if (q.length > 3) res.push(q);
    });
  });
  return res;
}

function parseDate(text, refDate = new Date()) {
  const r = chrono.parse(text, refDate);
  if (r && r.length > 0 && r[0].start) {
    return r[0].start.date().toISOString();
  }
  return null;
}

// Main extractor: returns array of {text, dueDate, priority, category}
function extractTasksFromText(text, refDate = new Date()) {
  const clauses = extractCandidateClauses(text);
  const tasks = [];

  clauses.forEach(clause => {
    // heuristics: if clause has keywords like "remind", "please", "add", "submit", "email"
    const isTask = /\b(remind|reminder|remember|todo|to|please|need to|must|don't forget|urgent|submit|email|call|buy|pay|schedule|book)\b/i.test(clause);
    // treat most clauses as tasks to avoid missing
    if (!isTask && clause.split(" ").length < 4) {
      // ignore too short non-task pieces
      return;
    }

    const dueDate = parseDate(clause, refDate);
    const priority = detectPriority(clause);
    const category = detectCategory(clause);

    // Clean text: remove leading phrases like "remind me to"
    const cleaned = clause.replace(/^(remind me to|please|remember to|i need to|i must|i'll|i will|we should|can you)\s*/i, "").trim();

    tasks.push({
      text: cleaned,
      raw: clause,
      dueDate,
      priority,
      category
    });
  });

  return tasks;
}

module.exports = {
  extractTasksFromText,
  detectPriority,
  detectCategory,
  parseDate
};