import React, { useState } from 'react';

const LeadCapture = () => {
  const [formData, setFormData] = useState({
    email: '',
    companyName: '',
    role: ''
  });

  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setErrorMsg('');
  };

  const isValidEmail = (email) => {
    return email.includes('@') && email.includes('.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.companyName || !formData.role) {
      setErrorMsg('Please fill out all required fields.');
      return;
    }

    if (!isValidEmail(formData.email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('https://ai-spend-backend.onrender.com/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ email: '', companyName: '', role: '' });
      } else {
        setStatus('error');
        setErrorMsg('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
      setStatus('error');
      setErrorMsg('Failed to connect to the server.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Get Early Access</h2>
        <p className="text-gray-500 text-sm">
          Join the waitlist to see how you can optimize your AI software spend.
        </p>
      </div>

      {status === 'success' ? (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-6 py-8 rounded-xl text-center">
          <svg className="w-16 h-16 text-emerald-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="font-bold text-xl mb-2">Thank you!</h3>
          <p className="text-emerald-600 mb-6">
            We've received your information and will be in touch soon.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="text-emerald-700 hover:text-emerald-900 font-medium underline transition-colors"
          >
            Submit another response
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Work Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@company.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g. Acme Corp"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Your Role <span className="text-red-500">*</span>
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
            >
              <option value="" disabled>Select your role</option>
              <option value="founder">Founder / CEO</option>
              <option value="engineering">Engineering / IT</option>
              <option value="finance">Finance / Operations</option>
              <option value="other">Other</option>
            </select>
          </div>

          {errorMsg && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200 flex items-center">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className={`w-full py-3 px-4 text-white font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 mt-2 ${status === 'loading'
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-md'
              }`}
          >
            {status === 'loading' ? 'Submitting...' : 'Join Waitlist'}
          </button>
        </form>
      )}
    </div>
  );
};

export default LeadCapture;
