import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed

function Rootnav() {
  return (
    <div className="bg-blue-800 p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-white text-2xl font-bold">Tale<span className='text-yellow-300'>GEN</span></h1>
        <div className="flex space-x-4">
          <Link to="/login">
            <button className="bg-yellow-400 text-blue-800 font-semibold py-2 px-4 rounded ">
              Login
            </button>
          </Link>
          
        </div>
      </div>
    </div>
  );
}

export default Rootnav;
