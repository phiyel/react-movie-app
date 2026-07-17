import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../API";
import Button from "../Button";
import { Wrapper } from "../Login.styles";
import { UserContext } from "../../context/UserProvider";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const navigate = useNavigate();
    const [, setUser] = useContext(UserContext);

    const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const handleUsernameChange = (event) => {
        const value = event.currentTarget.value;
        setUsername(value);

        if (value.trim()) {
            setUsernameError(false);
        }
    };

    const handleEmailChange = (event) => {
        const value = event.currentTarget.value;
        setEmail(value);

        if (value.trim() && isValidEmail(value.trim())) {
            setEmailError(false);
        }
    };

    const handleSignUp = async () => {
        setError(false);
        // Reset error messages - remove later
        setErrorMessage("");
        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();
        const hasUsernameError = !trimmedUsername;
        const hasEmailError = !trimmedEmail || !isValidEmail(trimmedEmail);

        setUsernameError(hasUsernameError);
        setEmailError(hasEmailError);

        if (hasUsernameError || hasEmailError) {
            return;
        }

        try {
            let guestSession = JSON.parse(localStorage.getItem("guest_session"));
            if (!guestSession || new Date(guestSession.expires_at) < new Date()) {
                guestSession = await API.createGuestSession();
                if (guestSession.success) {
                    localStorage.setItem("guest_session", JSON.stringify(guestSession));
                } else {
                    setError(true);
                    setErrorMessage("Could not create TMDB guest session. Please try again.");
                    return;
                }
            }

            await API.saveSignup({
                username: trimmedUsername,
                email: trimmedEmail,
                tmdbGuestSessionId: guestSession.guest_session_id
            });

            setUser({ guestSessionId: guestSession.guest_session_id, username: trimmedUsername, email: trimmedEmail });
            //console.log("Guest Session ID set:", guestSession.guest_session_id); //
            navigate("/");
        } catch (error) {
            setError(true);
            setErrorMessage(error?.message || "There was an error! Please try again.");
        }
    };

    return (
        <Wrapper>
            {error && <div className="error">{errorMessage || "There was an error! Please try again."}</div>}
            <label htmlFor="signup-username">Username:</label>
            <input
                id="signup-username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
            />
            {usernameError && <div className="error">Username is required!</div>}
            <label htmlFor="signup-email">Email:</label>
            <input
                id="signup-email"
                type="email"
                value={email}
                onChange={handleEmailChange}
            />
            {emailError && <div className="error">Please enter a valid email address!</div>}
            <Button text="Sign Up as Guest" callback={handleSignUp} />
        </Wrapper>
    );
};

export default SignUp;