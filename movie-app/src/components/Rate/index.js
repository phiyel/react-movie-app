import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import API from "../../API";
import { UserContext } from "../../context/UserProvider";

const Rate = ({ movieId }) => {
    const [value, setValue] = useState(5);
    const [message, setMessage] = useState("");
    const [user] = useContext(UserContext);

    const handleRate = async () => {
        const storedGuestSession = JSON.parse(localStorage.getItem("guest_session") || "null");
        const isGuestSessionExpired = storedGuestSession?.expires_at
            ? new Date(storedGuestSession.expires_at) < new Date()
            : false;

        const authSessionId = user?.sessionId || localStorage.getItem("session_id");
        const guestSessionId = user?.guestSessionId || (isGuestSessionExpired ? null : storedGuestSession?.guest_session_id);
        const sessionId = authSessionId || guestSessionId;
        const isGuest = !authSessionId && !!guestSessionId;

        if (sessionId) {
            try {
                const response = await API.rateMovie(sessionId, movieId, Number(value), isGuest);
                if (response.success) {
                    setMessage("Movie rated successfully!");
                } else {
                    setMessage("Failed to rate the movie. Please try again.");
                }
            } catch (error) {
                setMessage("An error occurred while rating the movie. Please try again.");
            }
        } else if (isGuestSessionExpired) {
            setMessage("Your guest session expired. Please sign up as guest again.");
        } else {
            setMessage("You need to be logged in to rate a movie.");
        }
    };

    return (
        <div>
            <input
                type="range"
                min="1"
                max="10"
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
            /> <br />
            <button type="button" onClick={handleRate}>
                Rate
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

Rate.propTypes = {
    movieId: PropTypes.number.isRequired
};

export default Rate;