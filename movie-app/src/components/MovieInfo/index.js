import React, { useContext } from "react";
import PropTypes from "prop-types";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
import NoImage from "../../images/no_image.jpg";
import { Wrapper, Content, Text } from "./MovieInfo.styles";
import Thumb from "../Thumb";
import Rate from "../Rate";
import { UserContext } from "../../context/UserProvider";
//import API from "../../API";

const MovieInfo = ({ movie }) => {
    const [user] = useContext(UserContext);
   // const [videos, setVideos] = useState([]);

    // useEffect(() => {
    //     const fetchVideos = async () => {
    //         const videoData = await API.fetchMovieVideos(movie.id);
    //         console.log("Video Data:", videoData); // Log the video data
    //         setVideos(videoData.results);
    //     };

    //     fetchVideos();
    // }, [movie.id]);


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
                        <div>
                            <p>Rate Movie</p>
                            <Rate movieId={movie.id} />
                        </div>
                    )}
                    {/* {user && videos.length > 0 && (
                        <div>
                            <h3>VIDEO</h3>
                            <div key={videos[2].id}>
                                <p>{videos[2].name}</p>
                                <iframe
                                    width="560"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${videos[2].key}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={videos[2].name}
                                    sandbox="allow-scripts allow-same-origin allow-presentation"
                                ></iframe>
                            </div>
                        </div>
                    )} */}
                </Text>
            </Content>
        </Wrapper>
    );
};

MovieInfo.propTypes = {
    movie: PropTypes.object
};

export default MovieInfo;