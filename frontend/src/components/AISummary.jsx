import React, { useState, useEffect } from 'react';

export default function AISummary({ totalSavings, tools, teamSize, useCase }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/summary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ totalSavings, tools, teamSize, useCase }),
        });

        const data = await response.json();
        setSummary(data.summary);
      } catch (error) {
        console.error('Failed to fetch AI summary', error);
        setSummary("We analyzed your AI spending and found potential areas for optimization. By switching to more cost-effective plans or removing unused seats, you can significantly reduce your monthly expenses without sacrificing productivity. Review the recommendations below to take action.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [totalSavings, tools, teamSize, useCase]);

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-6 shadow-sm mb-8">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <h3 className="text-xl font-bold text-gray-900">AI Spend Analysis</h3>
      </div>
      
      {loading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-indigo-200 rounded w-3/4"></div>
            <div className="h-4 bg-indigo-200 rounded"></div>
            <div className="h-4 bg-indigo-200 rounded w-5/6"></div>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 leading-relaxed text-sm md:text-base">
          {summary}
        </p>
      )}
    </div>
  );
}
