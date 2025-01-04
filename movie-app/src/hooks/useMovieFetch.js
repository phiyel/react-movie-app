import { useState, useEffect } from "react";
import API from "../API";
// Helpers
import { isPersistedState } from "../helpers";

export const useMovieFetch = movieId => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                setError(false);

                const movie = await API.fetchMovie(movieId);
                const credits = await API.fetchCredits(movieId);
                // Get directors only
                const directors = credits.crew.filter(
                    member => member.job === 'Director'
                );

                const newState = {
                    ...movie,
                    actors: credits.cast,
                    directors
                };

                setState(newState);
                setLoading(false);

                // Write to sessionStorage
                sessionStorage.setItem(movieId, JSON.stringify(newState));
            } catch (error) {
                setError(true);
            }
        };

        const sessionState = isPersistedState(movieId);

        if (sessionState) {
            console.log('Grabbing from sessionStorage');
            setState(sessionState);
            setLoading(false);
            return;
        }

        fetchMovie();
    }, [movieId]);

    return { state, loading, error };
};