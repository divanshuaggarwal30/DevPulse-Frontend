import React from 'react';

const IssueCard = ({ issue }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="bg-blue-900 text-blue-300 text-xs font-semibold px-2.5 py-0.5 rounded">
            {issue.repository}
          </span>
          <h3 className="text-xl font-bold text-white mt-2">{issue.title}</h3>
        </div>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-900 text-green-300">
          {issue.status}
        </span>
      </div>
      <p className="text-gray-400 text-sm mb-4">{issue.description}</p>
    </div>
  );
};

export default IssueCard;