import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx'; 
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 font-sans">
        
        {/* Global Navigation Bar */}
        <nav className="bg-gray-950 border-b border-gray-800 p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-black tracking-tight text-white">
              DEV<span className="text-blue-500">PULSE</span>
            </h1>
          </div>
        </nav>
        
        {/* Main Routing Area */}
        <main className="pb-20 pt-10">
          <Routes>
            {/* This acts as the bouncer for the base URL. 
              If a user goes to yourwebsite.com/, it instantly teleports them to /login
            */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* The individual rooms of your application */}
            <Route path="/signup" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        
        {/* Vercel Web Analytics */}
        <Analytics />
        
      </div>
    </BrowserRouter>
  );
}

export default App;