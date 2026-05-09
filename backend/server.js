// 1. Import necessary libraries (packages)
const express = require('express');
const cors = require('cors');

// 2. Initialize the Express application
const app = express();
// Set the port we want our server to run on (Port 5000 as requested)
const PORT = 5000;

// 3. Configure Middleware
// cors() allows our frontend (e.g., React) to communicate with our backend securely across different ports
app.use(cors());
// express.json() allows our server to read JSON data sent in the request body
app.use(express.json());

// --- TEMPORARY DATABASE ---
// We will store our leads in this array since we are keeping things beginner-friendly
// Note: Every time the server is stopped and restarted, this array will be emptied!
const leadsDatabase = [];

// 4. Define our API Endpoints (Routes)

// POST endpoint to handle incoming lead submissions from our React component
app.post('/api/leads', (req, res) => {
  // Extract the data sent by the frontend from the request body
  const { email, companyName, role } = req.body;

  // Basic validation on the backend to ensure we received what we expected
  if (!email || !companyName || !role) {
    // Return a 400 Bad Request status code if data is missing
    return res.status(400).json({ error: 'Please provide email, company name, and role.' });
  }

  // Create a new lead object using the data provided
  const newLead = {
    id: Date.now(), // Generate a simple unique ID based on the current timestamp
    email: email,
    companyName: companyName,
    role: role,
    submittedAt: new Date().toISOString() // Record exactly when it was submitted
  };

  // Save the new lead into our temporary array
  leadsDatabase.push(newLead);

  // Log the updated array so we can see it in our terminal
  console.log('\n--- New Lead Captured ---');
  console.log(newLead);
  console.log(`Total leads in database: ${leadsDatabase.length}\n`);

  // Send a 201 Created success response back to the frontend
  res.status(201).json({ 
    message: 'Lead captured successfully!', 
    lead: newLead 
  });
});

// A simple GET route just to verify the server is running when you visit http://localhost:5000/
app.get('/', (req, res) => {
  res.send('Backend Server is running! Send POST requests to /api/leads');
});

// 5. Start the Server
// This tells the application to start listening for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`📡 Ready to receive leads at POST http://localhost:${PORT}/api/leads`);
});
