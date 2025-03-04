import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../API";
import Button from "../Button";
import { Wrapper } from "../Login.styles";
import { UserContext } from "../../context/UserProvider";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [error, setError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const navigate = useNavigate();
    const [, setUser] = useContext(UserContext);

    const handleSignUp = async () => {
        setError(false);
        setUsernameError(false);

        if (!username) {
            setUsernameError(true);
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
                    return;
                }
            }

            setUser({ guestSessionId: guestSession.guest_session_id, username });
            navigate("/");
        } catch (error) {
            setError(true);
        }
    };

    return (
        <Wrapper>
            {error && <div className="error">There was an error! Please try again.</div>}
            <label>Username:</label>
            <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
            />
            {usernameError && <div className="error">Username is required!</div>}
            <Button text="Sign Up as Guest" callback={handleSignUp} />
        </Wrapper>
    );
};

export default SignUp;