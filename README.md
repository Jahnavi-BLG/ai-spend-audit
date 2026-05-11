# 💸 AI Spend Audit Tool

## Project Summary
The AI Spend Audit Tool is a full-stack web application designed to help teams identify wasted spending on AI subscriptions. By inputting the tools, plans, and seats they currently use, the platform analyzes their stack and provides actionable recommendations to optimize costs, complete with an AI-generated professional summary.

## Target Users
- **Engineering Managers & CTOs** looking to optimize team budgets.
- **Startup Founders** aiming to extend their runway by cutting unnecessary SaaS bloat.
- **Finance Teams** wanting a clear breakdown of AI software expenditures.

## Tech Stack
- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Styling:** Tailwind CSS
- **AI Integration:** OpenAI API
- **Routing:** React Router DOM

## Features
- 📊 **Dynamic Cost Calculator:** Add multiple tools, plans, and seats to see total monthly spend.
- 🤖 **AI-Powered Insights:** Generates a personalized executive summary of your spending habits using OpenAI.
- 🔗 **Shareable Audits:** Generate unique URLs to easily share your audit results with team members.
- ⚡ **Instant Recommendations:** Built-in engine suggests cheaper plans or consolidation opportunities based on current pricing logic.
- 💾 **Local Persistence:** Your progress is saved locally so you don't lose data on refresh.

## Screenshots
*(Add screenshots here)*
- [Screenshot 1 Placeholder: Homepage & Input Form]
- [Screenshot 2 Placeholder: Audit Results & Recommendations]
- [Screenshot 3 Placeholder: AI Summary & Shareable Link]

## Local Setup Instructions

**1. Clone the repository**
```bash
git clone <your-repo-url>
cd ai-spend-audit
```

**2. Backend Setup**
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder and add your OpenAI API key:
```env
OPENAI_API_KEY=your_openai_api_key_here
```
Start the backend server:
```bash
npm start
```

**3. Frontend Setup**
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```

The application will be running at `http://localhost:5173`.

## Deployment
- **Frontend URL:** [Placeholder for Netlify/Vercel link]
- **Backend URL:** [Placeholder for Render/Heroku link]

## Architecture Summary
The app uses a decoupled Client-Server architecture. The React frontend handles all user interactions, form state, and dynamic rendering. It communicates with the Express backend via REST API calls, primarily to fetch the AI-generated summary and capture leads. Audit data for sharing is temporarily stored in the browser's `localStorage` to keep the application lightweight and fast.

## 5 Important Technical & Product Tradeoffs
1. **`localStorage` vs. Database for Sharing:** I chose to use `localStorage` to generate shareable links instead of setting up a database. *Tradeoff:* It makes the app incredibly fast and beginner-friendly to set up, but links are currently device-specific and not globally persistent.
2. **Hardcoded Pricing Engine vs. External API:** The pricing data is hardcoded in a utility file (`PricingData.js`). *Tradeoff:* Easy to modify and guarantees zero latency, but requires manual updates when AI companies change their pricing.
3. **Frontend-heavy Calculation:** The audit engine logic runs entirely on the client side. *Tradeoff:* Saves backend compute resources and provides instant feedback, but exposes the audit logic to the client.
4. **Minimal Backend:** The Express server is intentionally kept very lightweight, only acting as a proxy for the OpenAI API and a temporary in-memory lead database. *Tradeoff:* Reduces complexity, but means lead data is lost on server restart.
5. **Tailwind CSS vs. Custom CSS:** Used Tailwind for all styling. *Tradeoff:* Faster development speed and consistent design system, but clutters the JSX slightly compared to separate CSS files.
