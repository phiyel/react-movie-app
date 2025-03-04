import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import API from "../../API";
import { UserContext } from "../../context/UserProvider";

const Rate = ({ movieId }) => {
    const [value, setValue] = useState(5);
    const [user] = useContext(UserContext);

    const handleRate = async () => {
        const sessionId = user?.guestSessionId || localStorage.getItem("guest_session_id");
        if (sessionId) {
            try {
                const response = await API.rateMovie(sessionId, movieId, value);
                if (response.success) {
                    alert("Movie rated successfully!");
                } else {
                    alert("Failed to rate the movie. Please try again.");
                }
            } catch (error) {
                alert("An error occurred while rating the movie. Please try again.");
            }
        } else {
            alert("You need to be logged in to rate a movie.");
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
        </div>
    );
};

Rate.propTypes = {
    movieId: PropTypes.number.isRequired
};

export default Rate;