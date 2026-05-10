const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { OpenAI } = require('openai');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const leadsDatabase = [];

app.post('/api/leads', (req, res) => {
  const { email, companyName, role } = req.body;

  if (!email || !companyName || !role) {
    return res.status(400).json({ error: 'Please provide email, company name, and role.' });
  }

  const newLead = {
    id: Date.now(),
    email: email,
    companyName: companyName,
    role: role,
    submittedAt: new Date().toISOString()
  };

  leadsDatabase.push(newLead);

  console.log('\n--- New Lead Captured ---');
  console.log(newLead);
  console.log(`Total leads in database: ${leadsDatabase.length}\n`);

  res.status(201).json({ 
    message: 'Lead captured successfully!', 
    lead: newLead 
  });
});

app.post('/api/summary', async (req, res) => {
  const { totalSavings, tools, teamSize, useCase } = req.body;

  if (!totalSavings || !tools || !teamSize || !useCase) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const prompt = `You are an AI Spend Auditor. A company with a team size of ${teamSize} focusing on ${useCase} is using the following AI tools: ${JSON.stringify(tools)}. We identified potential monthly savings of $${totalSavings}. Write a short, professional summary (80-120 words) analyzing their AI spending and highlighting the savings.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o-mini",
    });

    const summary = completion.choices[0].message.content;
    res.json({ summary });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.json({ 
      summary: "We analyzed your AI spending and found potential areas for optimization. By switching to more cost-effective plans or removing unused seats, you can significantly reduce your monthly expenses without sacrificing productivity. Review the recommendations below to take action." 
    });
  }
});

app.get('/', (req, res) => {
  res.send('Backend Server is running! Send POST requests to /api/leads or /api/summary');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
