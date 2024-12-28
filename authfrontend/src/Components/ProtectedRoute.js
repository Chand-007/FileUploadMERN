import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { authenticate } from '../Services/authService';

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);  // State to track authentication status
    const token = localStorage.getItem("token");

    useEffect(() => {
        // Check if there is a token and authenticate the user
        if (token) {
            authenticate(token)
                .then((message) => {
                    if (message["message"] === "Authenticated") {
                        setIsAuthenticated(true);  // User is authenticated
                    } else {
                        setIsAuthenticated(false);  // Authentication failed
                    }
                })
                .catch((error) => {
                    console.error("Authentication error:", error);
                    setIsAuthenticated(false);  // Failed to authenticate
                });
        } else {
            setIsAuthenticated(false);  // No token, so not authenticated
        }
    }, [token]);  // Effect runs when the token changes

    // If authentication state is not determined yet, you can show a loading spinner or something else
    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    // If authenticated, render the protected routes (Outlet), otherwise redirect to login
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};



export default ProtectedRoute;
