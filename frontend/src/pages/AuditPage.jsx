import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Results from '../components/Results';
import AISummary from '../components/AISummary';

export default function AuditPage() {
  // 1. Get the dynamic :id parameter from the URL
  const { id } = useParams();
  
  // State to hold the shared data
  const [sharedData, setSharedData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2. Try to fetch the saved audit data from localStorage using the ID
    const saved = localStorage.getItem(`shared_audit_${id}`);
    
    if (saved) {
      try {
        setSharedData(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse shared audit data", err);
      }
    }
    
    setLoading(false);
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-500 text-lg">Loading audit results...</p>
      </div>
    );
  }

  // Error state: If no data was found for this ID in localStorage
  if (!sharedData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-md w-full">
          <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Audit Not Found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the audit results for this link. It may have expired or you might be on a different device.
          </p>
          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors w-full"
          >
            Run a New Audit
          </Link>
        </div>
      </div>
    );
  }

  // Success state: Render the shared results
  const { auditData, tools, teamSize, useCase } = sharedData;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Create New Audit
        </Link>
        <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
          Shared View
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Render the components using the shared data! */}
        <AISummary 
          totalSavings={auditData.totalMonthlySavings} 
          tools={tools} 
          teamSize={teamSize} 
          useCase={useCase} 
        />
        <Results auditData={auditData} />
      </div>
    </div>
  );
}
