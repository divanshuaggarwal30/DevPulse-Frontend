import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://devpulse-api-azzy.onrender.com/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      // 1. SAVE THE VIP PASS TO THE BROWSER!
      localStorage.setItem('token', data.token);
      
      // 2. TELEPORT TO THE DASHBOARD!
      navigate('/dashboard'); 

    } catch (error) {
      console.error("Login failed:", error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">Welcome Back</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input type="email" name="email" placeholder="Email Address" required
            value={formData.email} onChange={handleChange}
            className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <input type="password" name="password" placeholder="Password" required
            value={formData.password} onChange={handleChange}
            className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded focus:border-blue-500 focus:outline-none" />
        </div>
        
        <button type="submit" disabled={loading}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition duration-200">
          {loading ? "Authenticating..." : "Log in"}
        </button>
      </form>
    </div>
  );
};

export default Login;