# Project Reflection

## 1. Hardest Bug
The toughest issue I ran into was keeping the dynamic tool list in sync with `localStorage` while updating specific fields (like changing a plan and auto-updating the spend). In my first attempt, the React state would update, but the `useEffect` hook saving to `localStorage` was capturing stale data due to closure issues. I fixed this by using the functional update form of `setState` (`setTools(prev => ...)`), which ensured I was always working with the freshest data before saving. It was a great lesson in React's render cycle.

## 2. Reversed Decision
Initially, I planned to build a full MongoDB database to store the shareable audit links. Halfway through setting up the Mongoose schemas, I realized I was overcomplicating the assignment. The core value of the tool is the audit itself, not the database structure. I reversed course, scrapped the backend database, and implemented `localStorage` sharing instead. It kept the codebase much more beginner-friendly and allowed me to focus on polishing the UI and the OpenAI integration.

## 3. What I Would Build Next
If I had another two weeks, I would definitely add:
- **Actual Database Sharing:** Moving from `localStorage` to a Postgres or MongoDB database so links can be sent to coworkers on different computers.
- **PDF/CSV Export:** Letting managers download a clean one-pager of their audit to present in finance meetings.
- **User Accounts:** Allowing users to save their audit history and track their spending over time.

## 4. Honest AI Usage
I used AI (ChatGPT/Claude) in a few specific ways during this project:
- **Boilerplate Setup:** I used it to quickly generate the initial `Vite + React + Tailwind` configuration commands because I always forget the exact syntax.
- **Styling Inspiration:** I asked for Tailwind class suggestions to achieve the modern UI look on the summary cards.
- **Debugging:** When my React Router `useParams` wasn't picking up the ID correctly, I pasted the component into the AI, and it pointed out I had a typo in my route path in `App.jsx`. 
I made sure to write the core logic (the audit engine and the state management) myself to ensure I actually understood the architecture.

## 5. Self-Rating
- **UI/UX Design:** 8/10 (The Tailwind design feels modern and clean, but could use more micro-animations).
- **Code Quality:** 7/10 (Components are cleanly separated, but `SpendForm.jsx` got a bit large and could probably be broken down into smaller sub-components).
- **Problem Solving:** 9/10 (I'm really proud of how the audit engine calculates savings dynamically based on the JSON rules).
- **Product Sense:** 8/10 (Adding the shareable link feature and the AI summary makes it feel like a real SaaS product, not just a calculator).
