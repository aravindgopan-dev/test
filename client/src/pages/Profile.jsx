import React from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import { loginSuccess } from '../feature/userSlice';
function Profile() {
    
    const dispatch=useDispatch()
    const name=useSelector((state)=>state.user.user)
    console.log(name)
    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-200 via-pink-300 to-purple-400 flex items-center justify-center">
            <div className="max-w-5xl mx-auto py-12 px-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-pink-900 mb-6">Profile</h2>

                {/* Display Name */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-pink-900 font-semibold">Name:</label>
                        <p className="text-purple-800">Aravind Gopan</p>
                    </div>

                    {/* Display Email */}
                    <div className="space-y-2">
                        <label className="block text-pink-900 font-semibold">Email:</label>
                        <p className="text-purple-800">aravindgopan.dev@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
