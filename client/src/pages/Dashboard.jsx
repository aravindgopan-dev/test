import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CgStories } from 'react-icons/cg';

function Dashboard() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const getStories = async () => {
      try {
        const response = await axios.get('/api/v1/stories'); // Adjust the URL as needed
        console.log(response.data);
        setStories(response.data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };
    getStories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <Navbar />
      <div className="p-4">
        <div className="flex justify-end mb-4">
          <Link to="/create">
            <button className="bg-yellow-300 text-blue-600 font-bold py-2 px-4 rounded hover:bg-purple-700 transition duration-200">
              Create Story
            </button>
          </Link>
        </div>
        <div>
          <h2 className="text-blue-900 font-extrabold text-xl mb-4">Story collection</h2>
          {stories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stories.map((story) => (
                <div key={story.id} className="border p-4 rounded-md w-full shadow-lg bg-white transition-transform transform hover:scale-105">
                  <img src={story.coverUrl} alt={story.title} className="rounded-md mb-2 w-" />
                  <h3 className="text-lg font-semibold text-blue-800">{story.title}</h3>
                  <div className="mt-2">
                    <Link to={`/story/${story._id}`}>
                      <button className="bg-blue-500 text-white font-bold py-1 px-3 rounded hover:bg-blue-700 transition duration-200" onClick={()=>{}}>
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-blue-800">No stories available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
