import React from 'react';

function Home() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-3xl w-full bg-white rounded-xl shadow-xl overflow-hidden p-8 text-center">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                    AI Spend Audit Tool
                </h1>
                <p className="text-gray-600 text-lg">
                    Welcome to the AI Spend Audit Tool. A tool to monitor your spendings on AI.
                </p>
            </div>
        </div>
    );
}

export default Home;
