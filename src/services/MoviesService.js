const API_KEY = '?api_key=56ed988fa225bdc434fdf2d5b7042b54';
const BASE_URL = 'https://api.themoviedb.org/3';
const LANGUAGE_FR = "&language=fr-FR";

export async function fetchTopMovies() {
  const fullList = [];
  const response = await fetch(`${BASE_URL}/movie/popular${API_KEY}`);
  const data = await response.json();
  fullList.push(...data.results); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax?

  return fullList;
}

export async function fetchGenres() {
  const response = await fetch(`${BASE_URL}/genre/movie/list${API_KEY + LANGUAGE_FR}`);
  const data = await response.json();
  return data.genres;
}

export async function fetchMovies(searchOrDiscover, recherche, page) {
  const response = await fetch(`${BASE_URL}/${searchOrDiscover}/movie${API_KEY + recherche + LANGUAGE_FR}&page=${page}`);
  const data = await response.json();
  const fullList = data.results;
  return {totalFilms: data.total_results, movies: fullList, totalPages: data.total_pages};
}

export async function fetchMovieById(id) {
  const response = await fetch(`${BASE_URL}/movie/${id + API_KEY + LANGUAGE_FR}`);
  const data = await response.json();
  return data;
}
