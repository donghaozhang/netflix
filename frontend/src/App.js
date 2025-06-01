import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import {
  NetflixHeader,
  HeroBanner,
  ContentRow,
  MovieModal,
  LoadingSpinner,
  SignInPage
} from './components';

// TMDB API configuration
const TMDB_API_KEY = 'c8dea14dc917687ac631a52620e4f7ad';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Netflix Clone Main App Component
function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [movieCategories, setMovieCategories] = useState({});
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock data fallback in case API fails
  const mockMovieData = {
    trending: [
      {
        id: 1001,
        title: "Pokémon Detective Pikachu",
        overview: "In a world where people collect Pokémon to do battle, a boy comes across an intelligent talking Pikachu who seeks to be a detective.",
        poster_path: null,
        backdrop_path: null,
        vote_average: 8.1,
        release_date: "2019-05-10",
        pokemon_image: "https://images.pexels.com/photos/1716861/pexels-photo-1716861.jpeg"
      },
      {
        id: 1002,
        title: "Pokémon: The First Movie - Mewtwo Strikes Back",
        overview: "Scientists genetically create a new Pokémon, Mewtwo, but the results are horrific and disastrous. Ash and his friends must fight against this powerful artificial Pokémon.",
        poster_path: null,
        backdrop_path: null,
        vote_average: 7.8,
        release_date: "1998-07-18",
        pokemon_image: "https://images.unsplash.com/photo-1609372332255-611485350f25"
      },
      {
        id: 1003,
        title: "Pokémon: The Movie 2000",
        overview: "Ash Ketchum must gather the three spheres of fire, ice and lightning in order to restore balance to the Orange Islands.",
        poster_path: null,
        backdrop_path: null,
        vote_average: 7.6,
        release_date: "1999-07-17",
        pokemon_image: "https://images.unsplash.com/photo-1638964758061-117853a20865"
      },
      {
        id: 1004,
        title: "Pokémon 3: The Movie - Spell of the Unown",
        overview: "Young Molly Hale's father disappears while investigating the mysterious Unown. The Unown create a crystal palace and make Molly's wishes come true.",
        poster_path: null,
        backdrop_path: null,
        vote_average: 7.4,
        release_date: "2000-07-08",
        pokemon_image: "https://images.pexels.com/photos/31002073/pexels-photo-31002073.jpeg"
      },
      {
        id: 1005,
        title: "Pokémon: Zoroark - Master of Illusions",
        overview: "A greedy businessman tries to take over a city with the help of a legendary Pokémon, and only the true legendary Pokémon Zoroark can stop him.",
        poster_path: null,
        backdrop_path: null,
        vote_average: 7.5,
        release_date: "2010-07-10",
        pokemon_image: "https://images.pexels.com/photos/32344214/pexels-photo-32344214.jpeg"
      },
      {
        id: 1,
        title: "Stranger Things",
        overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
        poster_path: null,
        backdrop_path: null,
        vote_average: 8.7,
        release_date: "2016-07-15"
      },
      {
        id: 2,
        title: "The Crown",
        overview: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
        poster_path: null,
        backdrop_path: null,
        vote_average: 8.6,
        release_date: "2016-11-04"
      }
    ],
    popular: [
      {
        id: 6,
        title: "Wednesday",
        overview: "Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends — and foes — at Nevermore Academy.",
        poster_path: null,
        backdrop_path: null,
        vote_average: 8.5,
        release_date: "2022-11-23"
      },
      {
        id: 7,
        title: "Squid Game",
        overview: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games for a tempting prize, but the stakes are deadly.",
        poster_path: null,
        backdrop_path: null,
        vote_average: 8.0,
        release_date: "2021-09-17"
      },
      {
        id: 8,
        title: "Money Heist",
        overview: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
        poster_path: null,
        backdrop_path: null,
        vote_average: 8.2,
        release_date: "2017-05-02"
      }
    ],
    action: [
      {
        id: 9,
        title: "The Witcher",
        overview: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.",
        poster_path: null,
        backdrop_path: null,
        vote_average: 8.2,
        release_date: "2019-12-20"
      },
      {
        id: 10,
        title: "Daredevil",
        overview: "A blind lawyer by day, vigilante by night. Matt Murdock fights the crime of New York as Daredevil.",
        poster_path: null,
        backdrop_path: null,
        vote_average: 8.6,
        release_date: "2015-04-10"
      }
    ]
  };

  useEffect(() => {
    // Check for stored authentication
    const storedAuth = localStorage.getItem('quriosity_auth');
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      if (authData.email === 'zdhpeter@gmail.com') {
        setIsAuthenticated(true);
        setUserEmail(authData.email);
        initializeNetflix();
      } else {
        localStorage.removeItem('quriosity_auth');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const handleSignIn = (email) => {
    // Store authentication
    localStorage.setItem('quriosity_auth', JSON.stringify({ email, timestamp: Date.now() }));
    setIsAuthenticated(true);
    setUserEmail(email);
    setLoading(true);
    initializeNetflix();
  };

  const handleSignOut = () => {
    localStorage.removeItem('quriosity_auth');
    setIsAuthenticated(false);
    setUserEmail('');
    setMovieCategories({});
    setFeaturedMovie(null);
    setSearchResults([]);
    setIsSearching(false);
  };

  const initializeNetflix = async () => {
    try {
      await Promise.all([
        fetchFeaturedContent(),
        fetchMovieCategories()
      ]);
    } catch (error) {
      console.error('Error initializing Netflix:', error);
      // Use mock data as fallback
      setFeaturedMovie(mockMovieData.trending[0]);
      setMovieCategories(mockMovieData);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedContent = async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/trending/movie/day?api_key=${TMDB_API_KEY}`
      );
      if (response.data.results.length > 0) {
        setFeaturedMovie(response.data.results[0]);
      }
    } catch (error) {
      console.error('Error fetching featured content:', error);
      setFeaturedMovie(mockMovieData.trending[0]);
    }
  };

  const fetchMovieCategories = async () => {
    try {
      const [trending, popular, topRated, action, comedy, horror, pokemon] = await Promise.all([
        axios.get(`${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`),
        axios.get(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`),
        axios.get(`${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`),
        axios.get(`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=28`),
        axios.get(`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=35`),
        axios.get(`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=27`),
        axios.get(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=pokemon`)
      ]);

      // Mix Pokemon movies with trending content for a dynamic experience
      const pokemonMovies = pokemon.data.results.slice(0, 3);
      const trendingMovies = trending.data.results.slice(0, 15);
      const mixedTrending = [...mockMovieData.trending.slice(0, 5), ...pokemonMovies, ...trendingMovies];

      setMovieCategories({
        trending: mixedTrending,
        popular: popular.data.results,
        topRated: topRated.data.results,
        action: action.data.results,
        comedy: comedy.data.results,
        horror: horror.data.results
      });
    } catch (error) {
      console.error('Error fetching movie categories:', error);
      setMovieCategories(mockMovieData);
    }
  };

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchTerm)}`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
      setSearchResults([]);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-black min-h-screen">
      {/* Netflix Header */}
      <NetflixHeader onSearch={handleSearch} />

      {/* Main Content */}
      <main>
        {!isSearching && (
          <>
            {/* Hero Banner */}
            <HeroBanner featuredContent={featuredMovie} />

            {/* Movie Categories */}
            <div className="space-y-8 pb-20">
              <ContentRow
                title="Trending Now"
                movies={movieCategories.trending || []}
                onMovieClick={handleMovieClick}
              />
              <ContentRow
                title="Popular Movies"
                movies={movieCategories.popular || []}
                onMovieClick={handleMovieClick}
              />
              <ContentRow
                title="Top Rated"
                movies={movieCategories.topRated || []}
                onMovieClick={handleMovieClick}
              />
              <ContentRow
                title="Action & Adventure"
                movies={movieCategories.action || []}
                onMovieClick={handleMovieClick}
              />
              <ContentRow
                title="Comedies"
                movies={movieCategories.comedy || []}
                onMovieClick={handleMovieClick}
              />
              <ContentRow
                title="Horror Movies"
                movies={movieCategories.horror || []}
                onMovieClick={handleMovieClick}
              />
            </div>
          </>
        )}

        {/* Search Results */}
        {isSearching && (
          <div className="pt-32 px-4 md:px-16">
            <h2 className="text-white text-2xl font-semibold mb-8">Search Results</h2>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {searchResults.map((movie, index) => (
                  <div
                    key={movie.id}
                    className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
                    onClick={() => handleMovieClick(movie)}
                  >
                    <div className="bg-gray-800 rounded-lg overflow-hidden h-64">
                      <img
                        src={movie.poster_path 
                          ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                          : `https://images.pexels.com/photos/7149329/pexels-photo-7149329.jpeg`
                        }
                        alt={movie.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-2">
                        <h3 className="text-white text-sm font-semibold line-clamp-2">
                          {movie.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400 text-xl">No results found</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Movie Detail Modal */}
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}

export default App;
