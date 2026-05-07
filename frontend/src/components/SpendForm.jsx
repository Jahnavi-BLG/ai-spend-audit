import React, { useState, useEffect } from 'react';
import { toolsData } from '../utils/PricingData';

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);


const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

const SpendForm = () => {
    // =========================================================================
    // STATE MANAGEMENT
    // We use lazy initialization (passing a function to useState) so we only 
    // read from localStorage during the very first render, improving performance.
    // =========================================================================

    // 1. Team Size State (Default: 1)
    const [teamSize, setTeamSize] = useState(() => {
        const saved = localStorage.getItem('spendForm_teamSize');
        return saved ? Number(saved) : 1;
    });

    // 2. Primary Use Case State (Default: 'coding')
    const [useCase, setUseCase] = useState(() => {
        const saved = localStorage.getItem('spendForm_useCase');
        return saved || 'coding';
    });

    // 3. AI Tools Array State
    // Default: One empty tool entry so the user sees a form immediately
    const [tools, setTools] = useState(() => {
        const saved = localStorage.getItem('spendForm_tools');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse tools from localStorage");
            }
        }
        return [{ id: generateId(), toolName: '', planName: '', monthlySpend: 0, seats: 1 }];
    });

    // =========================================================================
    // SIDE EFFECTS (LocalStorage Sync)
    // Whenever our state variables change, we update localStorage so data 
    // persists across page refreshes.
    // =========================================================================

    useEffect(() => {
        localStorage.setItem('spendForm_teamSize', teamSize);
    }, [teamSize]);

    useEffect(() => {
        localStorage.setItem('spendForm_useCase', useCase);
    }, [useCase]);

    useEffect(() => {
        localStorage.setItem('spendForm_tools', JSON.stringify(tools));
    }, [tools]);

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================

    // Adds a new blank tool to our list
    const handleAddTool = () => {
        setTools([
            ...tools,
            { id: generateId(), toolName: '', planName: '', monthlySpend: 0, seats: 1 }
        ]);
    };

    // Removes a specific tool from our list by its unique ID
    const handleRemoveTool = (idToRemove) => {
        setTools(tools.filter(tool => tool.id !== idToRemove));
    };

    // Updates a specific field (like 'toolName' or 'seats') for a specific tool
    const handleToolChange = (id, field, value) => {
        setTools(tools.map(tool => {
            if (tool.id === id) {
                const updatedTool = { ...tool, [field]: value };

                // If the user changed the tool (e.g., from ChatGPT to Claude), we must 
                // reset the plan because the new tool might have different plan options.
                if (field === 'toolName') {
                    updatedTool.planName = '';
                }
                return updatedTool;
            }
            return tool;
        }));
    };

    // Calculate total spend automatically based on the tools array
    const totalMonthlySpend = tools.reduce((sum, tool) => {
        const spend = Number(tool.monthlySpend) || 0;
        const seats = Number(tool.seats) || 1;
        return sum + (spend * seats);
    }, 0);

    // =========================================================================
    // RENDER HELPERS
    // Common Tailwind classes extracted to keep the JSX clean and readable
    // =========================================================================
    const inputClasses = "w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 bg-white px-4 py-2.5 border transition-all duration-200 outline-none text-gray-800";
    const labelClasses = "block text-sm font-semibold text-gray-700 mb-1.5";

    return (
        <div className="w-full max-w-5xl mx-auto p-6 md:p-8 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 shadow-indigo-100/60">

            {/* --- Header Section --- */}
            <div className="mb-8 border-b border-gray-100 pb-6">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">AI Spend Audit</h2>
                <p className="text-gray-500 mt-2 text-lg">Track, manage, and optimize your team's AI tool subscriptions.</p>
            </div>

            <div className="space-y-8">

                {/* --- Section 1: General Team Information --- */}
                <section className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100/80">
                    <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center">
                        <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm shadow-md shadow-indigo-200">1</span>
                        Team Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Team Size Input */}
                        <div>
                            <label className={labelClasses} htmlFor="teamSize">Total Team Size</label>
                            <input
                                id="teamSize"
                                type="number"
                                min="1"
                                className={inputClasses}
                                value={teamSize}
                                onChange={(e) => setTeamSize(e.target.value)}
                                placeholder="e.g., 5"
                            />
                        </div>

                        {/* Primary Use Case Dropdown */}
                        <div>
                            <label className={labelClasses} htmlFor="useCase">Primary Use Case</label>
                            <select
                                id="useCase"
                                className={inputClasses}
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
                </section>

                {/* --- Section 2: Dynamic Tools Stack --- */}
                <section>
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center">
                            <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm shadow-md shadow-indigo-200">2</span>
                            AI Tools Stack
                        </h3>
                    </div>

                    <div className="space-y-4">
                        {tools.map((tool) => {
                            // Extract available plans for the currently selected tool (if any)
                            const availablePlans = tool.toolName && toolsData[tool.toolName]
                                ? toolsData[tool.toolName]
                                : [];

                            return (
                                <div
                                    key={tool.id}
                                    className="group flex flex-col md:flex-row gap-4 p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-300 relative"
                                >
                                    {/* Tool Selection Dropdown */}
                                    <div className="flex-1">
                                        <label className={labelClasses}>Tool</label>
                                        <select
                                            className={inputClasses}
                                            value={tool.toolName}
                                            onChange={(e) => handleToolChange(tool.id, 'toolName', e.target.value)}
                                        >
                                            <option value="">Select a tool...</option>
                                            {Object.keys(toolsData).map(toolName => (
                                                <option key={toolName} value={toolName}>{toolName}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Plan Selection Dropdown */}
                                    <div className="flex-1">
                                        <label className={labelClasses}>Plan</label>
                                        <select
                                            className={`${inputClasses} ${!tool.toolName ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}`}
                                            value={tool.planName}
                                            onChange={(e) => handleToolChange(tool.id, 'planName', e.target.value)}
                                            disabled={!tool.toolName} // Disable if no tool is selected
                                        >
                                            <option value="">Select plan...</option>
                                            {availablePlans.map(plan => (
                                                <option key={plan} value={plan}>{plan}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Monthly Spend Input */}
                                    <div className="w-full md:w-32">
                                        <label className={labelClasses}>Spend/Mo</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                                            <input
                                                type="number"
                                                min="0"
                                                className={`${inputClasses} pl-8`}
                                                value={tool.monthlySpend === 0 ? '' : tool.monthlySpend}
                                                onChange={(e) => handleToolChange(tool.id, 'monthlySpend', e.target.value)}
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>

                                    {/* Seats Input */}
                                    <div className="w-full md:w-24">
                                        <label className={labelClasses}>Seats</label>
                                        <input
                                            type="number"
                                            min="1"
                                            className={inputClasses}
                                            value={tool.seats}
                                            onChange={(e) => handleToolChange(tool.id, 'seats', e.target.value)}
                                        />
                                    </div>

                                    {/* Remove Tool Button */}
                                    <div className="flex items-end md:pb-1">
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTool(tool.id)}
                                            className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                                            title="Remove Tool"
                                        >
                                            <TrashIcon />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Add New Tool Button */}
                    <button
                        type="button"
                        onClick={handleAddTool}
                        className="mt-5 w-full md:w-auto flex items-center justify-center px-6 py-3 border-2 border-dashed border-indigo-300 text-indigo-600 rounded-xl hover:bg-indigo-50 hover:border-indigo-400 transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <PlusIcon />
                        Add Another Tool
                    </button>
                </section>

                {/* --- Section 3: Summary / Total --- */}
                <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center bg-gray-50/80 p-8 rounded-2xl shadow-inner">
                    <div>
                        <p className="text-gray-600 font-medium text-lg">Estimated Monthly Spend</p>
                        <p className="text-sm text-gray-400 mt-1">Based on {tools.length} active tool(s) and assigned seats</p>
                    </div>
                    <div className="text-5xl font-black text-gray-900 mt-4 md:mt-0 tracking-tight">
                        ${totalMonthlySpend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        <span className="text-xl text-gray-500 font-semibold ml-2">/ mo</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SpendForm;
