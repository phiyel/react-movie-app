import React from "react";
import { useParams } from "react-router-dom";

//config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";

//components
//import Grid from "./Grid";
import Spinner from "./Spinner";
import BreadCrumb from "./BreadCrumb";
import MovieInfo from "./MovieInfo";
import MovieInfoBar from "./MovieInfoBar";
import Actor from "./Actor";
import Footer from "./Footer";
//hook
import { useMovieFetch } from "../hooks/useMovieFetch";

//image
import NoImage from "../images/no_image.jpg";
import Grid from "./Grid";


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
            <MovieInfoBar
                time={state.runtime}
                budget={state.budget}
                revenue={state.revenue} />
            <Grid header='Actors'>
                {state.actors.map(actor => (
                    <Actor
                        key={actor.credit_id}
                        name={actor.name}
                        character={actor.character}
                        imageUrl={
                            actor.profile_path
                                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                                : NoImage
                        }
                        alt={actor.name}
                    />
                ))}
            </Grid>
            <Footer />
        </>
        );
    }

export default Movies;