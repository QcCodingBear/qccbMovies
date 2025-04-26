const API_KEY = '56ed988fa225bdc434fdf2d5b7042b54'
const BASE_URL = 'https://api.themoviedb.org/3'

export async function fetchTopMovies() {
  const fullList = []
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
  const data = await response.json()
  fullList.push(...data.results) // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax?

  return fullList
}

export async function fetchGenres() {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=fr-FR`)
  const data = await response.json()
  return data.genres
}

export async function fetchRechercheYearOrGenre(recherche, page) {

  const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}${recherche}&language=fr-FR&page=${page}`);
  const data = await response.json();

  const fullList = data.results;

  return {totalFilms: data.total_results, movies: fullList, totalPages: data.total_pages}
}

export async function fetchRechercheQuery(recherche, page) {

  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}${recherche}&language=fr-FR&page=${page}`);
  const data = await response.json();

  const fullList = data.results;

  return {totalFilms: data.total_results, movies: fullList, totalPages: data.total_pages}
}

export async function fetchMovieById(id) {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`);
  const data = await response.json();
  return data;
}
