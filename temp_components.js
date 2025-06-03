import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import YouTube from 'react-youtube';
import axios from 'axios';

// TMDB API configuration
const TMDB_API_KEY = 'c8dea14dc917687ac631a52620e4f7ad';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

// Netflix Header Component
export const NetflixHeader = ({ onSearch, userEmail, onSignOut }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-gradient-to-b from-black/50 to-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between px-4 md:px-16 py-4">
        <div className="flex items-center space-x-8">
          <h1 className="text-red-600 text-3xl font-bold tracking-wide">QURIOSITY</h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Home</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">TV Shows</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Movies</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">New & Popular</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">My List</a>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search movies, TV shows..."
              className="bg-black/50 border border-gray-600 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="absolute right-2 top-2 text-gray-400 hover:text-white">
              🔍
            </button>
          </form>
          
          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
            >
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {userEmail ? userEmail.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
              <span className="text-white text-sm hidden sm:block">
                {userEmail ? userEmail.split('@')[0] : 'User'}
              </span>
            </button>
            
            {showUserMenu && (
              <motion.div
                className="absolute right-0 top-12 bg-black/90 backdrop-blur-sm border border-gray-700 rounded-lg py-2 min-w-[200px]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-4 py-2 border-b border-gray-700">
                  <p className="text-white text-sm font-medium">
                    {userEmail}
                  </p>
                  <p className="text-gray-400 text-xs">Premium Member</p>
                </div>
                <button
                  onClick={onSignOut}
                  className="w-full text-left px-4 py-2 text-white hover:bg-gray-800 transition-colors"
                >
                  Sign Out
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

// Hero Banner Component
export const HeroBanner = ({ featuredContent }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  if (!featuredContent) return null;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${featuredContent.backdrop_path ? BACKDROP_BASE_URL + featuredContent.backdrop_path : 'https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg'})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex items-center h-full px-4 md:px-16">
        <div className="max-w-2xl">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {featuredContent.title || featuredContent.name}
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl text-gray-200 mb-8 line-clamp-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {featuredContent.overview}
          </motion.p>

          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button
              onClick={() => setShowTrailer(true)}
              className="bg-white text-black px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
            >
              <span>▶</span>
              <span>Play</span>
            </button>
            <button className="bg-gray-600/70 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-gray-600 transition-all duration-200">
              <span>ℹ</span>
              <span>More Info</span>
            </button>
          </motion.div>
        </div>
      </div>

      {showTrailer && (
        <TrailerModal
          movieId={featuredContent.id}
          isOpen={showTrailer}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </div>
  );
};

// Content Row Component
export const ContentRow = ({ title, movies, onMovieClick }) => {
  const scrollContainer = React.useRef(null);

  const scroll = (direction) => {
    const container = scrollContainer.current;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="py-8 px-4 md:px-16">
      <h2 className="text-white text-2xl font-semibold mb-4">{title}</h2>
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
        >
          ←
        </button>
        
        <div
          ref={scrollContainer}
          className="flex space-x-2 overflow-x-scroll scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => onMovieClick(movie)}
              index={index}
            />
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
        >
          →
        </button>
      </div>
    </div>
  );
};

// Movie Card Component
export const MovieCard = ({ movie, onClick, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const fallbackImages = [
    'https://images.pexels.com/photos/7149329/pexels-photo-7149329.jpeg',
    'https://images.pexels.com/photos/8272144/pexels-photo-8272144.jpeg',
    'https://images.pexels.com/photos/8272156/pexels-photo-8272156.jpeg',
    'https://images.unsplash.com/photo-1590179068383-b9c69aacebd3',
    'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb',
    'https://images.pexels.com/photos/7533332/pexels-photo-7533332.jpeg',
    'https://images.unsplash.com/photo-1615709972711-574e9f76f37d',
    'https://images.unsplash.com/photo-1606512741416-fb5bbceaa4e2',
    'https://images.unsplash.com/photo-1642810814997-31c017df06a8',
    'https://images.pexels.com/photos/7941158/pexels-photo-7941158.jpeg'
  ];

  // Use Pokemon-specific image if available, otherwise TMDB poster, otherwise fallback
  const imageUrl = movie.pokemon_image || 
    (movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : fallbackImages[index % fallbackImages.length]);

  return (
    <motion.div
      className="relative min-w-[200px] h-[300px] cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-full h-full rounded-lg overflow-hidden bg-gray-800">
        <img
          src={imageUrl}
          alt={movie.title || movie.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = fallbackImages[index % fallbackImages.length];
          }}
        />
        
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
                {movie.title || movie.name}
              </h3>
              <div className="flex space-x-2">
                <button className="bg-white text-black px-3 py-1 rounded text-xs font-semibold hover:bg-gray-200">
                  ▶ Play
                </button>
                <button className="bg-gray-600/70 text-white px-3 py-1 rounded text-xs hover:bg-gray-600">
                  ℹ Info
                </button>
              </div>
              {movie.vote_average && (
                <div className="flex items-center mt-2">
                  <span className="text-yellow-400 text-xs">⭐</span>
                  <span className="text-white text-xs ml-1">{movie.vote_average}/10</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Movie Detail Modal Component
export const MovieModal = ({ movie, isOpen, onClose }) => {
  const [trailerKey, setTrailerKey] = useState('');
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    if (isOpen && movie) {
      fetchTrailer();
    }
  }, [isOpen, movie]);

  const fetchTrailer = async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${movie.id}/videos?api_key=${TMDB_API_KEY}`
      );
      const trailer = response.data.results.find(
        video => video.type === 'Trailer' && video.site === 'YouTube'
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  if (!isOpen || !movie) return null;

  const backdropUrl = movie.backdrop_path 
    ? BACKDROP_BASE_URL + movie.backdrop_path 
    : 'https://images.pexels.com/photos/2387819/pexels-photo-2387819.jpeg';

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <img
              src={backdropUrl}
              alt={movie.title || movie.name}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent rounded-t-lg" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70"
            >
              ✕
            </button>
          </div>

          <div className="p-6">
            <h2 className="text-white text-3xl font-bold mb-4">
              {movie.title || movie.name}
            </h2>
            
            <div className="flex space-x-4 mb-6">
              {trailerKey && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="bg-white text-black px-6 py-3 rounded font-semibold flex items-center space-x-2 hover:bg-gray-200"
                >
                  <span>▶</span>
                  <span>Play Trailer</span>
                </button>
              )}
              <button className="bg-gray-600 text-white px-6 py-3 rounded font-semibold hover:bg-gray-500">
                + My List
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <p className="text-gray-300 text-lg mb-4">{movie.overview}</p>
              </div>
              <div className="text-gray-400">
                <p><span className="text-white">Release Date:</span> {movie.release_date}</p>
                <p><span className="text-white">Rating:</span> ⭐ {movie.vote_average}/10</p>
                <p><span className="text-white">Votes:</span> {movie.vote_count}</p>
              </div>
            </div>
          </div>

          {showTrailer && trailerKey && (
            <TrailerModal
              trailerKey={trailerKey}
              isOpen={showTrailer}
              onClose={() => setShowTrailer(false)}
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Trailer Modal Component
export const TrailerModal = ({ movieId, trailerKey, isOpen, onClose }) => {
  const [videoKey, setVideoKey] = useState(trailerKey || '');

  useEffect(() => {
    if (isOpen && movieId && !trailerKey) {
      fetchTrailer();
    } else if (trailerKey) {
      setVideoKey(trailerKey);
    }
  }, [isOpen, movieId, trailerKey]);

  const fetchTrailer = async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`
      );
      const trailer = response.data.results.find(
        video => video.type === 'Trailer' && video.site === 'YouTube'
      );
      if (trailer) {
        setVideoKey(trailer.key);
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  if (!isOpen) return null;

  const opts = {
    height: '480',
    width: '854',
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 0,
      showinfo: 0,
      modestbranding: 1,
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-black rounded-lg overflow-hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4 bg-gray-900">
            <h3 className="text-white text-lg font-semibold">Trailer</h3>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 text-xl"
            >
              ✕
            </button>
          </div>
          
          {videoKey ? (
            <YouTube videoId={videoKey} opts={opts} />
          ) : (
            <div className="w-[854px] h-[480px] flex items-center justify-center bg-gray-800">
              <p className="text-white">No trailer available</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Loading Component
export const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <motion.div
      className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

// Sign In Component
export const SignInPage = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email === 'info@quriosity' && password === 'quriosity') {
      onSignIn(email);
    } else {
      setError('Invalid email or password. Please use the provided credentials.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-red-900/10" />
      
      {/* Animated background elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.div
        className="relative z-10 w-full max-w-md p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* QURIOSITY Logo */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-red-600 text-6xl font-bold tracking-wide mb-4">QURIOSITY</h1>
          <p className="text-gray-400 text-lg">Your exclusive streaming destination</p>
        </motion.div>

        {/* Sign In Form */}
        <motion.div
          className="bg-black/40 backdrop-blur-sm rounded-lg p-8 border border-gray-800"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-white text-2xl font-semibold mb-6 text-center">Sign In</h2>
          
          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <motion.div
                className="bg-red-900/30 border border-red-600 rounded-lg p-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-red-400 text-sm text-center">{error}</p>
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In to QURIOSITY'
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Access is exclusive to authorized users only
            </p>
          </div>
        </motion.div>

        {/* Demo credentials display */}
        <motion.div
          className="mt-6 bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-white text-sm font-semibold mb-2 text-center">Demo Access Credentials</h3>
          <div className="space-y-1 text-center">
            <p className="text-gray-300 text-sm">
              <span className="text-gray-400">Email:</span> <span className="text-white font-mono">info@quriosity</span>
            </p>
            <p className="text-gray-300 text-sm">
              <span className="text-gray-400">Password:</span> <span className="text-white font-mono">quriosity</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
