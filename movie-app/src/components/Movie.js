import React from "react";
import { useParams } from "react-router-dom";

//config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";

//components
//import Grid from "./Grid";
import Spinner from "./Spinner";
import BreadCrumb from "./BreadCrumb";
import MovieInfo from "./MovieInfo";

//hook
import { useMovieFetch } from "../hooks/useMovieFetch";

//image
import NoImage from "../images/no_image.jpg";


const Movies = () => {
    const { movieId } = useParams();
    const { state, loading, error } = useMovieFetch(movieId);

    console.log(state);

    if (loading) return <Spinner />;

    if (error) return <div>Something went wrong...</div>;


    return (
        <>
        <BreadCrumb movieTitle={state.original_title} />
        <MovieInfo movie={state} />
        </>
        );
    }

export default Movies;