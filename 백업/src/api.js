import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "10923b261ba94d897ac6b81148314a3f",
    language: "en-US",
  },
});

export const movieApi = {
  nowPlaying: (page = 1) =>
    api.get(`movie/now_playing`, {
      params: {
        page: page,
      },
    }),
  upComing: (page = 1) =>
    api.get(`movie/upcoming`, {
      params: {
        page: page,
      },
    }),
  popular: (page = 1) =>
    api.get(`movie/popular`, {
      params: {
        page: page,
      },
    }),
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term, page = 1) =>
    api.get("search/movie", {
      params: {
        query: encodeURIComponent(term),
        page: page,
      },
    }),
  getCasts: (id) => api.get(`movie/${id}/credits`),
  getCastDetail: (person_id) => api.get(`person/${person_id}`),
  getSimilarMovies: (movie_id, page = 1) =>
    api.get(`movie/${movie_id}/similar`, {
      params: {
        page: page,
      },
    }),
};

export const tvApi = {
  popular: (page = 1) =>
    api.get("tv/popular", {
      params: {
        page: page,
      },
    }),
  topRated: (page = 1) =>
    api.get("tv/top_rated", {
      params: {
        page: page,
      },
    }),
  airingToday: (page = 1) =>
    api.get("tv/airing_today", {
      params: {
        page: page,
      },
    }),
  showDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term, page = 1) =>
    api.get(`search/tv`, {
      params: {
        query: encodeURIComponent(term),
        page: page,
      },
    }),
  getCasts: (id) => api.get(`tv/${id}/credits`),
  getCastDetail: (person_id) => api.get(`person/${person_id}`),
};
