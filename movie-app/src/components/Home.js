import React from "react";
// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";

// Components
import HeroImage from "../components/HeroImage";
import Grid from "../components/Grid";
import Thumb from "../components/Thumb";    
import Spinner from "../components/Spinner";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";

// Hook
import { useHomeFetch } from "../hooks/useHomeFetch";

// Image
import NoImage from "../images/no_image.jpg";

const Home = () => {

    const { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore } = useHomeFetch();
    
    if (loading && state.page === 1) return ( <Spinner /> );

    if (error) return <div>Something went wrong...</div>;

    // Filter out duplicate movies
  const uniqueMovies = state.results.filter((movie, index, self) =>
    index === self.findIndex((m) => m.id === movie.id)
  );

    return (
        <>
                {!searchTerm && state.results[0] ? (
                    <HeroImage
                        image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
                        title={state.results[0].original_title}
                        text={state.results[0].overview}
                    />
                ) : null}
                <SearchBar setSearchTerm={setSearchTerm} />
            <Grid header={searchTerm ? 'Search Results':'Popular Movies'}>
                {uniqueMovies.map(movie => (
                    <Thumb
                        key={movie.id} // Use movie.id as the key
                        clickable
                        image={
                        movie.poster_path
                            ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                            : NoImage
                        }
                        movieId={movie.id}
                        title={movie.title}
                        />
                    ))}
                </Grid>
                {loading && <Spinner />}
                {state.page < state.total_pages && !loading && (
                <Button text='Load More' callback={() => setIsLoadingMore(true)} />
                )}
                
            </>
    );

 }

export default Home;
