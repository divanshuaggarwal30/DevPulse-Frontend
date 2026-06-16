import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // 1. VERIFY AND FETCH ON LOAD
  useEffect(() => {
    const fetchIssues = async () => {
      const token = localStorage.getItem('token');
      
      // If no token exists, kick them out to login
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // Fetch data using the VIP Pass
        const response = await fetch('https://devpulse-api-azzy.onrender.com/api/issues', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}` // This proves who is asking
          }
        });

        if (response.ok) {
          const data = await response.json();
          // Adjust this depending on how your backend sends the array (e.g., data.data or just data)
          setIssues(Array.isArray(data) ? data : data.issues || []); 
        } else {
          console.error("Failed to fetch issues, token might be expired.");
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [navigate]);

  // 2. CREATE NEW ISSUE ENGINE
  const handleCreateIssue = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('https://devpulse-api-azzy.onrender.com/api/issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          title: title, 
          description: description,
          status: 'Open' // Default status
        })
      });

      if (response.ok) {
        const newIssue = await response.json();
        // Add the new issue to the top of the list instantly without refreshing the page
        setIssues([newIssue, ...issues]); 
        // Clear the form
        setTitle('');
        setDescription('');
      } else {
        alert("Failed to create issue. Check backend logs.");
      }
    } catch (error) {
      console.error("Error creating issue:", error);
    }
  };

  // 3. SECURE LOGOUT
  const handleLogout = () => {
    localStorage.removeItem('token'); // Destroy the VIP pass
    navigate('/login'); // Kick to front door
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Header Area */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Active Workflows</h2>
          <p className="text-gray-400 text-sm">Live data streaming from MongoDB Atlas</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm font-mono">Total: <strong className="text-white">{issues.length}</strong></span>
          <button onClick={handleLogout} className="bg-red-900/30 text-red-400 hover:bg-red-900/50 border border-red-800 px-4 py-2 rounded text-sm transition font-bold">
            Log Out
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: The Creation Form */}
        <div className="md:col-span-1">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 sticky top-4">
            <h3 className="text-xl font-bold text-white mb-4">Initialize Workflow</h3>
            <form onSubmit={handleCreateIssue} className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Task Title (e.g., Update AI Prompt)" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded focus:border-blue-500 focus:outline-none text-sm" 
                />
              </div>
              <div>
                <textarea 
                  placeholder="Detailed description of the workflow..." 
                  required
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded focus:border-blue-500 focus:outline-none text-sm resize-none" 
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition duration-200"
              >
                Deploy Task
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: The Data Feed */}
        <div className="md:col-span-2 space-y-4">
          {loading ? (
            <div className="text-center py-10 text-gray-500 animate-pulse">Syncing with database...</div>
          ) : issues.length === 0 ? (
            <div className="bg-gray-900 border border-gray-800 border-dashed rounded-lg p-10 text-center">
              <p className="text-gray-500">Database is empty. Initialize your first workflow to the left.</p>
            </div>
          ) : (
            issues.map((issue, index) => (
              <div key={issue._id || index} className="bg-gray-800 p-5 rounded-lg border border-gray-700 hover:border-gray-500 transition">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-bold text-white">{issue.title || 'Untitled Task'}</h4>
                  <span className="bg-blue-900/30 text-blue-400 border border-blue-800 text-xs px-2 py-1 rounded font-mono">
                    {issue.status || 'Active'}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{issue.description || 'No description provided.'}</p>
                <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between text-xs text-gray-500 font-mono">
                  <span>ID: {issue._id ? issue._id.substring(0, 8) + '...' : 'pending'}</span>
                  <span>{new Date(issue.createdAt || Date.now()).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;