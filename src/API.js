import {
  SEARCH_BASE_URL,
  POPULAR_BASE_URL,
  API_URL,
  API_KEY,
  REQUEST_TOKEN_URL,
  LOGIN_URL,
  SESSION_ID_URL,
  GUEST_SESSION_URL
} from './config';
import { supabase } from './utils/supabase';

const defaultConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
};

const apiSettings = {
  fetchMovies: async (searchTerm, page) => {
    const endpoint = searchTerm
      ? `${SEARCH_BASE_URL}${searchTerm}&page=${page}`
      : `${POPULAR_BASE_URL}&page=${page}`;
    return await (await fetch(endpoint)).json();
  },
  fetchMovie: async movieId => {
    const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    return await (await fetch(endpoint)).json();
  },
  fetchCredits: async movieId => {
    const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    return await (await fetch(creditsEndpoint)).json();
  },

  // TODO: Implement login and rating functionality for the movie app
  //login for existing users
  getRequestToken: async () => {
    const reqToken = await (await fetch(REQUEST_TOKEN_URL)).json();
    return reqToken.request_token;
  },
  authenticate: async (requestToken, username, password) => {
    const bodyData = {
      username,
      password,
      request_token: requestToken
    };
// First authenticate the requestToken
    const data = await (
      await fetch(LOGIN_URL, {
        ...defaultConfig,
        body: JSON.stringify(bodyData)
      })
    ).json();
// Then get the sessionId with the requestToken
    if (data.success) {
      const sessionId = await (
        await fetch(SESSION_ID_URL, {
          ...defaultConfig,
          body: JSON.stringify({ request_token: requestToken })
        })
      ).json();
      return sessionId;
    }
  },
  rateMovie: async (sessionId, movieId, value, isGuest = false) => {
    const authParam = isGuest ? 'guest_session_id' : 'session_id';
    const endpoint = `${API_URL}movie/${movieId}/rating?api_key=${API_KEY}&${authParam}=${sessionId}`;

    const rating = await (
      await fetch(endpoint, {
        ...defaultConfig,
        body: JSON.stringify({ value })
      })
    ).json();
    return rating;
  },
//session id for guest users
  createGuestSession: async () => {
    const endpoint = `${GUEST_SESSION_URL}`;
    return await (await fetch(endpoint)).json();
  },
//Fetch movie videos
  fetchMovieVideos: async (movieId) => {
    const endpoint = `${API_URL}movie/${movieId}/videos?api_key=${API_KEY}`;
    return await (await fetch(endpoint)).json();
  },
  saveSignup: async ({ username, email, tmdbGuestSessionId }) => {
    const { error } = await supabase
      .from('users')
      .upsert([
        {
          username,
          email,
          tmdb_guest_session_id: tmdbGuestSessionId,
          updated_at: new Date().toISOString()
        }
      ], { onConflict: 'email' });

    if (error) throw error;

    return { success: true };
  }
}; 

export default apiSettings;
