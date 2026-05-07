import React, { useState, useEffect } from 'react';
import { pricing } from '../utils/PricingData'; // Make sure this matches the export name in your file
import { auditTools } from '../utils/auditEngine';
import Results from './Results';

// A simple helper function to generate a unique ID for each tool entry
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

export default function SpendForm() {
  // ==========================================
  // 1. STATE INITIALIZATION
  // ==========================================
  // We use lazy initialization (passing a function to useState) so we only read 
  // from localStorage on the first render, not every time the component updates.

  const [teamSize, setTeamSize] = useState(() => {
    const saved = localStorage.getItem('spend_teamSize');
    return saved ? Number(saved) : 1;
  });

  const [useCase, setUseCase] = useState(() => {
    const saved = localStorage.getItem('spend_useCase');
    return saved || 'coding';
  });

  const [tools, setTools] = useState(() => {
    const saved = localStorage.getItem('spend_tools');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Failed to load tools from local storage", err);
      }
    }
    // Default starting state: one empty tool entry
    return [{ id: generateId(), tool: '', plan: '', spend: '', seats: 1 }];
  });

  // State to hold the results of our audit
  const [auditData, setAuditData] = useState(null);

  // ==========================================
  // 2. LOCAL STORAGE SYNC (useEffect)
  // ==========================================
  // Whenever teamSize, useCase, or tools change, we save them to localStorage.
  
  useEffect(() => {
    localStorage.setItem('spend_teamSize', teamSize);
  }, [teamSize]);

  useEffect(() => {
    localStorage.setItem('spend_useCase', useCase);
  }, [useCase]);

  useEffect(() => {
    localStorage.setItem('spend_tools', JSON.stringify(tools));
  }, [tools]);

  // ==========================================
  // 3. HANDLERS FOR DYNAMIC TOOL LIST
  // ==========================================

  // Add a new empty tool row
  const handleAddTool = () => {
    setTools([...tools, { id: generateId(), tool: '', plan: '', spend: '', seats: 1 }]);
  };

  // Remove a specific tool row by its unique ID
  const handleRemoveTool = (idToRemove) => {
    setTools(tools.filter((t) => t.id !== idToRemove));
  };

  // Run the audit engine on our current tools
  const handleRunAudit = () => {
    const results = auditTools(tools);
    setAuditData(results);
  };

  // Update a specific field inside a specific tool row
  const handleToolChange = (id, field, value) => {
    setTools((prevTools) =>
      prevTools.map((t) => {
        if (t.id === id) {
          // Copy the old tool data and update the specific field
          const updatedTool = { ...t, [field]: value };

          // If the user changes the Tool dropdown, we must reset the Plan and Spend
          if (field === 'tool') {
            updatedTool.plan = '';
            updatedTool.spend = '';
          }

          // If the user changes the Plan dropdown, auto-fill the monthly spend 
          // based on our imported pricing data!
          if (field === 'plan' && updatedTool.tool && pricing[updatedTool.tool]) {
            const defaultSpend = pricing[updatedTool.tool][value];
            if (defaultSpend !== undefined) {
              updatedTool.spend = defaultSpend;
            }
          }

          return updatedTool;
        }
        return t; // Return other tools unchanged
      })
    );
  };

  // ==========================================
  // 4. CALCULATIONS
  // ==========================================
  // Calculate total monthly spend across all tools safely
  const totalMonthlySpend = tools.reduce((total, t) => {
    const costPerSeat = Number(t.spend) || 0; // fallback to 0 if empty
    const numSeats = Number(t.seats) || 0;    // fallback to 0 if empty
    return total + (costPerSeat * numSeats);
  }, 0);

  // ==========================================
  // 5. RENDER UI
  // ==========================================
  return (
    <>
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100 mt-10">
      
      {/* Header */}
      <div className="mb-8 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">AI Spend Auditor</h2>
        <p className="text-gray-500 text-sm mt-1">Track and calculate your team's monthly AI costs.</p>
      </div>

      {/* --- SECTION 1: TEAM INFO --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Total Team Size</label>
          <input
            type="number"
            min="1"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Use Case</label>
          <select
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
          >
            <option value="coding">Software Engineering / Coding</option>
            <option value="writing">Content Creation / Writing</option>
            <option value="research">Research & Data Analysis</option>
            <option value="mixed">Mixed / General Purpose</option>
          </select>
        </div>
      </div>

      {/* --- SECTION 2: AI TOOLS STACK --- */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Your AI Tools</h3>
        
        <div className="space-y-4">
          {tools.map((t) => {
            // Get available plans for this specific tool safely
            const availablePlans = t.tool && pricing[t.tool] 
              ? Object.keys(pricing[t.tool]) 
              : [];

            return (
              <div key={t.id} className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 rounded-lg bg-white relative items-start md:items-end shadow-sm">
                
                {/* Tool Dropdown */}
                <div className="flex-1 w-full">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Tool</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-white text-gray-800"
                    value={t.tool}
                    onChange={(e) => handleToolChange(t.id, 'tool', e.target.value)}
                  >
                    <option value="">Select Tool...</option>
                    {Object.keys(pricing || {}).map((toolName) => (
                      <option key={toolName} value={toolName}>{toolName}</option>
                    ))}
                  </select>
                </div>

                {/* Plan Dropdown */}
                <div className="flex-1 w-full">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Plan</label>
                  <select
                    className={`w-full p-2 border border-gray-300 rounded-md outline-none bg-white text-gray-800 ${!t.tool ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'focus:border-blue-500'}`}
                    value={t.plan}
                    onChange={(e) => handleToolChange(t.id, 'plan', e.target.value)}
                    disabled={!t.tool} // Don't let them pick a plan until they pick a tool
                  >
                    <option value="">Select Plan...</option>
                    {availablePlans.map((planName) => (
                      <option key={planName} value={planName}>{planName}</option>
                    ))}
                  </select>
                </div>

                {/* Spend Input */}
                <div className="w-full md:w-32">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Spend/Mo ($)</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
                    value={t.spend}
                    onChange={(e) => handleToolChange(t.id, 'spend', e.target.value)}
                    placeholder="0"
                  />
                </div>

                {/* Seats Input */}
                <div className="w-full md:w-24">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Seats</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
                    value={t.seats}
                    onChange={(e) => handleToolChange(t.id, 'seats', e.target.value)}
                  />
                </div>

                {/* Remove Button */}
                <div className="mt-2 md:mt-0">
                  <button
                    type="button"
                    onClick={() => handleRemoveTool(t.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors font-medium text-sm border border-transparent hover:border-red-200 w-full md:w-auto"
                  >
                    Remove
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Add Tool Button */}
        <button
          type="button"
          onClick={handleAddTool}
          className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
        >
          + Add Another Tool
        </button>
      </div>

      {/* --- SECTION 3: TOTAL COST --- */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
        <div>
          <span className="text-gray-600 font-medium text-lg">Total Monthly Spend:</span>
        </div>
        <div className="text-4xl font-black text-gray-900 mt-2 md:mt-0">
          ${totalMonthlySpend.toLocaleString()}
        </div>
      </div>

      {/* --- SECTION 4: RUN AUDIT BUTTON --- */}
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={handleRunAudit}
          className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg w-full md:w-auto text-lg"
        >
          Run AI Spend Audit
        </button>
      </div>

    </div>

    {/* Conditionally render the Results component if we have data */}
    {auditData && (
      <div className="pb-10">
        <Results auditData={auditData} />
      </div>
    )}
    </>
  );
}
