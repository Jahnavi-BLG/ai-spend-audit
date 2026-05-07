import React from 'react';

export default function Results({ auditData }) {

    if (!auditData) {
        return null;
    }

    const { results, totalMonthlySavings, totalYearlySavings } = auditData;

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg border border-gray-100">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">Audit Results</h2>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-center md:text-left">
                    <p className="text-green-800 font-semibold mb-1">Potential Monthly Savings</p>
                    <p className="text-4xl font-black text-green-600">${totalMonthlySavings.toLocaleString()}</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl text-center md:text-left">
                    <p className="text-blue-800 font-semibold mb-1">Potential Yearly Savings</p>
                    <p className="text-4xl font-black text-blue-600">${totalYearlySavings.toLocaleString()}</p>
                </div>
            </div>


            <h3 className="text-lg font-bold text-gray-800 mb-4">Recommendations</h3>


            {results.length === 0 ? (
                <div className="p-6 bg-gray-50 text-gray-600 rounded-xl text-center border border-gray-200">
                    <p className="font-semibold text-lg">Great job!</p>
                    <p>Your AI tool spend looks optimized. We didn't find any obvious savings based on our rules.</p>
                </div>
            ) : (
                <div className="space-y-4">

                    {results.map((rec, index) => (
                        <div key={index} className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">

                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                                <div>
                                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full mb-2">
                                        {rec.toolName} • {rec.currentPlan}
                                    </span>
                                    <h4 className="text-lg font-bold text-gray-900">{rec.recommendation}</h4>
                                </div>

                                <div className="mt-3 md:mt-0 md:text-right">
                                    <p className="text-sm text-gray-500 font-medium">Estimated Savings</p>
                                    <p className="text-xl font-bold text-green-600">+${rec.savings.toLocaleString()}/mo</p>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">
                                {rec.reason}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
