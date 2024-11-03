import React from 'react';
import Rootnav from '../component/Rootnav';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <Rootnav></Rootnav>
      <div className="hero  min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-black text-7xl  font-extrabold">Hello there</h1>
            <p className="py-6 text-gray-700 font-semibold">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <Link to="/register">
              <button className="bg-blue-700 text-yellow-300 font-bold py-2 px-4 rounded hover:bg-yellow-300 hover:text-blue-600 transition duration-200">
                Get Started
              </button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
