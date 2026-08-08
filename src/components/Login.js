import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
//API
import API from "../API";
//Components
import Button from "./Button";
//Styles
import { Wrapper } from "./Login.styles";
//Context
import { UserContext } from "../context/UserProvider";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const [, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    const handleInput = (e) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;

        if (name === 'username') {
            setUsername(value);
        }
        if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = async () => {
        setError(false);

        try {
            const requestToken = await API.getRequestToken();
            const sessionId = await API.authenticate(
                requestToken,
                username,
                password
            );
            
            if (sessionId) {
                setUser({ sessionId: sessionId.session_id, username });
                localStorage.setItem("session_id", sessionId.session_id);
                navigate('/');
            } else {
                setError(true);
            }
        } catch (error) {
            setError(true);
        }
    };

    return (
        <Wrapper>
            <p>A TMDB account is required to sign in. Please authenticate with your TMDB credentials to continue. <br />Don't have a TMDB account?{" "}
  <a
    href="https://www.themoviedb.org/signup"
    target="_blank"
    rel="noopener noreferrer"
  >
    Create one
  </a> 
</p>
            {error && <div className="error">There was an error! please check username and password.</div>}
            <label htmlFor="username">Username:</label>
            <input
                id="username"
                type="text"
                value={username}
                name="username"
                onChange={handleInput}
            />
            <label htmlFor="password">Password:</label>
            <input
                id="password"
                type="password"
                value={password}
                name="password"
                onChange={handleInput}
            />
            <Button text="Login" callback={handleSubmit} />
        </Wrapper>
    );
}

export default Login;
