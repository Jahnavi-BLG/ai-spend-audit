# AI Spend Audit Tool

## Project Overview
A full-stack web application built for my internship assignment. The tool helps teams track, analyze, and optimize their monthly spending on various AI software subscriptions, providing actionable recommendations to save money.

## Problem Statement
Companies are rapidly adopting AI tools like ChatGPT Plus, GitHub Copilot, and Claude. However, tracking these licenses across different departments is difficult. This often leads to wasted money on unused seats, overlapping tool capabilities, or paying for expensive enterprise plans when smaller pro plans would suffice. This project provides a quick, interactive way to audit that spend and surface immediate cost-saving opportunities.

## Features
- **Dynamic Input Form:** Add multiple AI tools, specify the plan type, and input the number of seats to calculate the total monthly spend.
- **Rules-Based Audit Engine:** Compares the user's current tool stack against predefined logic to suggest plan downgrades or tool consolidations.
- **AI-Generated Summary:** Integrates with the OpenAI API to generate a brief, professional executive summary of the audit results.
- **Shareable Links:** Generates a unique, read-only URL of the audit results to easily share findings with teammates or managers.
- **Lead Capture Form:** A built-in waitlist form to collect emails from interested users.

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, React Router DOM
- **Backend:** Node.js, Express
- **External APIs:** OpenAI API

## Screenshots
- `[Screenshot 1 Placeholder: Landing Page and Input Form]`
- `[Screenshot 2 Placeholder: Audit Results and Recommendations]`
- `[Screenshot 3 Placeholder: AI Summary and Shareable Link View]`

## Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd ai-spend-audit
   ```

2. **Start the Backend:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory and add your OpenAI key:
   ```env
   OPENAI_API_KEY=your_api_key_here
   ```
   Start the server:
   ```bash
   npm start
   ```
   *The backend will run on `http://localhost:5000`.*

3. **Start the Frontend:**
   Open a new terminal window:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173`.*

## Deployment
- **Frontend:** [Link to Vercel/Netlify Deployment]
- **Backend:** [Link to Render/Heroku Deployment]

## Architecture Summary
The application follows a decoupled client-server architecture. The React frontend handles state management and runs the audit calculations locally to ensure a fast, responsive user experience. The Express backend serves primarily as a secure proxy to interact with the OpenAI API, preventing the API key from being exposed on the client side. For the shareable link feature, audit data is temporarily stored in the browser's `localStorage` rather than a database to keep the architecture simple for the scope of this assignment.

## Engineering & Product Tradeoffs

1. **Local Storage vs. Database:** I chose to use `localStorage` to save shareable audit links instead of standing up a database like MongoDB. This made development faster and kept the codebase simple, but it means shared links only work on the specific device/browser where the audit was created.
2. **Client-Side Auditing:** The logic that calculates savings runs entirely on the frontend rather than the backend. This reduces server load and makes the UI feel instant, but it means the audit rules are exposed to the client.
3. **Hardcoded Pricing Data:** The pricing rules and tool plans are stored in a static JavaScript file. While this guarantees zero latency for the user, it requires manual code updates if a company changes their pricing tiers.
4. **Minimal Backend State:** The Express server only handles the OpenAI integration and maintains a temporary in-memory array for lead capture. I traded off permanent data persistence (leads are lost on server restart) for architectural simplicity to meet the assignment requirements.
5. **Tailwind CSS vs. CSS Modules:** I opted for Tailwind CSS to speed up styling and maintain a consistent design system without writing custom CSS, accepting the tradeoff that the JSX components are a bit more cluttered with utility classes.
