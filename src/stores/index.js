import { defineStore } from 'pinia'
import {
  fetchRechercheYearOrGenre,
  fetchRechercheQuery,
  fetchMovieById,
} from '../services/MoviesService'

export const movieStore = defineStore('movies', {
  state: () => ({
    movies: [],
    totalMovies: '',
    pageActuelle: 1,
    totalPages: 0,
    seeMore: 0,
    movieClicked: null,
    query: '',
    year: '',
    genre: '',
    chargement: true,
    heavySearch: false,
    noResult: false
  }),
  actions: {
    definirListeAccueil(listeTopFilms) {
      this.movies = listeTopFilms
      this.chargement = false
    },
    async definirListeSearch() {
      this.chargement = true;
      const BASE_SEARCH_PAGES = 50;
      const MAX_SEARCH_PAGES = 450;

      if (this.query && !this.genre) {
        const data = await this.getMovieByQuery(this.pageActuelle)
        this.movies = data.movies;
        this.totalMovies = data.totalFilms ?? 0;
        this.totalPages = Math.ceil(this.totalMovies / 10) ?? 0;
        this.noResult = this.totalMovies === 0 ? true : false;

      } else if (this.query && this.genre) {
        let dataQuery = []
        let dataYearOrGenre = []
        let dataMerge = this.heavySearch ? this.getMapByMoviesList() : new Map();
        let movieIdsQuery = new Set()
        this.heavySearch = true

        do {
          for (let i = 1; i < BASE_SEARCH_PAGES + this.seeMore; i++) {
            const queryData = await this.getMovieByQuery(i)
            if (queryData.movies.length === 0) i = BASE_SEARCH_PAGES + this.seeMore
            dataQuery.push(queryData)

            for (let dataQueryMovie of queryData.movies) {
              movieIdsQuery.add(dataQueryMovie.id)
            }
          }

          for (let i = 1 + this.seeMore; i < BASE_SEARCH_PAGES + this.seeMore; i++) {
            const yearOrGenreData = await this.getMovieByYearOrGenre(i)
            dataYearOrGenre.push(yearOrGenreData)
          }

          for (let dataYearOrGenrePage of dataYearOrGenre) {
            for (let movie of dataYearOrGenrePage.movies) {
              if (movieIdsQuery.has(movie.id)) {
                if (!dataMerge.has(movie.id)) {
                  dataMerge.set(movie.id, movie);
                }
              }
            }
          }
          this.seeMore += (dataMerge.size === this.movies.length && this.seeMore < MAX_SEARCH_PAGES) ? BASE_SEARCH_PAGES : 0;
        } while ((dataMerge.size === 0 && this.seeMore < MAX_SEARCH_PAGES) ||(dataMerge.size === this.movies.length && this.seeMore < MAX_SEARCH_PAGES));

        this.movies = Array.from(dataMerge.values());
        this.totalMovies = this.movies.length;
        this.totalPages = Math.ceil(this.totalMovies / 10);
        this.noResult = dataMerge.size === 0 ? true : false;

      } else {
        const data = await this.getMovieByYearOrGenre(this.pageActuelle);
        this.totalMovies = data.totalFilms;
        this.movies = data.movies;
        this.totalPages = data.totalPages / 2;
        this.noResult = this.totalMovies === 0 ? true : false;
      }

      this.chargement = false
    },
    async getMovieByID(id) {
      this.chargement = true
      this.movieClicked = await fetchMovieById(id)
      this.chargement = false
    },
    async getMovieByQuery(page) {
      const search = this.query + this.year
      const data = await fetchRechercheQuery(search, page)
      return data
    },
    async getMovieByYearOrGenre(page) {
      const search = this.year + this.genre
      const data = await fetchRechercheYearOrGenre(search, page)
      return data
    },
    getMapByMoviesList() {
      let map = new Map()
      for (let movie of this.movies) {
        map.set(movie.id, movie)
      }
      return map
    },
  },
  getters: {
    totalFilmsTrouves: (state) => state.totalMovies,
    runtimeHours: (state) => {
      const runtime = parseInt(state.movieClicked.runtime)
      const hours = Math.floor(runtime / 60)
      const minutes = runtime % 60
      if (hours === 0) {
        return `${minutes} minutes`
      }
      return `${hours}h${minutes}`
    },
  },
})
