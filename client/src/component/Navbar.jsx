import React from 'react';
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { useDispatch } from 'react-redux';
import { logout } from '../feature/userSlice';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    dispatch(logout()); // Call dispatch with logout action
    navigate('/login'); // Navigate to the login page after logout
  };

  return (
    <div className="navbar bg-blue-700">
      <div className="flex-1">
        <Link
          to="/dashboard"
          className="btn btn-ghost text-3xl font-bold text-white"
        >
          Tale<span className='text-yellow-300'>GEN</span>
        </Link>
      </div>
      <div></div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <div className="w-10 h-10 flex items-center justify-center">
              <CgProfile className="text-secondary w-6 h-6" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between text-purple-800 hover:bg-purple-100">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <button className="text-purple-800 hover:bg-purple-100" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
