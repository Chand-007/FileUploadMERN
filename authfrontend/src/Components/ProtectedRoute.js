import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { authenticate } from '../Services/authService';

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);  
    const token = localStorage.getItem("token");

    useEffect(() => {
        
        if (token) {
            authenticate(token)
                .then((message) => {
                    if (message["message"] === "Authenticated") {
                        setIsAuthenticated(true);  
                    } else {
                        setIsAuthenticated(false);  
                    }
                })
                .catch((error) => {
                    console.error("Authentication error:", error);
                    setIsAuthenticated(false);  
                });
        } else {
            setIsAuthenticated(false);  
        }
    }, [token]);  

   
    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

  
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};



export default ProtectedRoute;
