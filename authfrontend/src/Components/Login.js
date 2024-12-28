import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { login } from "../Services/authService";
import {Link} from 'react-router-dom'
import axios from "axios"
import '../Styles/Login.css'


export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [isMfaRequired, setIsMfaRequired] = useState(false);
    const [error, setError] = useState(null);
    const history = useNavigate()


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            if (response.data.mfaRequired) {
                setIsMfaRequired(true);
            }
        } catch (err) {
            setError(err.response.data.message || "Login failed");
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/verifyotp", { email, otp });
            const token = response.data.token;
            localStorage.setItem("token", token); // Store JWT token in localStorage
            history("/homepage"); // Redirect to protected route
        } catch (err) {
            setError(err.response.data.message || "OTP verification failed");
        }
    };

    return (
        <div className="Total-Login-Container">
            <h2>Login Page</h2>
            {!isMfaRequired ? (
                <div className="loginContainer">
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>

                </form>
                <Link to='/register'>Register Here</Link>
                </div>
            ) : (
                <form onSubmit={handleVerifyOtp}>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button type="submit">Verify OTP</button>
                </form>
            )}
            {error && <p>{error}</p>}
        </div>
    );
}