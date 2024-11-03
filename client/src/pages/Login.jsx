import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../feature/userSlice';


function Login() {
  const dispatch=useDispatch()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // For programmatic navigation


  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        '/api/v1/user/login',  // Your login API endpoint
        JSON.stringify(formData),  // Sending raw JSON data (username, password)
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) { // Check if response is successful
        const name=response.data.user.username
        console.log(name)
        dispatch(loginSuccess(name))
        navigate('/dashboard'); // Navigate to dashboard or any other page after successful login
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-400">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full border-4 border-blue-900">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600 font-extrabold text-3xl">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-yellow-300"
              placeholder="Enter your username"
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
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-yellow-300"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full  bg-secondary hover:bg-primary hover:text-secondary text-blue-600 font-bold py-2 rounded transition duration-200"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {error && <p className="mt-4 text-center text-red-600">{error}</p>}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <Link to="/register" className="text-purple-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
