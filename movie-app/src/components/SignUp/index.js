import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../API";
import Button from "../Button";
import { Wrapper } from "../Login.styles";


const SignUp = () => {
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async () => {
        setError(false);

        try {
            const guestSession = await API.createGuestSession();
            if (guestSession.success) {
                // Store the guest session ID in local storage or context
                localStorage.setItem("guest_session_id", guestSession.guest_session_id);
                navigate("/");
            } else {
                setError(true);
            }
        } catch (error) {
            setError(true);
        }
    };

    return (
        <Wrapper>
            {error && <div className="error">There was an error! Please try again.</div>}
            <Button text="Sign Up as Guest" callback={handleSignUp} />
        </Wrapper>
    );
};

export default SignUp;