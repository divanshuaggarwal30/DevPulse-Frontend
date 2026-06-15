import React from 'react';
import Dashboard from './components/Dashboard.jsx'; 
import Register from './components/Register.jsx'; // <-- 1. Import the new form
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <nav className="bg-gray-950 border-b border-gray-800 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tight text-white">
            DEV<span className="text-blue-500">PULSE</span>
          </h1>
        </div>
      </nav>
      <main className="pb-20">
        {/* Temporarily rendering both to test the full stack */}
        <Register />
        <div className="mt-12 border-t border-gray-800 pt-12">
          <Dashboard />
        </div>
      </main>
      
      <Analytics />
    </div>
  );
}

export default App;