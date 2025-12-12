# SpeakTasks — Voice → Task Manager (SpeakSpace custom action)

## What it is
Converts SpeakSpace voice notes into structured tasks with due dates, priority, and category (study/work/personal). Saves tasks to a JSON DB and exposes endpoints to view tasks and generate plans.

## Quick start (local)
1. Clone repo
2. `npm install`
3. Create `.env` with:
  API_KEY=you_key
  PORT=3000
4. `node index.js`
5. Test:
- GET `http://localhost:3000/`
- POST `http://localhost:3000/api/process` with header `x-api-key: mysupersecretkey`

## Deployment
Recommended: Railway (instructions in repo)
1. Push to GitHub
2. Create Railway project and link repo
3. Add env var `API_KEY`
4. Deploy

## Endpoints
- `POST /api/process` — main SpeakSpace workflow
- `GET /api/tasks` — list tasks
- `GET /api/plan?days=2` — plan for next N days
- `GET /api/plan?date=YYYY-MM-DD` — tasks due that date

## SpeakSpace Action config
- Title: `Create Tasks (SpeakTasks)`
- Prompt Template: `Convert the following note into actionable tasks... $PROMPT`
- API URL: `https://<your-domain>/api/process`
- Header: `x-api-key: mysupersecretkey`

## Notes for judges
- The service stores tasks in a simple JSON DB (`db.json`). For production, swap to a persistent DB or Notion integration.
- Add advanced integrations (calendar, Notion) as optional enhancements.

## Author
Team: Khushi Ka.Patel, Jainam Khetani
