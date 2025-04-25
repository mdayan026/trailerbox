// Importing the CustomGenre type for defining common genre categories
import { CustomGenre } from "src/types/Genre";

// API endpoint and API key are retrieved from environment variables
export const API_ENDPOINT_URL = import.meta.env.VITE_APP_API_ENDPOINT_URL;
export const TMDB_V3_API_KEY = import.meta.env.VITE_APP_TMDB_V3_API_KEY;

// Defining main application paths for navigation
export const MAIN_PATH = {
  root: "",        // Root/homepage path
  browse: "browse", // Browse movies/shows
  genreExplore: "genre", // Explore movies by genre
  watch: "watch",  // Watch page for playing videos
};

// Maximum width for arrow indicators (likely for carousels/sliders)
export const ARROW_MAX_WIDTH = 60;

// Common genre titles with their corresponding API query parameters
export const COMMON_TITLES: CustomGenre[] = [
  { name: "Popular", apiString: "popular" },       // Popular movies/shows
  { name: "Top Rated", apiString: "top_rated" },   // Highest-rated content
  { name: "Now Playing", apiString: "now_playing" }, // Currently in theaters
  { name: "Upcoming", apiString: "upcoming" },     // Future releases
];

// Base URL for watching YouTube trailers
export const YOUTUBE_URL = "https://www.youtube.com/watch?v=";

// Height of the application's top navigation bar (AppBar)
export const APP_BAR_HEIGHT = 70;

// Initial state for media details (used in state management)
export const INITIAL_DETAIL_STATE = {
  id: undefined,        // Unique ID of the media (movie/show)
  mediaType: undefined, // Type of media (movie, TV show, etc.)
  mediaDetail: undefined, // Additional details of the media
};
