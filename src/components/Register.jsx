import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Added the router import

const Register = () => {
  const navigate = useNavigate(); // 2. Initialized the navigator
  
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    company: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.fullName,
        email: formData.emailAddress,
        company: formData.company,
        role: formData.role,
        password: formData.password
      };

      const response = await fetch('https://devpulse-api-azzy.onrender.com/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Server rejected the registration');
      }

      console.log("Secure JWT Token:", data.token);
      
      // Clear the form on success
      setFormData({
        fullName: '', emailAddress: '', company: '', role: '', password: '', confirmPassword: ''
      });

      // 3. TELEPORT TO LOGIN!
      navigate('/login'); 

    } catch (error) {
      console.error("Registration failed:", error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">Create your account</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input type="text" name="fullName" placeholder="Full Name" required
            value={formData.fullName} onChange={handleChange}
            className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <input type="email" name="emailAddress" placeholder="Email Address" required
            value={formData.emailAddress} onChange={handleChange}
            className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded focus:border-blue-500 focus:outline-none" />
        </div>
        <div className="flex gap-4">
          <input type="text" name="company" placeholder="Company" 
            value={formData.company} onChange={handleChange}
            className="w-1/2 p-3 bg-gray-900 text-white border border-gray-600 rounded focus:border-blue-500 focus:outline-none" />
          <input type="text" name="role" placeholder="Role" 
            value={formData.role} onChange={handleChange}
            className="w-1/2 p-3 bg-gray-900 text-white border border-gray-600 rounded focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <input type="password" name="password" placeholder="Password" required
            value={formData.password} onChange={handleChange}
            className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <input type="password" name="confirmPassword" placeholder="Confirm Password" required
            value={formData.confirmPassword} onChange={handleChange}
            className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded focus:border-blue-500 focus:outline-none" />
        </div>
        
        <button type="submit" disabled={loading}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition duration-200">
          {loading ? "Registering..." : "Sign up"}
        </button>
      </form>
    </div>
  );
};

export default Register;