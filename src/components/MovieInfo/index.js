import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
import NoImage from "../../images/no_image.jpg";
import { Wrapper, Content, Text } from "./MovieInfo.styles";
import Thumb from "../Thumb";
import Rate from "../Rate";
import { UserContext } from "../../context/UserProvider";
import API from "../../API";

const getLanguageName = (languageCode) => {
    if (!languageCode) return "Unknown";

    try {
        const normalizedCode = String(languageCode).toLowerCase();
        const displayNames = new Intl.DisplayNames(["en"], { type: "language" });
        return displayNames.of(normalizedCode) || normalizedCode.toUpperCase();
    } catch (_error) {
        return String(languageCode).toUpperCase();
    }
};

const MovieInfo = ({ movie }) => {
    const [user] = useContext(UserContext);
    const lastTrackedMovieIdRef = useRef(null);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        if (typeof window === "undefined" || !movie?.id) return;
        if (lastTrackedMovieIdRef.current === movie.id) return;

        lastTrackedMovieIdRef.current = movie.id;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            category: "movie_selected",
            action: "click",
            rawPath: window.location.pathname,
            pagePath: window.location.pathname,
            pageTitle: movie.title,
            movieId: movie.id,
            movieTitle: movie.title
        });
    }, [movie?.id, movie?.title]);

    useEffect(() => {
        const fetchVideos = async () => {
            const videoData = await API.fetchMovieVideos(movie.id);
            setVideos(videoData?.results || []);
        };

        fetchVideos();
    }, [movie.id]);

    const selectedVideo = videos[2] || videos[0] || null;


    return (
        <Wrapper $backdrop={movie.backdrop_path}>
            <Content>
                <Thumb
                    image={
                        movie.poster_path
                            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                            : NoImage
                    }
                    clickable={false}
                />
                <Text>
                    <h1>{movie.title}</h1>
                    <h3>PLOT</h3>
                    <p>{movie.overview}</p>
                    {user && (
                        <div>
                            
                            <h3>ORIGIN COUNTRY</h3>
                            <p>{movie.origin_country}</p>
                            <h3>ORIGINAL LANGUAGE</h3>
                            <p>{getLanguageName(movie.original_language)}</p>
                            <h3>RELEASE DATE</h3>
                            <p>{movie.release_date}</p>
                            <h3>GENRE</h3>
                            <p>{movie.genres.map(genre => genre.name).join(", ")}</p>
                        </div>
                    )}
                    <div className="rating-directors">
                        <div>
                            <h3>RATING</h3>
                            <div className="score">{movie.vote_average}</div>
                        </div>
                        <div className="director">
                            <h3>DIRECTOR{movie.directors.length > 1 ? "S" : ""}</h3>
                            {movie.directors.map((director) => (
                                <p key={director.credit_id}>{director.name}</p>
                            ))}
                        </div>
                    </div>
                    {user && (
                        <div className="rate-movie">
                            <p>Rate Movie</p>
                            <Rate movieId={movie.id} />
                        </div>
                    )}
                    {user && selectedVideo && (
                        <div className="video-section">
                            <h3>VIDEO</h3>
                            <div key={selectedVideo.id}>
                                <p>{selectedVideo.name}</p>
                                <iframe
                                    width="560"
                                    height="315"
                                    src={`https://www.youtube-nocookie.com/embed/${selectedVideo.key}?rel=0&modestbranding=1`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={selectedVideo.name}
                                    loading="lazy"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                ></iframe>
                            </div>
                        </div>
                    )}
                </Text>
            </Content>
        </Wrapper>
    );
};

MovieInfo.propTypes = {
    movie: PropTypes.object
};

export default MovieInfo;