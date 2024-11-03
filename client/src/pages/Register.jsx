import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post(
        '/api/v1/user/register',
        JSON.stringify(formData),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) { // Check for successful status code
        setMessage('Registration successful!'); // Optionally set a success message
        navigate('/login'); // Programmatically navigate to the login page
      } else {
        setError('Registration failed.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while registering.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-800">
      <div className="bg-yellow-300 shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-800"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-800"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8} // Add minLength for validation
              className="mt-1 block w-full border border-gray-300  rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-800"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-bold py-2 rounded bg-blue-700"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
        {error && <p className="mt-4 text-center text-red-600">{error}</p>}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-purple-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
