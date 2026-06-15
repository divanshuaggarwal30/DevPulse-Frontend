import React from 'react';
// Explicitly adding .jsx to force Vite to find it
import Dashboard from './components/Dashboard.jsx'; 

function App() {
  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <nav className="bg-gray-950 border-b border-gray-800 p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-black tracking-tight text-white">
            DEV<span className="text-blue-500">PULSE</span>
          </h1>
        </div>
      </nav>
      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;