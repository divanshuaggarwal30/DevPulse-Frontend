import React, { useState, useEffect } from 'react';
import IssueCard from './IssueCard';

const Dashboard = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        // Fetching directly from your Express backend!
        const response = await fetch('http://localhost:5000/api/issues');
        if (!response.ok) throw new Error('Failed to fetch from backend');
        
        const result = await response.json();
        setIssues(result.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  if (loading) return <div className="text-center text-blue-500 mt-20 text-xl">Pinging backend...</div>;
  if (error) return <div className="text-center text-red-500 mt-20 text-xl">Connection Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8 border-b border-gray-700 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white">Active Workflows</h2>
          <p className="text-gray-400 mt-1">Live data streaming from MongoDB Atlas</p>
        </div>
        <div className="text-gray-400">
          Total: <span className="text-white font-bold">{issues.length}</span>
        </div>
      </div>

      {issues.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-10 text-center border border-dashed border-gray-600">
          <p className="text-gray-400 text-lg">No issues found in the database. Use Postman to POST a new issue!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {issues.map(issue => (
            <IssueCard key={issue._id} issue={issue} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;