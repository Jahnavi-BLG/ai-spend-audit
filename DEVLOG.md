## Day 1 — 2026-05-06

**Hours worked:** 2

**What I did:**
- Set up React app using Vite
- Installed and configured Tailwind CSS
- Created a basic homepage UI for the AI Spend Audit Tool
- Initialized Git repository and pushed first commit
- Refactored project structure by moving homepage to pages folder

**What I learned:**
- Refreshed React project setup and Tailwind integration
- Understood importance of organizing components early
- Learned how to connect local project to GitHub

**Blockers / what I'm stuck on:**
- Minor confusion with Git commands initially, but resolved after setup

**Plan for tomorrow:**
- Build the input form for capturing AI tool usage
- Implement localStorage for saving form data

## Day 2 — 2026-05-07

**Hours worked:** 2

**What I did:**
- Created the initial structure for the AI spend input form
- Added dropdown options for different AI tools and plans
- Implemented dynamic form fields for multiple tool entries
- Worked on localStorage persistence for saving form state across reloads
- Cleaned up frontend folder structure for better scalability

**What I learned:**
- Learned how to manage dynamic form state in React
- Better understood how localStorage works with useEffect
- Realized the importance of structuring components early instead of keeping everything in App.jsx

**Blockers / what I'm stuck on:**
- Slight confusion while handling dynamic dropdown updates and syncing state properly

**Plan for tomorrow:**
- Complete the spend audit calculation logic
- Start building the results page UI

## Day 3 — 2026-05-08

**Hours worked:** 3

**What I did:**
- Built the initial audit engine logic for calculating AI tool savings
- Added recommendation rules based on team size and selected plans
- Created the Results component to display audit summaries and savings
- Connected the spend form to the audit engine and rendered results dynamically
- Refactored pricing data structure to support calculations more easily

**What I learned:**
- Learned how data flows between React components using props and state
- Better understood conditional rendering and dynamic UI updates
- Realized how small data structure changes can affect the entire frontend

**Blockers / what I'm stuck on:**
- Faced issues with dropdown rendering after changing the pricing data structure
- Spent time debugging undefined errors and fixing component mappings

**Plan for tomorrow:**
- Improve audit result UI and add more realistic recommendation logic
- Start integrating backend storage for lead capture

## Day 4 — 2026-05-09

**Hours worked:** 3

**What I did:**
- Improved the audit results section with clearer recommendation cards
- Built a lead capture form for collecting user information
- Set up an Express backend server and created a POST API endpoint
- Connected frontend and backend using fetch requests
- Tested successful submission flow between React frontend and Express backend

**What I learned:**
- Learned how frontend applications communicate with backend APIs
- Better understood handling JSON data and POST requests
- Realized the importance of backend validation and route testing

**Blockers / what I'm stuck on:**
- Faced some confusion while configuring backend routes and handling CORS
- Needed debugging to ensure frontend requests reached the backend correctly

**Plan for tomorrow:**
- Add AI-generated personalized summaries
- Improve audit recommendation quality
- Start preparing required documentation files