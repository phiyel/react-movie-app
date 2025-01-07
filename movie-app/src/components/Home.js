import React , { Component } from "react";

// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";
//API
import API from '../API';
// Components
import HeroImage from "../components/HeroImage";
import Grid from "../components/Grid";
import Thumb from "../components/Thumb";    
import Spinner from "../components/Spinner";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import Footer from "../components/Footer";


// Image
import NoImage from "../images/no_image.jpg";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
};

class Home extends Component {

    state = {
        movies: initialState,
        searchTerm: '',
        isLoadingMore: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        this.fetchMovies(1);
    }

  fetchMovies = async (page, searchTerm = '') => {
    try {
        this.setState({ error: false, loading: true });

        const movies = await API.fetchMovies(searchTerm, page);

        this.setState(prev => ({
            movies: {
            ...movies,
            results:
                page > 1 ? [...prev.movies.results, ...movies.results] : [...movies.results]
            },
            loading: false
        }));
    } catch (error) {
        this.setState({ error: true, loading: false });
    }
    
    };

    handleSearch = searchTerm => {
        this.setState({ searchTerm, loading: true, movies: initialState }, () => {
            this.fetchMovies(1, this.state.searchTerm);
        });
    };

    handleLoadMore = () => {
        this.fetchMovies(this.state.movies.page + 1, this.state.searchTerm);
    }
  

render() {

    const { searchTerm, movies, loading, error } = this.state;

    // Filter out duplicate movies
  const uniqueMovies = movies.results.filter((movie, index, self) =>
    index === self.findIndex((m) => m.id === movie.id)
  );

  if (loading && movies.page === 1) return <Spinner />;
  if (error) return <div>Something went wrong...</div>;

    return (
        <>
                {!searchTerm && movies.results[0] ? (
                    <HeroImage
                        image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${movies.results[0].backdrop_path}`}
                        title={movies.results[0].original_title}
                        text={movies.results[0].overview}
                    />
                ) : null}
                <SearchBar setSearchTerm={this.handleSearch} />
                <Grid header={searchTerm ? 'Search Results' : 'Popular Movies'}>
                    {uniqueMovies.map(movie => (
                        <Thumb
                            key={movie.id}
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
                {movies.page < movies.total_pages && !loading && (
                    <Button text='Load More' callback={this.handleLoadMore} />
                )}

                <Footer />
            </>
    );
}
}

export default Home;
