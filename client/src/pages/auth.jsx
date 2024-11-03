import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Added useSelector

function Auth() {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.user.isAuth); // Use isAuth to check authentication

    return (
        isAuth ? (
            <Outlet /> // Render child routes if authenticated
        ) : (
            <Navigate to="/login" /> // Redirect to login if not authenticated
        )
    );
}

export default Auth;
