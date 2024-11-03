import React from 'react'
import { Loader } from "lucide-react";
import { useState } from 'react';
import Navbar from '../component/Navbar';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import bedTimeStories from '../../data/storySuggestions';
import { GiFlowerTwirl } from "react-icons/gi";



function Create() {

  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    moral: '',
    language: 'english',
    ageGroup: '',
    illustrationType: '',
    gender: '',
    pages: 4, // Default number of pages
  });
  const [loading, setLoading] = useState(false);
  const [stodyId, setStodyId] = useState(null);
  const maxRetries = 5; // Maximum number of retries
  const retryDelay = 2000; // Delay between retries in milliseconds

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function randomStoriesTitle() {
    const number = Math.floor(Math.random() * bedTimeStories.length);
    setFormData({ ...formData, title: bedTimeStories[number] });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.ageGroup || !formData.illustrationType || !formData.gender) {
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);

    const data = {
      prompt: formData.title,
      age: formData.ageGroup,
      moral: formData.moral,
      language: formData.language,
      gender: formData.gender,
      pages: formData.pages,
    };

    let attempts = 0;
    let success = false;

    // Retry loop
    while (attempts < maxRetries && !success) {
      try {
        const response = await axios.post('/api/v1/stories/', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.data.stodyId) {
          setStodyId(response.data.stodyId);
          success = true;
        } else {
          attempts++;
          if (attempts < maxRetries) {
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
          }
        }
      } catch (err) {
        console.error(err);
        attempts++;
        if (attempts < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
      }
    }

    setLoading(false);

    if (!success) {
      setError(true);
    }
  };

  if (stodyId) {
    return <Navigate to={`/story/${stodyId}`} />;
  }

  return (
    <div className="min-h-screen bg- bg-yellow-300">
      <Navbar />
      {error ? (
        <div className="toast toast-top toast-end">
          <div className="alert alert-error">
            <span>Please enter details</span>
          </div>
        </div>
      ) : null}
      <div className=' py-5'>
        <div className="max-w-md mx-auto   bg-white ">
          <form onSubmit={handleSubmit} className="space-y-4 border-2 rounded- border-blue-800 p-6  shadow-lg">
            {/* Story Title Section */}
            <div className="space-y-2">
              <label htmlFor="title" className="label text-primary font-semibold">
                <span className="label-text">This story is about:</span>
                <span
                  onClick={randomStoriesTitle}
                  className="cursor-pointer p-1.5 bg-accent text-white rounded-full"
                >
                  <GiFlowerTwirl size={40} className='p-1 rounded-full border-neutral-content bg-white text-yellow-300' />
                </span>
              </label>
              <textarea
                id="title"
                name="title"
                className="textarea textarea-bordered w-full border-primary focus:ring-secondary"
                placeholder="Enter a title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            {/* Moral Section */}
            <div className="space-y-2">
              <label htmlFor="moral" className="label text-primary font-semibold">
                <span className="label-text">The moral of the story (optional):</span>
              </label>
              <textarea
                id="moral"
                name="moral"
                className="textarea textarea-bordered w-full border-primary focus:ring-secondary"
                placeholder="Describe the moral of the story"
                value={formData.moral}
                onChange={handleInputChange}
              />
            </div>

            {/* Age Group Section */}
            <div className="space-y-2">
              <span className="label-text text-primary font-semibold">Age Group:</span>
              <div className="flex space-x-4">
                {['0-3', '4-9', '9-12'].map(group => (
                  <label key={group} className="cursor-pointer text-primary">
                    <input
                      type="radio"
                      name="ageGroup"
                      className="radio radio-primary"
                      value={group}
                      onChange={handleInputChange}
                      checked={formData.ageGroup === group}
                    />
                    <span className="label-text ml-2">{group}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Illustration Type Section */}
            <div className="space-y-2">
              <span className="label-text text-primary font-semibold">Illustration Type:</span>
              <div className="flex space-x-4">
                {['cartoon', 'realistic', 'watercolor'].map(type => (
                  <label key={type} className="cursor-pointer text-primary">
                    <input
                      type="radio"
                      name="illustrationType"
                      className="radio radio-primary"
                      value={type}
                      onChange={handleInputChange}
                      checked={formData.illustrationType === type}
                    />
                    <span className="label-text ml-2">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Gender Section */}
            <div className="space-y-2">
              <span className="label-text text-primary font-semibold">Gender:</span>
              <div className="flex space-x-4">
                {['boy', 'girl'].map(gender => (
                  <label key={gender} className="cursor-pointer text-primary">
                    <input
                      type="radio"
                      name="gender"
                      className="radio radio-primary"
                      value={gender}
                      onChange={handleInputChange}
                      checked={formData.gender === gender}
                    />
                    <span className="label-text ml-2">{gender}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="label text-primary font-semibold">
                <span className="label-text">Number of Pages: {formData.pages}</span>
              </label>
              <input
                type="range"
                min="4"
                max="10"
                name="pages"
                value={formData.pages}
                onChange={handleInputChange}
                className="range range-primary bg-secondary"
              />
            </div>
            <div className="flex w-full justify-between px-2 text-xs">
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
            </div>

            {/* Submit Button */}
            <button
              className={`btn w-full bg-blue-800 text-white hover:bg-secondary`}
              type="submit"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner text-secondary"></span> : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Create